// A framework-free stand-in for `React.Component`, just enough for upstream's
// `App` class to keep its lifecycle and update semantics:
//
// - `setState` queues the update; queued updates commit together in a
//   microtask (React 18 automatic batching), or synchronously inside
//   `flushSync` (see ../reactUtils).
// - a commit applies the queue, calls `render()` (which here computes the
//   frame data instead of returning JSX), notifies subscribers (the UI
//   binding), then runs `componentDidUpdate` and the `setState` callbacks.
//   Updates queued during `componentDidUpdate` commit synchronously, as
//   React does for updates scheduled in the layout phase.
// - `mount(container)` / `unmount()` replace React mounting and call
//   `componentDidMount` / `componentWillUnmount`.

type StateUpdater<P, S, K extends keyof S> =
  | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
  | (Pick<S, K> | S | null);

const dirtyComponents = new Set<AppBase<any, any, any>>();
let commitScheduled = false;

const scheduleCommit = () => {
  if (commitScheduled) {
    return;
  }
  commitScheduled = true;
  queueMicrotask(() => {
    commitScheduled = false;
    commitDirtyComponents();
  });
};

/** commits every component with pending updates (used by `flushSync`) */
export const commitDirtyComponents = () => {
  // guard against update loops (React throws at 50 nested updates)
  for (let i = 0; dirtyComponents.size && i < 50; i++) {
    const batch = [...dirtyComponents];
    dirtyComponents.clear();
    for (const component of batch) {
      component.commit();
    }
  }
};

export abstract class AppBase<P extends object, S extends object, R> {
  props: Readonly<P>;
  state!: Readonly<S>;

  /** the last `render()` result */
  renderResult: R | null = null;

  private pendingUpdates: StateUpdater<P, S, any>[] = [];
  private pendingCallbacks: (() => void)[] = [];
  private pendingProps: P | null = null;
  private forcePending = false;
  private mounted = false;
  private committing = false;
  private listeners = new Set<() => void>();

  constructor(props: P) {
    this.props = props;
  }

  abstract render(): R;

  componentDidMount?(): void | Promise<void>;
  componentWillUnmount?(): void;
  componentDidUpdate?(prevProps: P, prevState: S, snapshot?: unknown): void;
  getSnapshotBeforeUpdate?(prevProps: P, prevState: S): unknown;

  setState<K extends keyof S>(
    update: StateUpdater<P, S, K>,
    callback?: () => void,
  ): void {
    this.pendingUpdates.push(update);
    if (callback) {
      this.pendingCallbacks.push(callback);
    }
    this.markDirty();
  }

  forceUpdate(callback?: () => void): void {
    this.forcePending = true;
    if (callback) {
      this.pendingCallbacks.push(callback);
    }
    this.markDirty();
  }

  /** replaces the props, as a parent re-render with new props would */
  setProps(props: P): void {
    this.pendingProps = props;
    this.markDirty();
  }

  /** subscribe to commits; the binding re-reads `state`/`renderResult` */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  get isMounted() {
    return this.mounted;
  }

  /** first render + `componentDidMount` */
  mountComponent(): void {
    if (this.mounted) {
      return;
    }
    this.renderResult = this.render();
    this.mounted = true;
    this.notify();
    void this.componentDidMount?.();
  }

  unmountComponent(): void {
    if (!this.mounted) {
      return;
    }
    this.mounted = false;
    dirtyComponents.delete(this);
    this.pendingUpdates = [];
    this.pendingCallbacks = [];
    this.componentWillUnmount?.();
    this.listeners.clear();
  }

  private markDirty() {
    dirtyComponents.add(this);
    if (!this.committing) {
      scheduleCommit();
    }
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  /** @internal applies pending updates; called by the scheduler */
  commit(): void {
    if (
      !this.pendingUpdates.length &&
      !this.pendingProps &&
      !this.forcePending
    ) {
      return;
    }

    const prevProps = this.props;
    const prevState = this.state;

    let nextState = this.state;
    const updates = this.pendingUpdates;
    this.pendingUpdates = [];
    const nextProps = this.pendingProps ?? this.props;
    this.pendingProps = null;
    this.forcePending = false;

    for (const update of updates) {
      const partial =
        typeof update === "function" ? update(nextState, nextProps) : update;
      if (partial != null) {
        nextState = { ...nextState, ...partial };
      }
    }

    const callbacks = this.pendingCallbacks;
    this.pendingCallbacks = [];

    this.props = nextProps;
    this.state = nextState;

    if (!this.mounted) {
      // state set before mount (e.g. from the constructor path) applies on
      // the first render
      callbacks.forEach((callback) => callback());
      return;
    }

    this.committing = true;
    try {
      this.renderResult = this.render();
      const snapshot = this.getSnapshotBeforeUpdate?.(prevProps, prevState);
      this.notify();
      this.componentDidUpdate?.(prevProps, prevState, snapshot);
      callbacks.forEach((callback) => callback());
    } finally {
      this.committing = false;
    }

    // updates scheduled from componentDidUpdate / callbacks commit now
    if (dirtyComponents.has(this)) {
      dirtyComponents.delete(this);
      this.commit();
    }
  }
}

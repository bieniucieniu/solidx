// Framework-free stand-in for upstream's jotai-based editor store. Core code
// only uses `atom(initial)` plus `editorJotaiStore.get/set/sub`, so this keeps
// that surface without depending on jotai.

export type PrimitiveAtom<Value> = { readonly init: Value };

export const atom = <Value>(init: Value): PrimitiveAtom<Value> => ({ init });

const createStore = () => {
  const values = new Map<PrimitiveAtom<any>, unknown>();
  const listeners = new Map<PrimitiveAtom<any>, Set<() => void>>();
  return {
    get<Value>(a: PrimitiveAtom<Value>): Value {
      return (values.has(a) ? values.get(a) : a.init) as Value;
    },
    set<Value>(
      a: PrimitiveAtom<Value>,
      next: Value | ((prev: Value) => Value),
    ): void {
      const prev = this.get(a);
      const value =
        typeof next === "function"
          ? (next as (prev: Value) => Value)(prev)
          : next;
      if (Object.is(prev, value)) {
        return;
      }
      values.set(a, value);
      listeners.get(a)?.forEach((listener) => listener());
    },
    sub(a: PrimitiveAtom<any>, listener: () => void): () => void {
      let set = listeners.get(a);
      if (!set) {
        listeners.set(a, (set = new Set()));
      }
      set.add(listener);
      return () => set!.delete(listener);
    },
  };
};

export const editorJotaiStore = createStore();

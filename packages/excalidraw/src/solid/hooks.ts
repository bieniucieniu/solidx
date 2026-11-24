import { type Accessor, createMemo, createSignal, onCleanup } from "solid-js";
import { CONTEXT_MENU_SEPARATOR, getLangCode, subscribeLangCode, t } from "#ex/core";
import type {
  Action,
  ActionName,
  AppState,
  ContextMenuItem,
  ExcalidrawImperativeAPI,
  PrimitiveAtom,
  ToolType,
} from "#ex/core";
import { editorJotaiStore } from "#ex/core/editor-jotai";
import { getShortcutFromShortcutName, type ShortcutName } from "#ex/core/actions/shortcuts";
import {
  PROPERTIES,
  type PropertyDescriptor,
  type PropertyName,
  type PropertyValue,
} from "#ex/core/actions/propertyValues";
import { cursorHintAtom } from "#ex/core/components/CursorHint";
import type { ShapeActionPredicates } from "#ex/core/components/shapeActionPredicates";
import { cleanAppStateForExport } from "#ex/core/appState";
import { exportScene } from "#ex/core/scene/export";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { useExcalidraw } from "./context";

/** a memo over the editor's app state; re-runs only when `select`'s result changes */
export function useAppState<T>(select: (state: AppState) => T): Accessor<T> {
  const excalidraw = useExcalidraw();
  return createMemo(() => select(excalidraw.appState()));
}

/** the non-deleted scene elements */
export function useElements(): Accessor<readonly NonDeletedExcalidrawElement[]> {
  return useExcalidraw().elements;
}

/** the selected elements */
export function useSelectedElements(): Accessor<readonly NonDeletedExcalidrawElement[]> {
  return useExcalidraw().selectedElements;
}

/** the imperative API (upstream `ExcalidrawImperativeAPI`) */
export function useExcalidrawAPI(): ExcalidrawImperativeAPI {
  return useExcalidraw().api;
}

/** an editor atom (cursor hint, eye dropper, confirm dialog, …) as a signal */
export function useEditorAtom<V>(atom: PrimitiveAtom<V>): Accessor<V> {
  // a version counter, since an atom's value may itself be a function
  const [version, setVersion] = createSignal(0);
  onCleanup(editorJotaiStore.sub(atom, () => setVersion((v) => v + 1)));
  return () => {
    version();
    return editorJotaiStore.get(atom);
  };
}

// -----------------------------------------------------------------------------
// tools
// -----------------------------------------------------------------------------

export type ToolState = {
  /** the active tool type */
  active: Accessor<AppState["activeTool"]>;
  isActive: (type: ToolType) => boolean;
  /** whether the active tool stays active after drawing (tool lock) */
  locked: Accessor<boolean>;
  set: (type: ToolType) => void;
  toggleLock: () => void;
};

export function useTool(): ToolState {
  const excalidraw = useExcalidraw();
  const active = useAppState((state) => state.activeTool);
  return {
    active,
    isActive: (type) => active().type === type,
    locked: () => active().locked,
    set: (type) => {
      if (type === "image") {
        // upstream opens the file picker for the image tool
        excalidraw.app.setActiveTool({ type: "image" });
        return;
      }
      excalidraw.api.setActiveTool({ type } as Parameters<
        ExcalidrawImperativeAPI["setActiveTool"]
      >[0]);
    },
    toggleLock: () => excalidraw.app.toggleLock("ui"),
  };
}

// -----------------------------------------------------------------------------
// actions
// -----------------------------------------------------------------------------

export type ActionState = {
  action: Action | undefined;
  /** the translated label */
  label: Accessor<string>;
  /** the keyboard shortcut, formatted for display (e.g. "Ctrl+Z") */
  shortcut: string;
  /** whether the action applies (its `predicate`) */
  enabled: Accessor<boolean>;
  /** toggles: whether the action is on */
  checked: Accessor<boolean>;
  /** runs the action as from a UI control */
  perform: (value?: unknown) => void;
};

const labelOf = (
  action: Action | undefined,
  elements: readonly NonDeletedExcalidrawElement[],
  state: AppState,
  app: Parameters<Exclude<Action["label"], string>>[2],
) => {
  if (!action?.label) return "";
  const key =
    typeof action.label === "function" ? action.label(elements, state, app) : action.label;
  return t(key as Parameters<typeof t>[0]);
};

const enabledMemo = (excalidraw: ReturnType<typeof useExcalidraw>, action: Action | undefined) =>
  createMemo(() => {
    excalidraw.appState();
    return !!action && excalidraw.app.actionManager.isActionEnabled(action);
  });

/** a registered action (`actionManager.actions[name]`) as reactive UI state */
export function useAction(name: ActionName): ActionState {
  const excalidraw = useExcalidraw();
  const { app } = excalidraw;
  const action = app.actionManager.actions[name] as Action | undefined;
  // most labels are fixed keys; only label functions depend on the editor
  const label =
    typeof action?.label === "function"
      ? createMemo(() => labelOf(action, excalidraw.elements(), excalidraw.appState(), app))
      : () => labelOf(action, [], app.state, app);
  return {
    action,
    label,
    shortcut: getShortcutFromShortcutName(name as ShortcutName),
    enabled: enabledMemo(excalidraw, action),
    checked: createMemo(() => !!action?.checked?.(excalidraw.appState())),
    perform: (value) => app.actionManager.performFromUI(name, value),
  };
}

// -----------------------------------------------------------------------------
// element properties (the properties panel)
// -----------------------------------------------------------------------------

export type PropertyState<V> = {
  /** current value: the selection's common value, the default for new elements, or `null` when mixed */
  value: Accessor<V | null>;
  set: (value: V) => void;
  /** whether the property's action applies (its `predicate`) */
  enabled: Accessor<boolean>;
  /** whether upstream's properties panel shows the property for the selection or the active tool */
  applies: Accessor<boolean>;
};

/**
 * One styling property (stroke color, fill style, font size, …), read and
 * written the way upstream's properties panel does.
 */
export function useProperty<N extends PropertyName>(name: N): PropertyState<PropertyValue<N>> {
  const excalidraw = useExcalidraw();
  const { app } = excalidraw;
  const descriptor = PROPERTIES[name] as unknown as PropertyDescriptor<PropertyValue<N>>;
  const action = app.actionManager.actions[descriptor.action] as Action | undefined;
  return {
    value: createMemo(() => {
      excalidraw.appState();
      return descriptor.get(app);
    }),
    set: (value) =>
      app.actionManager.performFromUI(
        descriptor.action,
        descriptor.toActionValue ? descriptor.toActionValue(value) : value,
      ),
    enabled: enabledMemo(excalidraw, action),
    applies: () => excalidraw.shapeActions()[descriptor.flag],
  };
}

// -----------------------------------------------------------------------------
// history
// -----------------------------------------------------------------------------

export function useHistory() {
  const excalidraw = useExcalidraw();
  const { history, actionManager } = excalidraw.app;
  const [canUndo, setCanUndo] = createSignal(!history.isUndoStackEmpty);
  const [canRedo, setCanRedo] = createSignal(!history.isRedoStackEmpty);
  onCleanup(
    history.onHistoryChangedEmitter.on((event) => {
      setCanUndo(!event.isUndoStackEmpty);
      setCanRedo(!event.isRedoStackEmpty);
    }),
  );
  return {
    canUndo,
    canRedo,
    undo: () => actionManager.performFromUI("undo"),
    redo: () => actionManager.performFromUI("redo"),
  };
}

// -----------------------------------------------------------------------------
// context menu
// -----------------------------------------------------------------------------

export type ContextMenuEntry =
  | { type: "separator" }
  | {
      type: "action";
      name: ActionName;
      label: string;
      shortcut: string;
      checked: boolean;
      dangerous: boolean;
      /** closes the menu, then runs the action */
      select: () => void;
    };

/**
 * The editor's context menu (opened by right-click on the canvas): where it
 * is, and its entries filtered and labeled as upstream's `<ContextMenu>`
 * does. Render it with any menu component.
 */
export function useContextMenu() {
  const excalidraw = useExcalidraw();
  const { app } = excalidraw;
  const menu = useAppState((state) => state.contextMenu);

  const close = (callback?: () => void) => {
    app.setState({ contextMenu: null }, () => {
      app.focusContainer();
      callback?.();
    });
  };

  const entries = createMemo<ContextMenuEntry[]>(() => {
    const current = menu();
    if (!current) return [];
    const state = excalidraw.appState();
    const elements = excalidraw.elements();
    const filtered = current.items.filter(
      (item): item is ContextMenuItem =>
        !!item &&
        (item === CONTEXT_MENU_SEPARATOR ||
          !item.predicate ||
          item.predicate(elements, state, app.props, app)),
    );
    const result: ContextMenuEntry[] = [];
    filtered.forEach((item, index) => {
      if (item === CONTEXT_MENU_SEPARATOR) {
        // no leading or doubled separators
        if (index > 0 && filtered[index - 1] !== CONTEXT_MENU_SEPARATOR) {
          result.push({ type: "separator" });
        }
        return;
      }
      result.push({
        type: "action",
        name: item.name,
        label: labelOf(item, elements, state, app),
        shortcut: getShortcutFromShortcutName(item.name as ShortcutName),
        checked: !!item.checked?.(state),
        dangerous: item.name === "deleteSelectedElements",
        // update state before executing the action in case the action uses
        // the appState it's being passed (that still contains a defined
        // contextMenu) to return the next state
        select: () => close(() => app.actionManager.executeAction(item, "contextMenu")),
      });
    });
    if (result.at(-1)?.type === "separator") result.pop();
    return result;
  });

  return {
    open: () => !!menu(),
    /** position relative to the editor container */
    position: () => {
      const current = menu();
      return current ? { top: current.top, left: current.left } : null;
    },
    entries,
    close: () => close(),
  };
}

// -----------------------------------------------------------------------------
// i18n, cursor hint
// -----------------------------------------------------------------------------

/** `t` plus the current language code (re-read when the language changes) */
export function useI18n() {
  const [langCode, setLangCode] = createSignal(getLangCode());
  onCleanup(subscribeLangCode(() => setLangCode(getLangCode())));
  return {
    langCode,
    t: ((...args: Parameters<typeof t>) => {
      langCode();
      return t(...args);
    }) as typeof t,
  };
}

/** the transient hint shown next to the cursor (e.g. after cycling arrow types) */
export function useCursorHint() {
  const excalidraw = useExcalidraw();
  const hint = useEditorAtom(cursorHintAtom);
  return {
    hint,
    /** pointer position in viewport coordinates */
    position: () => {
      hint();
      return excalidraw.app.viewport.lastPosition;
    },
  };
}

// -----------------------------------------------------------------------------
// export
// -----------------------------------------------------------------------------

/**
 * Exports the current scene (or the selection) as PNG or SVG, through core's
 * `exportScene`, plus a helper that saves a blob as a download.
 */
export function useExport() {
  const excalidraw = useExcalidraw();
  const { api } = excalidraw;

  type Options = { onlySelected?: boolean; background?: boolean; dark?: boolean };

  const data = (options: Options) => {
    const selected = excalidraw.selectedElements();
    return {
      elements: options.onlySelected && selected.length ? selected : api.getSceneElements(),
      appState: cleanAppStateForExport(api.getAppState()),
      files: api.getFiles(),
    };
  };
  const config = (options: Options) => ({
    canvasBackgroundColor: options.background === false ? (false as const) : undefined,
    theme: options.dark ? ("dark" as const) : ("light" as const),
  });

  return {
    toPng: (options: Options & { scale?: number } = {}) =>
      exportScene({
        type: "png",
        data: data(options),
        config: { ...config(options), scale: options.scale },
      }),
    toSvg: (options: Options = {}) =>
      exportScene({ type: "svg", data: data(options), config: config(options) }),
    download: (blob: Blob, fileName: string) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
  };
}

// -----------------------------------------------------------------------------
// which properties / actions apply
// -----------------------------------------------------------------------------

/**
 * What upstream's properties panel shows: for the active tool and the
 * selection, which properties apply (`strokeColor`, `fill`, `text`,
 * `textAlign`, …) and which selection actions (`layers`, `align`, …).
 */
export function useShapeActions(): Accessor<ShapeActionPredicates> {
  return useExcalidraw().shapeActions;
}

/**
 * Whether upstream shows the properties panel at all (`showSelectedShapeActions`):
 * something is selected or a drawing tool is active, outside view mode.
 */
export function useShowShapeActions(): Accessor<boolean> {
  return useExcalidraw().showShapeActions;
}

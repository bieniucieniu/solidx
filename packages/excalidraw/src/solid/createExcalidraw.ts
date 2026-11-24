import { type Accessor, createEffect, createMemo, createSignal, flush, untrack } from "solid-js";
import { isShallowEqual } from "@excalidraw/common";
import { getTargetElements, showSelectedShapeActions } from "@excalidraw/element";
import { createEditor, setFlushHandler } from "#ex/core";
import type { AppState, ExcalidrawImperativeAPI, ExcalidrawProps } from "#ex/core";
import type { AppRenderResult } from "#ex/core";
import {
  getShapeActionPredicates,
  type ShapeActionPredicates,
} from "#ex/core/components/shapeActionPredicates";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

// `flushSync` in core commits the editor and then calls this, so Solid
// applies the resulting signal writes before the caller reads the DOM.
setFlushHandler(flush);

export type Excalidraw = ReturnType<typeof createExcalidraw>;

const NO_ELEMENTS: readonly NonDeletedExcalidrawElement[] = [];

/**
 * Creates the editor and exposes its state as signals. `App` (core) owns the
 * state and commits it in batches; every commit is published here, so
 * readers re-run per commit and memos narrow that down to what they read.
 *
 * Writes go through `app` / `api`, never through these accessors.
 */
export function createExcalidraw(props: Accessor<ExcalidrawProps>) {
  const editor = createEditor(untrack(props));
  const { app } = editor;

  // One signal per commit: `App.state`, its render result and the scene all
  // change together, so the accessors below read it and then the live value.
  const [commit, setCommit] = createSignal(0);
  app.subscribe(() => setCommit((n) => n + 1));

  // later props: a parent re-render in upstream terms
  createEffect(
    () => props(),
    (next) => {
      if (app.isMounted) {
        editor.setProps(next);
      }
    },
    { defer: true },
  );

  const appState: Accessor<AppState> = () => (commit(), app.state);
  const render: Accessor<AppRenderResult | null> = () => (commit(), app.renderResult);

  /** non-deleted scene elements; re-read on every commit */
  const elements: Accessor<readonly NonDeletedExcalidrawElement[]> = () => (
    commit(),
    app.scene.getNonDeletedElements()
  );

  // `App.render` keeps the array's identity until the selection changes
  const selectedElements = createMemo(() => render()?.selectedElements ?? NO_ELEMENTS);

  /** upstream's `getShapeActionPredicates`, shared by every reader */
  const shapeActions = createMemo<ShapeActionPredicates>(
    () => {
      const state = appState();
      const elementsMap = app.scene.getNonDeletedElementsMap();
      return getShapeActionPredicates(
        state,
        getTargetElements(elementsMap, state),
        elementsMap,
        app,
      );
    },
    { equals: isShallowEqual },
  );

  /** upstream's `showSelectedShapeActions`: whether the properties panel shows */
  const showShapeActions = createMemo(() =>
    showSelectedShapeActions(appState(), app.scene.getNonDeletedElements()),
  );

  return {
    editor,
    app,
    /** the imperative API (same as upstream `ExcalidrawImperativeAPI`) */
    get api(): ExcalidrawImperativeAPI {
      return app.api;
    },
    appState,
    render,
    elements,
    selectedElements,
    shapeActions,
    showShapeActions,
  };
}

// Framework-free port of upstream components/canvases/{StaticCanvas,
// NewElementCanvas,InteractiveCanvas}.tsx and components/SVGLayer.tsx.
//
// Upstream renders these as `React.memo` components whose effects call the
// scene renderers on every (non-memoized) render. Here `mountCanvases`
// builds the same DOM inside a host element and subscribes to `App` commits;
// each commit runs the same memo comparisons (`areEqual` below, copied from
// upstream) and calls the renderers when they differ.

import { isShallowEqual, sceneCoordsToViewportCoords } from "@excalidraw/common";

import { t } from "../../i18n";
import { isRenderThrottlingEnabled } from "../../reactUtils";
import { AnimationController } from "../../renderer/animation";
import { getSelectionColor } from "../../renderer/helpers";
import { renderInteractiveScene } from "../../renderer/interactiveScene";
import { renderNewElementScene } from "../../renderer/renderNewElementScene";
import { renderStaticScene } from "../../renderer/staticScene";

import type App from "../App";
import type { AppRenderResult } from "../App";
import type {
  InteractiveCanvasRenderConfig,
  InteractiveSceneRenderAnimationState,
  InteractiveSceneRenderConfig,
} from "../../scene/types";
import type {
  AppState,
  InteractiveCanvasAppState,
  StaticCanvasAppState,
} from "../../types";

// -----------------------------------------------------------------------------
// memo comparisons (from upstream)
// -----------------------------------------------------------------------------

const getStaticCanvasAppState = (appState: AppState): StaticCanvasAppState => ({
  zoom: appState.zoom,
  scrollX: appState.scrollX,
  scrollY: appState.scrollY,
  width: appState.width,
  height: appState.height,
  viewModeEnabled: appState.viewModeEnabled,
  openDialog: appState.openDialog,
  hoveredElementIds: appState.hoveredElementIds,
  offsetLeft: appState.offsetLeft,
  offsetTop: appState.offsetTop,
  theme: appState.theme,
  shouldCacheIgnoreZoom: appState.shouldCacheIgnoreZoom,
  viewBackgroundColor: appState.viewBackgroundColor,
  exportScale: appState.exportScale,
  selectedElementsAreBeingDragged: appState.selectedElementsAreBeingDragged,
  gridSize: appState.gridSize,
  gridStep: appState.gridStep,
  frameRendering: appState.frameRendering,
  selectedElementIds: appState.selectedElementIds,
  frameToHighlight: appState.frameToHighlight,
  editingGroupId: appState.editingGroupId,
  currentHoveredFontFamily: appState.currentHoveredFontFamily,
  croppingElementId: appState.croppingElementId,
  suggestedBinding: appState.suggestedBinding,
});

const getInteractiveCanvasAppState = (
  appState: AppState,
): InteractiveCanvasAppState => ({
  zoom: appState.zoom,
  scrollX: appState.scrollX,
  scrollY: appState.scrollY,
  width: appState.width,
  height: appState.height,
  viewModeEnabled: appState.viewModeEnabled,
  activeTool: appState.activeTool,
  openDialog: appState.openDialog,
  editingGroupId: appState.editingGroupId,
  selectedElementIds: appState.selectedElementIds,
  frameToHighlight: appState.frameToHighlight,
  offsetLeft: appState.offsetLeft,
  offsetTop: appState.offsetTop,
  theme: appState.theme,
  selectionElement: appState.selectionElement,
  selectedGroupIds: appState.selectedGroupIds,
  selectedLinearElement: appState.selectedLinearElement,
  multiElement: appState.multiElement,
  newElement: appState.newElement,
  isBindingEnabled: appState.isBindingEnabled,
  isMidpointSnappingEnabled: appState.isMidpointSnappingEnabled,
  gridModeEnabled: appState.gridModeEnabled,
  suggestedBinding: appState.suggestedBinding,
  textToolHover: appState.textToolHover,
  isRotating: appState.isRotating,
  elementsToHighlight: appState.elementsToHighlight,
  collaborators: appState.collaborators, // Necessary for collab. sessions
  activeEmbeddable: appState.activeEmbeddable,
  snapLines: appState.snapLines,
  zenModeEnabled: appState.zenModeEnabled,
  editingTextElement: appState.editingTextElement,
  isCropping: appState.isCropping,
  croppingElementId: appState.croppingElementId,
  searchMatches: appState.searchMatches,
  activeLockedId: appState.activeLockedId,
  hoveredElementIds: appState.hoveredElementIds,
  frameRendering: appState.frameRendering,
  shouldCacheIgnoreZoom: appState.shouldCacheIgnoreZoom,
  exportScale: appState.exportScale,
  currentItemArrowType: appState.currentItemArrowType,
});

type Frame = { state: AppState; result: AppRenderResult };

const staticCanvasEqual = (prev: Frame, next: Frame) => {
  if (
    prev.result.canvasNonce !== next.result.canvasNonce ||
    prev.result.scale !== next.result.scale ||
    // we need to memoize on elementsMap because they may have renewed
    // even if canvasNonce didn't change (e.g. we filter elements out based
    // on appState)
    prev.result.renderableElementsMap !== next.result.renderableElementsMap ||
    prev.result.staticVisibleElements !== next.result.staticVisibleElements ||
    prev.state.selectionElement?.versionNonce !==
      next.state.selectionElement?.versionNonce
  ) {
    return false;
  }
  return (
    isShallowEqual(
      getStaticCanvasAppState(prev.state),
      getStaticCanvasAppState(next.state),
    ) &&
    isShallowEqual(
      prev.result.staticRenderConfig,
      next.result.staticRenderConfig,
    )
  );
};

const interactiveCanvasEqual = (prev: Frame, next: Frame) => {
  // This could be further optimised if needed, as we don't have to render
  // interactive canvas on each scene mutation
  if (
    prev.state.selectionElement?.versionNonce !==
      next.state.selectionElement?.versionNonce ||
    prev.result.canvasNonce !== next.result.canvasNonce ||
    prev.result.scale !== next.result.scale ||
    prev.result.renderableElementsMap !== next.result.renderableElementsMap ||
    prev.result.visibleElements !== next.result.visibleElements ||
    prev.result.selectedElements !== next.result.selectedElements ||
    prev.result.renderScrollbars !== next.result.renderScrollbars ||
    prev.result.interactionEnabled !== next.result.interactionEnabled ||
    prev.result.navigationEnabled !== next.result.navigationEnabled
  ) {
    return false;
  }
  // Comparing the interactive appState for changes in case of some edge cases
  return isShallowEqual(
    getInteractiveCanvasAppState(prev.state),
    getInteractiveCanvasAppState(next.state),
  );
};

// -----------------------------------------------------------------------------
// mounting
// -----------------------------------------------------------------------------

const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  scale: number,
) => {
  const styleWidth = `${width}px`;
  const styleHeight = `${height}px`;
  if (canvas.style.width !== styleWidth) {
    canvas.style.width = styleWidth;
  }
  if (canvas.style.height !== styleHeight) {
    canvas.style.height = styleHeight;
  }
  const pixelWidth = width * scale;
  const pixelHeight = height * scale;
  // assigning width/height clears the canvas, so only on change
  if (canvas.width !== pixelWidth) {
    canvas.width = pixelWidth;
  }
  if (canvas.height !== pixelHeight) {
    canvas.height = pixelHeight;
  }
};

/**
 * Builds the editor's canvas layers inside `host` and keeps them rendered.
 * Call after `app.excalidrawContainerRef.current` is set (the host should be
 * inside that container) and before `app.mountComponent()`.
 *
 * @returns cleanup
 */
export const mountCanvases = (app: App, host: HTMLElement) => {
  const doc = host.ownerDocument;

  // containers upstream renders for the text editor, the context menu and
  // the eye dropper (looked up by class name from core code)
  const textEditorContainer = doc.createElement("div");
  textEditorContainer.className = "excalidraw-textEditorContainer";
  const contextMenuContainer = doc.createElement("div");
  contextMenuContainer.className = "excalidraw-contextMenuContainer";
  const eyeDropperContainer = doc.createElement("div");
  eyeDropperContainer.className = "excalidraw-eye-dropper-container";

  // SVGLayer (laser / lasso / eraser / draw-shape trails)
  const svgLayer = doc.createElement("div");
  svgLayer.className = "SVGLayer";
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgLayer.appendChild(svg);
  const trails = [
    app.laserTrails,
    app.lassoTrail,
    app.eraserTrail,
    app.drawShape.trail,
  ];

  // StaticCanvas: upstream moves `app.canvas` into its wrapper
  const staticWrapper = doc.createElement("div");
  staticWrapper.className = "excalidraw__canvas-wrapper";
  app.canvas.classList.add("excalidraw__canvas", "static");
  staticWrapper.appendChild(app.canvas);

  // NewElementCanvas: only in the DOM while there is a preview element
  const newElementCanvas = doc.createElement("canvas");
  newElementCanvas.className = "excalidraw__canvas";

  // InteractiveCanvas
  const interactiveCanvas = doc.createElement("canvas");
  interactiveCanvas.className = "excalidraw__canvas interactive";
  // NOTE no `cursor` style here — the cursor is managed imperatively (see
  // `AppCursor`)
  interactiveCanvas.textContent = t("labels.drawingCanvas");

  host.append(
    textEditorContainer,
    contextMenuContainer,
    eyeDropperContainer,
    svgLayer,
    staticWrapper,
    interactiveCanvas,
  );

  // NOTE all the handlers early-exit in App when the editor is
  // non-interactive, so they're safe to bind unconditionally
  const listeners = new AbortController();
  const on = (type: string, listener: EventListener) =>
    interactiveCanvas.addEventListener(type, listener, {
      signal: listeners.signal,
    });
  on("contextmenu", app.handleCanvasContextMenu as EventListener);
  on("click", app.handleCanvasClick as EventListener);
  on("pointermove", app.handleCanvasPointerMove as EventListener);
  on("pointerup", app.handleCanvasPointerUp as EventListener);
  on("pointercancel", app.handleCanvasPointerCancel as EventListener);
  on("touchmove", app.handleTouchMove as EventListener);
  on("pointerdown", app.handleCanvasPointerDown as EventListener);
  // upstream binds onDoubleClick only outside view mode
  on("dblclick", ((event: MouseEvent) => {
    if (!app.state.viewModeEnabled) {
      app.handleCanvasDoubleClick(event);
    }
  }) as EventListener);

  app.handleInteractiveCanvasRef(interactiveCanvas);

  for (const trail of trails) {
    trail.start(svg);
  }

  // Unique per mounted instance so concurrent editors don't share the
  // interactive scene animation slot.
  const animationKey = Symbol("interactiveSceneAnimation");
  let rendererParams: InteractiveSceneRenderConfig | null = null;
  let interactiveMounted = false;
  let prev: Frame | null = null;

  const renderStatic = ({ state, result }: Frame) => {
    setCanvasSize(app.canvas, state.width, state.height, result.scale);
    renderStaticScene(
      {
        canvas: app.canvas,
        rc: app.rc,
        scale: result.scale,
        elementsMap: result.renderableElementsMap,
        allElementsMap: result.allElementsMap,
        visibleElements: result.staticVisibleElements,
        appState: state,
        renderConfig: result.staticRenderConfig,
      },
      isRenderThrottlingEnabled(),
    );
  };

  const renderNewElement = ({ state, result }: Frame) => {
    const previewElement = result.previewElement;
    if (!previewElement) {
      newElementCanvas.remove();
      return;
    }
    if (!newElementCanvas.isConnected) {
      interactiveCanvas.before(newElementCanvas);
    }
    setCanvasSize(newElementCanvas, state.width, state.height, result.scale);
    newElementCanvas.style.opacity =
      result.previewOpacity == null ? "" : String(result.previewOpacity);
    renderNewElementScene(
      {
        canvas: newElementCanvas,
        scale: result.scale,
        newElement: previewElement,
        elementsMap: result.renderableElementsMap,
        allElementsMap: result.allElementsMap,
        rc: app.rc,
        renderConfig: result.newElementRenderConfig,
        appState: state,
      },
      isRenderThrottlingEnabled(),
    );
  };

  const renderInteractive = ({ state, result }: Frame) => {
    setCanvasSize(interactiveCanvas, state.width, state.height, result.scale);

    // upstream skips the effect on the first render
    if (!interactiveMounted) {
      interactiveMounted = true;
      return;
    }

    const remotePointerButton: InteractiveCanvasRenderConfig["remotePointerButton"] =
      new Map();
    const remotePointerViewportCoords: InteractiveCanvasRenderConfig["remotePointerViewportCoords"] =
      new Map();
    const remoteSelectedElementIds: InteractiveCanvasRenderConfig["remoteSelectedElementIds"] =
      new Map();
    const remotePointerUsernames: InteractiveCanvasRenderConfig["remotePointerUsernames"] =
      new Map();
    const remotePointerUserStates: InteractiveCanvasRenderConfig["remotePointerUserStates"] =
      new Map();

    state.collaborators.forEach((user, socketId) => {
      if (user.selectedElementIds) {
        for (const id of Object.keys(user.selectedElementIds)) {
          if (!remoteSelectedElementIds.has(id)) {
            remoteSelectedElementIds.set(id, []);
          }
          remoteSelectedElementIds.get(id)!.push(socketId);
        }
      }
      if (!user.pointer || user.pointer.renderCursor === false) {
        return;
      }
      if (user.username) {
        remotePointerUsernames.set(socketId, user.username);
      }
      if (user.userState) {
        remotePointerUserStates.set(socketId, user.userState);
      }
      remotePointerViewportCoords.set(
        socketId,
        sceneCoordsToViewportCoords(
          { sceneX: user.pointer.x, sceneY: user.pointer.y },
          state,
        ),
      );
      remotePointerButton.set(socketId, user.button);
    });

    const selectionColor = getSelectionColor(app.excalidrawContainerRef.current);

    rendererParams = {
      app,
      canvas: interactiveCanvas,
      elementsMap: result.renderableElementsMap,
      visibleElements: result.visibleElements,
      selectedElements: result.selectedElements,
      allElementsMap: result.allElementsMap,
      scale: result.scale,
      appState: state,
      renderConfig: {
        remotePointerViewportCoords,
        remotePointerButton,
        remoteSelectedElementIds,
        remotePointerUsernames,
        remotePointerUserStates,
        selectionColor,
        renderScrollbars: result.renderScrollbars,
        // NOTE not memoized on so we don't rerender on cursor move
        lastViewportPosition: app.viewport.lastPosition,
      },
      editorInterface: app.editorInterface,
      callback: app.renderInteractiveSceneCallback,
      animationState: {
        bindingHighlight: undefined,
      },
      deltaTime: 0,
    };

    if (!AnimationController.running(animationKey)) {
      AnimationController.start<InteractiveSceneRenderAnimationState>(
        animationKey,
        ({ deltaTime, state: animationState }) => {
          const nextAnimationState = renderInteractiveScene({
            ...rendererParams!,
            deltaTime,
            animationState,
          }).animationState;

          if (nextAnimationState) {
            for (const key in nextAnimationState) {
              if (
                nextAnimationState[
                  key as keyof InteractiveSceneRenderAnimationState
                ] !== undefined
              ) {
                return nextAnimationState;
              }
            }
          }

          return undefined;
        },
        app.ownerWindow,
      );
    }
  };

  const update = () => {
    const result = app.renderResult;
    if (!result) {
      return;
    }
    const next: Frame = { state: app.state, result };
    if (!prev || !staticCanvasEqual(prev, next)) {
      renderStatic(next);
    }
    // NewElementCanvas isn't memoized upstream
    renderNewElement(next);
    if (!prev || !interactiveCanvasEqual(prev, next)) {
      renderInteractive(next);
    }
    prev = next;
  };

  const unsubscribe = app.subscribe(update);
  update();

  return () => {
    unsubscribe();
    AnimationController.cancel(animationKey);
    for (const trail of trails) {
      trail.stop();
    }
    listeners.abort();
    app.handleInteractiveCanvasRef(null);
    textEditorContainer.remove();
    contextMenuContainer.remove();
    eyeDropperContainer.remove();
    svgLayer.remove();
    staticWrapper.remove();
    newElementCanvas.remove();
    interactiveCanvas.remove();
  };
};

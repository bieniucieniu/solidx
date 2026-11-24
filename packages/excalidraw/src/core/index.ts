/// <reference path="./global.d.ts" />
/// <reference path="./css.d.ts" />
/// <reference path="./vite-env.d.ts" />
// @solidx/excalidraw/core — the framework-free editor, ported from
// @excalidraw/excalidraw. Mirrors upstream index.tsx's non-React exports.

export {
  createEditor,
  loadLanguage,
  normalizeProps,
  type ExcalidrawEditor,
} from "./editor";
export { default as App, type AppRenderResult } from "./components/App";
export { mountCanvases } from "./components/canvases";
export { setFlushHandler } from "./reactUtils";
export { CONTEXT_MENU_SEPARATOR } from "./components/ContextMenu";
export type {
  ContextMenuItem,
  ContextMenuItems,
} from "./components/ContextMenu";
export {
  TOOLS,
  TOGGLE_TOOLS,
  getToolLetter,
  getToolShortcut,
  isToolButtonDisabled,
  type ToolbarToolType,
} from "./components/Tools";
export {
  cursorHintAtom,
  type CursorHintContent,
} from "./components/CursorHint";
export { activeEyeDropperAtom } from "./components/EyeDropper";
export { activeConfirmDialogAtom } from "./components/ActiveConfirmDialog";
export { editorJotaiStore, type PrimitiveAtom } from "./editor-jotai";

export { actions } from "./actions/register";
export type { Action, ActionName, ActionResult } from "./actions/types";

export {
  getSceneVersion,
  hashElementsVersion,
  hashString,
  getNonDeletedElements,
} from "@excalidraw/element";

export { getTextFromElements } from "@excalidraw/element";
export { isInvisiblySmallElement } from "@excalidraw/element";

export {
  defaultLang,
  resolveLanguage,
  t,
  getLangCode,
  subscribeLangCode,
} from "./i18n";
export type {
  ExcalidrawLocales,
  Language,
  LocaleData,
  LocaleLoader,
} from "./i18n";
export {
  restoreAppState,
  restoreElement,
  restoreElements,
  restoreLibraryItems,
} from "./data/restore";

export { reconcileElements } from "./data/reconcile";

export { exportScene, exportToClipboard } from "./scene/export";

export type {
  ExportSceneData,
  ExportSceneConfig,
  ExportSceneOptions,
} from "./scene/export";

export { serializeAsJSON, serializeLibraryAsJSON } from "./data/json";
export {
  loadFromBlob,
  loadSceneOrLibraryFromBlob,
  loadLibraryFromBlob,
  getDataURL,
} from "./data/blob";
export {
  mergeLibraryItems,
  getLibraryItemsHash,
  parseLibraryTokensFromUrl,
} from "./data/library";
export { isLinearElement } from "@excalidraw/element";

export {
  FONT_FAMILY,
  THEME,
  MIME_TYPES,
  ROUNDNESS,
  DEFAULT_LASER_COLOR,
  UserIdleState,
  normalizeLink,
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  getFormFactor,
  throttleRAF,
  applyDarkModeFilter,
  getStrokeWidthByKey,
  DEFAULT_ELEMENT_STROKE_PICKS,
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
} from "@excalidraw/common";
export {
  PROPERTIES,
  type PropertyName,
  type PropertyValue,
} from "./actions/propertyValues";

export {
  mutateElement,
  newElementWith,
  bumpVersion,
} from "@excalidraw/element";

export { CaptureUpdateAction } from "@excalidraw/element";

export { zoomToFitBounds, DEFAULT_OVERSCROLL } from "./viewport";

export {
  getCommonBounds,
  getVisibleSceneBounds,
  convertToExcalidrawElements,
} from "@excalidraw/element";

export { elementsOverlappingBBox } from "@excalidraw/element";
export { isElementLink } from "@excalidraw/element";

import { Fonts, type ExcalidrawFonts } from "./fonts/Fonts";

export { Fonts };
export type { ExcalidrawFonts, FontSource } from "./fonts/Fonts";
export { setFontSubsetter } from "./fonts/subset";
export type { FontSubsetter } from "./fonts/subset";

/** registers the host's font files (what the `fonts` prop does) */
export const registerFonts = (fonts: ExcalidrawFonts) =>
  Fonts.registerFonts(fonts);

export { setCustomTextMetricsProvider } from "@excalidraw/element";
export type { RenderEnvironment } from "@excalidraw/element";

export {
  renderSpreadsheet,
  tryParseSpreadsheet,
  isSpreadsheetValidForChartType,
} from "./charts";

export type * from "./types";

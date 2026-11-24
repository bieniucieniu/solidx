/// <reference path="./core/global.d.ts" />
/// <reference path="./core/css.d.ts" />
/// <reference path="./core/vite-env.d.ts" />
// @solidx/excalidraw — headless Excalidraw for Solid 2.0.
export { Excalidraw, type ExcalidrawRootProps } from "./components/Excalidraw";
export { createExcalidraw, type Excalidraw as ExcalidrawInstance } from "./solid/createExcalidraw";
export { ExcalidrawContext, useExcalidraw } from "./solid/context";
export * from "./solid/hooks";

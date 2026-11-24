// Framework-free replacement for upstream's reactUtils.ts. Upstream wraps
// handlers in react-dom's `unstable_batchedUpdates` and forces synchronous
// commits with `flushSync`. Here `App` batches its own updates (see
// ./components/AppBase), so `withBatchedUpdates` is a no-op and `flushSync`
// commits pending `App` updates, then asks the UI binding (Solid's `flush`)
// to apply its updates synchronously.

import { throttleRAF } from "@excalidraw/common";

import { commitDirtyComponents } from "./components/AppBase";

let flushHandler: () => void = () => {};

/** set by the UI binding, e.g. `setFlushHandler(flush)` from solid-js */
export const setFlushHandler = (handler: () => void) => {
  flushHandler = handler;
};

export const flushSync = <T>(fn: () => T): T => {
  const result = fn();
  commitDirtyComponents();
  flushHandler();
  return result;
};

export const withBatchedUpdates = <
  TFunction extends ((event: any) => void) | (() => void),
>(
  func: Parameters<TFunction>["length"] extends 0 | 1 ? TFunction : never,
) => func as TFunction;

/**
 * throttles the calls to a single call per animation frame
 */
export const withBatchedUpdatesThrottled = <
  TFunction extends ((event: any) => void) | (() => void),
>(
  func: Parameters<TFunction>["length"] extends 0 | 1 ? TFunction : never,
  ownerWindow: Window = window,
) => {
  return throttleRAF<Parameters<TFunction>>(
    func as (...args: Parameters<TFunction>) => void,
    ownerWindow,
  );
};

export const isRenderThrottlingEnabled = () =>
  window.EXCALIDRAW_THROTTLE_RENDER === true;

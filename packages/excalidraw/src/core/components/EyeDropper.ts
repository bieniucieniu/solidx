// Headless part of upstream components/EyeDropper.tsx: the active eye
// dropper state the editor reads, and its cursor. The picker overlay itself
// is left to the UI layer.
import { MIME_TYPES } from "@excalidraw/common";

import { atom } from "../editor-jotai";

import type { ColorPickerType } from "./ColorPicker/colorPickerUtils";

export type EyeDropperProperties = {
  keepOpenOnAlt: boolean;
  swapPreviewOnAlt?: boolean;
  /** called when user picks color (on pointerup) */
  onSelect: (color: string, event: PointerEvent) => void;
  /**
   * property of selected elements to update live when alt-dragging.
   * Supply `null` if not applicable (e.g. updating the canvas bg instead of
   * elements)
   **/
  colorPickerType: ColorPickerType;
};

export const activeEyeDropperAtom = atom<null | EyeDropperProperties>(null);

export const eyeDropperIconSvgPaths = [
  "M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z",
  "M11 7l6 6",
] as const;

const eyeDropperCursorPaths = eyeDropperIconSvgPaths
  .map((path, idx) => `<path fill="${idx === 0 ? `#fff` : ``}" d="${path}" />`)
  .join("");

/** CSS cursor for the eye dropper overlay */
export const eyeDropperCursor = `url(data:${MIME_TYPES.svg},${encodeURIComponent(
  `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff" stroke-width="5">${eyeDropperCursorPaths}</g><g stroke="#1b1b1f" stroke-width="1.25">${eyeDropperCursorPaths}</g></svg>`,
)}) 2 21, auto`;

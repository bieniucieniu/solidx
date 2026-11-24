// Headless port of upstream components/ContextMenu.tsx: the item types and
// the separator constant only. Rendering lives in the Solid layer.
import type { Action } from "../actions/types";

export const CONTEXT_MENU_SEPARATOR = "separator";

export type ContextMenuItem = typeof CONTEXT_MENU_SEPARATOR | Action;

export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[];

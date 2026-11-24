// Moved out of upstream hooks/useLibraryItemSvg.ts (a React hook module) so
// core code can clear the cache without importing React.
import { atom } from "../editor-jotai";

import type { LibraryItem } from "../types";

export type SvgCache = Map<LibraryItem["id"], SVGSVGElement>;

export const libraryItemSvgsCache = atom<SvgCache>(new Map());

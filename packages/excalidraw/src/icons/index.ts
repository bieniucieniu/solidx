// @solidx/excalidraw/icons — upstream components/icons.tsx as Solid icon
// components (`<RectangleIcon />`), plus a tool → icon map.
export * from "./icons";

import type { ToolbarToolType } from "#ex/core";
import {
  ArrowIcon,
  DiamondIcon,
  EllipseIcon,
  EmbedIcon,
  EraserIcon,
  FreedrawIcon,
  ImageIcon,
  LassoIcon,
  LineIcon,
  RectangleIcon,
  SelectionIcon,
  TextIcon,
  bucketFillIcon,
  drawShapeToolIcon,
  frameToolIcon,
  handIcon,
  laserPointerToolIcon,
  stickyNoteToolIcon,
  type Icon,
} from "./icons";

/** the icon upstream's toolbar shows for each tool (from components/Tools.tsx) */
export const TOOL_ICONS: Partial<Record<ToolbarToolType, Icon>> = {
  hand: handIcon,
  selection: SelectionIcon,
  rectangle: RectangleIcon,
  diamond: DiamondIcon,
  ellipse: EllipseIcon,
  arrow: ArrowIcon,
  line: LineIcon,
  freedraw: FreedrawIcon,
  autoshape: drawShapeToolIcon,
  text: TextIcon,
  image: ImageIcon,
  eraser: EraserIcon,
  laser: laserPointerToolIcon,
  bucketfill: bucketFillIcon,
  lasso: LassoIcon,
  frame: frameToolIcon,
  embeddable: EmbedIcon,
  stickynote: stickyNoteToolIcon,
};

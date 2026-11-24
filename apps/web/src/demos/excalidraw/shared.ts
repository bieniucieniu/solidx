import type { JSX } from "@solidjs/web";
import {
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_STROKE_PICKS,
  FONT_FAMILY,
  type ToolType,
} from "@solidx/excalidraw/core";

/** the tools both demo toolbars show, in upstream's order */
export const TOOLBAR: { type: ToolType; label: string; key: string }[] = [
  { type: "hand", label: "Hand", key: "H" },
  { type: "selection", label: "Selection", key: "V" },
  { type: "rectangle", label: "Rectangle", key: "R" },
  { type: "diamond", label: "Diamond", key: "D" },
  { type: "ellipse", label: "Ellipse", key: "O" },
  { type: "arrow", label: "Arrow", key: "A" },
  { type: "line", label: "Line", key: "L" },
  { type: "freedraw", label: "Draw", key: "P" },
  { type: "text", label: "Text", key: "T" },
  { type: "eraser", label: "Eraser", key: "E" },
];

export const STROKE_COLORS = DEFAULT_ELEMENT_STROKE_PICKS;
export const BACKGROUND_COLORS = ["transparent", ...DEFAULT_ELEMENT_BACKGROUND_PICKS.slice(1)];

export const FILL_STYLES = [
  { value: "hachure", label: "Hachure" },
  { value: "cross-hatch", label: "Cross-hatch" },
  { value: "solid", label: "Solid" },
] as const;

export const STROKE_WIDTHS = [
  { value: "thin", label: "Thin" },
  { value: "medium", label: "Bold" },
  { value: "bold", label: "Extra bold" },
] as const;

export const STROKE_STYLES = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
] as const;

export const SLOPPINESS = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" },
] as const;

export const ROUNDNESS = [
  { value: "sharp", label: "Sharp" },
  { value: "round", label: "Round" },
] as const;

export const FONT_SIZES = [
  { value: 16, label: "S" },
  { value: 20, label: "M" },
  { value: 28, label: "L" },
  { value: 36, label: "XL" },
] as const;

export const FONT_FAMILIES = [
  { value: FONT_FAMILY.Excalifont, label: "Hand-drawn" },
  { value: FONT_FAMILY.Nunito, label: "Normal" },
  { value: FONT_FAMILY["Comic Shanns"], label: "Code" },
] as const;

export const TEXT_ALIGNS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

/** a transparent swatch shows a checkerboard */
export const swatchStyle = (color: string): JSX.CSSProperties =>
  color === "transparent"
    ? {
        "background-image": "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)",
        "background-size": "8px 8px",
      }
    : { background: color };

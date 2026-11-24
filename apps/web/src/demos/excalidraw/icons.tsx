import { type JSX } from "@solidjs/web";
import type { ToolType } from "@solidx/excalidraw/core";

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

/** an outline icon; `d` may hold several subpaths */
function icon(d: string) {
  return (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

// Tabler Icons paths (MIT).
export const HandIcon = icon(
  "M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 5.5v-2a1.5 1.5 0 1 1 3 0V12M14 5.5a1.5 1.5 0 0 1 3 0V12M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022 1.867 1.867 0 0 1 2.28.28L8 13",
);
export const PointerIcon = icon(
  "M7.904 17.563a1.2 1.2 0 0 0 2.228.308l2.09-3.093 4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047-1.047a1.067 1.067 0 0 0 0-1.509l-4.907-4.907 3.113-2.09a1.2 1.2 0 0 0-.309-2.228L4 4z",
);
export const SquareIcon = icon(
  "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
);
export const DiamondIcon = icon(
  "M10.5 20.4l-6.9-6.9c-.781-.781-.781-2.219 0-3l6.9-6.9c.781-.781 2.219-.781 3 0l6.9 6.9c.781.781.781 2.219 0 3l-6.9 6.9c-.781.781-2.219.781-3 0z",
);
export const CircleIcon = icon("M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0");
export const ArrowIcon = icon("M5 12h14M13 18l6-6M13 6l6 6");
export const LineIcon = icon("M5 12h14");
export const PencilIcon = icon("M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16v4M13.5 6.5l4 4");
export const TextIcon = icon("M6 4h12M12 4v16");
export const EraserIcon = icon(
  "M19 20h-10.5l-4.21-4.3a1 1 0 0 1 0-1.41l10-10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41L11.5 20M18 13.3l-6.3-6.3",
);
export const LockIcon = icon(
  "M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0M8 11V7a4 4 0 1 1 8 0v4",
);
export const LockOpenIcon = icon(
  "M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0M8 11V6a4 4 0 0 1 8 0",
);
export const UndoIcon = icon("M9 14l-4-4 4-4M5 10h11a4 4 0 1 1 0 8h-1");
export const RedoIcon = icon("M15 14l4-4-4-4M19 10H8a4 4 0 1 0 0 8h1");
export const ZoomInIcon = icon("M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M7 10h6M10 7v6M21 21l-6-6");
export const ZoomOutIcon = icon("M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M7 10h6M21 21l-6-6");
export const MenuIcon = icon("M4 6h16M4 12h16M4 18h16");

/** the toolbar's tool icons */
export const TOOL_ICONS: Partial<Record<ToolType, (props: IconProps) => JSX.Element>> = {
  hand: HandIcon,
  selection: PointerIcon,
  rectangle: SquareIcon,
  diamond: DiamondIcon,
  ellipse: CircleIcon,
  arrow: ArrowIcon,
  line: LineIcon,
  freedraw: PencilIcon,
  text: TextIcon,
  eraser: EraserIcon,
};

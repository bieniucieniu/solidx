// Tool data from upstream components/Tools.tsx, without icons and the
// React tool buttons. Icons for each tool live in @solidx/excalidraw/icons.

import { KEYS, capitalizeString } from "@excalidraw/common";
import { t } from "../i18n";
import { getShortcutKey } from "../shortcut";

import type {
  AppClassProperties,
  ToolType,
} from "../types";

export type ToolConfig = {
  /** letter shortcut(s) — the first one is shown in tooltips and badges */
  letterKey?: string | readonly string[];
  /** whether `letterKey` requires Shift to be held (e.g. Shift+X) */
  shiftKey?: boolean;
  numericKey?: string;
  /** whether the tool's shapes can be filled — fills the icon when active */
  fillable?: boolean;
  /**
   * re-activating the tool switches back to the previously active tool
   * (via the keyboard shortcut or ESC — see `setActiveTool`'s `toggle`
   * option)
   */
  toggle?: boolean;
};

/** preserves the exact keys while typing every entry as ToolConfig */
const defineTools = <T extends Record<string, ToolConfig>>(tools: T) =>
  tools as { [K in keyof T]: ToolConfig };

/**
 * Tool data — the single source of truth for tool buttons, keyboard
 * shortcuts (`findShapeByKey`), and the command palette. Toolbar placement
 * is not defined here: toolbars compose the `*ToolButton` components below
 * manually, so entries without a toolbar slot (e.g. laser) are data-only.
 */
export const TOOLS = defineTools({
  hand: {
    letterKey: KEYS.H,
    toggle: true,
  },
  selection: {
    letterKey: KEYS.V,
    numericKey: KEYS["1"],
    fillable: true,
  },
  rectangle: {
    letterKey: KEYS.R,
    numericKey: KEYS["2"],
    fillable: true,
  },
  diamond: {
    letterKey: KEYS.D,
    numericKey: KEYS["3"],
    fillable: true,
  },
  ellipse: {
    letterKey: KEYS.O,
    numericKey: KEYS["4"],
    fillable: true,
  },
  arrow: {
    letterKey: KEYS.A,
    numericKey: KEYS["5"],
    fillable: true,
  },
  line: {
    letterKey: KEYS.L,
    numericKey: KEYS["6"],
    fillable: true,
  },
  freedraw: {
    letterKey: [KEYS.P, KEYS.X],
    numericKey: KEYS["7"],
  },
  text: {
    letterKey: KEYS.T,
    numericKey: KEYS["8"],
  },
  stickynote: {
    letterKey: KEYS.N,
  },
  image: {
    numericKey: KEYS["9"],
  },
  eraser: {
    letterKey: KEYS.E,
    numericKey: KEYS["0"],
    toggle: true,
  },
  frame: {
    letterKey: KEYS.F,
  },
  autoshape: {
    letterKey: KEYS.X,
    shiftKey: true,
    fillable: false,
  },
  embeddable: {
  },
  laser: {
    letterKey: KEYS.K,
  },
  bucketfill: {
    letterKey: KEYS.B,
  },
  lasso: {
    fillable: false,
  },
});

export type ToolbarToolType = keyof typeof TOOLS;

/**
 * tools that, when activated while already active, switch back to the
 * previously active tool (see `setActiveTool`'s `toggle` option)
 */
export const TOGGLE_TOOLS: readonly (ToolType | "custom")[] = (
  Object.keys(TOOLS) as ToolbarToolType[]
).filter((type) => TOOLS[type].toggle);

export const getToolLetter = (type: ToolbarToolType) => {
  const { letterKey, shiftKey } = TOOLS[type];
  if (!letterKey) {
    return letterKey;
  }
  const letter = capitalizeString(
    typeof letterKey === "string" ? letterKey : letterKey[0],
  );
  return shiftKey ? getShortcutKey(`Shift+${letter}`) : letter;
};

/** human-readable shortcut hint, e.g. "R or 2", used in tooltips & aria */
export const getToolShortcut = (type: ToolbarToolType) => {
  const letter = getToolLetter(type);
  const { numericKey } = TOOLS[type];
  return letter && numericKey != null
    ? `${letter} ${t("helpDialog.or")} ${numericKey}`
    : `${letter || numericKey}`;
};

export const findShapeByKey = (
  key: string,
  app: AppClassProperties,
  shiftKey: boolean = false,
) => {
  // CapsLock-insensitive: the caller excludes every modifier but shift, and
  // shift is matched explicitly below, so a capital letter on its own means
  // CapsLock
  const lowerKey = key.toLowerCase();

  for (const type of Object.keys(TOOLS) as ToolbarToolType[]) {
    const { letterKey, numericKey, shiftKey: requiresShift } = TOOLS[type];
    // shift-bound tools require shift; plain-bound ones require its absence
    if (shiftKey !== Boolean(requiresShift)) {
      continue;
    }
    if (
      (numericKey != null && key === numericKey) ||
      (letterKey &&
        (typeof letterKey === "string"
          ? letterKey === lowerKey
          : letterKey.includes(lowerKey)))
    ) {
      // the selection shortcut activates whichever selection tool the user
      // prefers (selection or lasso)
      return type === "selection"
        ? app.state.preferredSelectionTool.type
        : type;
    }
  }
  return null;
};

/**
 * Whether a toolbar entry activating the given tool renders disabled — true
 * when the active tool is host-controlled (`props.activeTool`) and the entry
 * doesn't activate the forced tool (`setActiveTool` refuses it).
 */
export const isToolButtonDisabled = (app: AppClassProperties, type: string) =>
  app.props.activeTool != null && app.props.activeTool.type !== type;


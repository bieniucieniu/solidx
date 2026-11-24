// Headless part of upstream components/CursorHint.tsx. Upstream stores a
// React icon as the hint content; here the hint is a descriptor the UI layer
// maps to an icon (`arrowType` → the arrow type's icon, `line` → line icon).
import { atom } from "../editor-jotai";

import type { AppClassProperties, AppState } from "../types";

/**
 * While a recently shown hint is still fresh in memory, tool-switch hints
 * are suppressed (repeatedly re-picking a tool you just used doesn't need
 * the reminder). Cycling arrow types and numeric shortcuts bypass this.
 */
export const CURSOR_HINT_COOLDOWN = 30 * 1000;

export type CursorHintContent =
  | { type: "arrowType"; arrowType: AppState["currentItemArrowType"] }
  | { type: "line" };

export const cursorHintAtom = atom<{
  content: CursorHintContent;
  /** unique per trigger so a re-trigger restarts the hide timer */
  nonce: number;
} | null>(null);

/**
 * Owns the cursor-hint policy. App reports semantic interaction events
 * (what the user did); all decisions about whether and what to show —
 * cooldown, bypasses, hint content — are made here.
 */
export class CursorHints {
  private app: AppClassProperties;
  private lastShownAt = 0;

  constructor(app: AppClassProperties) {
    this.app = app;
  }

  /**
   * Shows a transient tooltip next to the cursor, hidden automatically
   * after a short delay. Repeated calls replace the content and restart
   * the timer.
   */
  show = (content: CursorHintContent) => {
    // `viewport.lastPosition` stays at its initial (0, 0) until the first
    // pointermove, so in pointer-less flows (e.g. keyboard-only session so
    // far) we don't know where to show the hint — don't show it at all
    const { x, y } = this.app.viewport.lastPosition;
    if (x === 0 && y === 0) {
      return;
    }
    this.lastShownAt = Date.now();
    this.app.updateEditorAtom(cursorHintAtom, {
      content,
      nonce: Math.random(),
    });
  };

  private isOnCooldown = () =>
    Date.now() - this.lastShownAt < CURSOR_HINT_COOLDOWN;

  /** arrow type cycled via shortcut (arrow tool already active) */
  onArrowTypeCycled = (arrowType: AppState["currentItemArrowType"]) => {
    // always worth hinting — you need to see what you switched to
    this.show({ type: "arrowType", arrowType });
  };

  /** arrow/line tool picked via keyboard shortcut */
  onToolShortcut = (tool: "arrow" | "line", source: "letter" | "digit") => {
    // digit shortcuts always hint (often pressed blind, without certainty
    // which tool the digit maps to); letter shortcuts only after a
    // cooldown — re-picking a tool you used moments ago doesn't need the
    // reminder
    if (source === "digit" || !this.isOnCooldown()) {
      this.show(
        tool === "line"
          ? { type: "line" }
          : {
              type: "arrowType",
              arrowType: this.app.state.currentItemArrowType,
            },
      );
    }
  };
}

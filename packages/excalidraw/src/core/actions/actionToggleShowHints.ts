import { CaptureUpdateAction } from "@excalidraw/element";

import { register } from "./register";

export const actionToggleShowHints = register({
  name: "showHints",
  label: "labels.showHints",
  keywords: ["hint", "hints", "tip", "tips"],
  // hints live in the toolbar, which view mode hides entirely
  viewMode: false,
  trackEvent: {
    category: "canvas",
    predicate: (appState) => !appState.showHints,
  },
  perform(elements, appState) {
    return {
      appState: {
        ...appState,
        showHints: !this.checked!(appState),
      },
      captureUpdate: CaptureUpdateAction.NEVER,
    };
  },
  checked: (appState) => appState.showHints,
});

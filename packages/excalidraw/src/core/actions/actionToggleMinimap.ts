import { CaptureUpdateAction } from "@excalidraw/element";
import { MINIMAP_MIN_EDITOR_HEIGHT } from "../components/Minimap/constants";

import { register } from "./register";

export const actionToggleMinimap = register({
  name: "minimap",
  label: "labels.minimap",
  keywords: ["map", "overview", "navigator", "navigation"],
  viewMode: true,
  navigation: true,
  trackEvent: {
    category: "canvas",
    predicate: (appState) => !appState.minimapEnabled,
  },
  perform(elements, appState) {
    return {
      appState: {
        ...appState,
        minimapEnabled: !this.checked!(appState),
      },
      captureUpdate: CaptureUpdateAction.EVENTUALLY,
    };
  },
  checked: (appState) => appState.minimapEnabled,
  predicate: (elements, appState, appProps, app) =>
    // not part of the host's UI (`ui={false}`, `ui.enabled`, or
    // `ui.disabled.minimap`)
    app.isUIControlEnabled("minimap") &&
    // the minimap lives in the footer, which isn't rendered on phones
    app.editorInterface.formFactor !== "phone" &&
    appState.height >= MINIMAP_MIN_EDITOR_HEIGHT &&
    app.isNavigationEnabled(),
});

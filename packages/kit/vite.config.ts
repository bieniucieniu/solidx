import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  plugins: [solid()],
  // One copy of @ui-sdk/core for the app and @ui-sdk/solid.
  optimizeDeps: {
    exclude: ["@ui-sdk/core"],
  },
  pack: [
    {
      plugins: [solid()],
      format: ["esm"],
      clean: true,
      dts: true,
      unbundle: true,
      deps: {
        neverBundle: [/^[^./#]/],
      },
      platform: "browser",
      entry: {
        ui: "src/components/ui/index.ts",
        m3: "src/components/m3/index.ts",
        motion: "src/components/motion/index.ts",
        xyflow: "src/components/xyflow/index.ts",
        "xyflow-panels": "src/components/xyflow/panels.ts",
        tiptap: "src/components/tiptap/index.ts",
        "tiptap-menus": "src/components/tiptap/menus/index.ts",
        "tiptap-node-view": "src/components/tiptap/node-view.ts",
      },
      outputOptions: { dir: "dist" },
    },
    {
      // The m3Scheme plugin runs in Node, next to the app's Vite config.
      format: ["esm"],
      dts: true,
      unbundle: true,
      deps: {
        neverBundle: [/^[^./#]/],
      },
      platform: "node",
      entry: { vite: "src/vite/m3-scheme.ts" },
      outputOptions: { dir: "dist" },
    },
  ],
  test: {
    environment: "node",
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});

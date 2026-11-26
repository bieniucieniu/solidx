import solid from "@solidjs/vite-plugin";
import { m3Scheme } from "@solidx/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileRoutes } from "filesystem-routing/vite";
import { prerender } from "prerender-crawler/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    // Generates the default M3 color tokens from a seed at build time (virtual:m3-scheme.css).
    m3Scheme({ seed: "#7D5260", variant: "fidelity" }),
    tailwindcss(),
    // Solid 2 start mode (the SolidStart successor): streaming SSR around src/App.tsx, wrapped
    // in src/Document.tsx. `vite build` writes client assets to dist/client and the request
    // handler to dist/server, plus a ready-to-run Node server at dist/server/node.js.
    solid({
      start: { nodeServer: true },
      ssr: true,
      // Also compile the `?pick=` route modules the fileRoutes plugin emits.
      extensions: [".jsx", ".tsx"],
    }),
    fileRoutes({ types: true }),
    // Renders every page reachable from `/` to static HTML in dist/client at build time. The
    // Node server still renders anything the crawl did not write.
    prerender({ mode: "static" }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // Bundle every dependency into the server build, so dist/ runs on its own (the Docker image
  // ships dist/ without node_modules).
  ssr: {
    noExternal: true,
  },
  // One copy of @ui-sdk/core for the app and @ui-sdk/solid.
  optimizeDeps: {
    exclude: ["@ui-sdk/core"],
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});

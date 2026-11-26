// Types for the modules the m3Scheme plugin serves. Reference them from the app:
// `/// <reference types="@solidx/kit/vite/client" />`, or add the path to tsconfig `types`.

declare module "virtual:m3-scheme.css" {}

declare module "virtual:m3-scheme" {
  import type { SchemeOptions, SchemeVars } from "@solidx/kit/m3";

  /** The options passed to m3Scheme, without `outFile` and `selectors`. */
  export const options: Omit<SchemeOptions, "dark">;
  /** The light scheme's `--md-sys-color-*` vars. */
  export const light: SchemeVars;
  /** The dark scheme's `--md-sys-color-*` vars. */
  export const dark: SchemeVars;
}

import * as utilities from "@material/material-color-utilities";
import { describe, expect, test } from "vite-plus/test";
import { applyScheme, buildScheme, createScheme, schemeCss, schemeCssFrom } from "./scheme";

const options = { seed: "#6750A4", variant: "tonal-spot" } as const;

describe("scheme", () => {
  test("buildScheme matches createScheme", async () => {
    const vars = buildScheme(utilities, options);
    expect(vars).toEqual(await createScheme(options));
    expect(Object.keys(vars)).toHaveLength(49);
    expect(vars["--md-sys-color-primary"]).toMatch(/^#[0-9a-f]{6}$/);
  });

  test("schemeCssFrom uses the given selectors", async () => {
    const light = buildScheme(utilities, { ...options, dark: false });
    const dark = buildScheme(utilities, { ...options, dark: true });
    const css = schemeCssFrom(light, dark, { light: ":root:root", dark: ":root.dark" });
    expect(css.startsWith(":root:root {\n")).toBe(true);
    expect(css).toContain(
      `:root.dark {\n  --md-sys-color-primary: ${dark["--md-sys-color-primary"]};`,
    );
    expect(await schemeCss(options)).toBe(schemeCssFrom(light, dark));
  });

  test("applyScheme takes precomputed vars and cleans up", async () => {
    const element = document.createElement("div");
    const vars = buildScheme(utilities, { ...options, dark: true });
    const remove = await applyScheme(element, vars);
    expect(element.style.getPropertyValue("--md-sys-color-primary")).toBe(
      vars["--md-sys-color-primary"],
    );
    remove();
    expect(element.style.getPropertyValue("--md-sys-color-primary")).toBe("");
  });
});

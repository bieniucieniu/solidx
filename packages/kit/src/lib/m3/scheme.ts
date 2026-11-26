import type { DynamicScheme } from "@material/material-color-utilities";

/**
 * material-color-utilities loads on first use. It stays out of the main bundle, and out of SSR:
 * 0.4.0 has an extensionless relative import that Node's ESM loader rejects.
 */
function loadUtilities() {
  return import("@material/material-color-utilities");
}

export type SchemeVariant =
  | "tonal-spot"
  | "vibrant"
  | "expressive"
  | "fidelity"
  | "content"
  | "neutral"
  | "monochrome";

export interface SchemeOptions {
  /** Seed color as hex, e.g. "#6750A4". */
  seed: string;
  dark?: boolean;
  /** -1 (reduced) to 1 (high). 0 is standard. */
  contrast?: number;
  /** How the palette is derived from the seed. Material's default is tonal spot. */
  variant?: SchemeVariant;
  /** Color spec. 2025 is the M3 Expressive spec. */
  specVersion?: "2021" | "2025";
}

/** CSS role name → DynamicScheme getter. Matches the roles in tokens.css. */
const roles = {
  primary: "primary",
  "on-primary": "onPrimary",
  "primary-container": "primaryContainer",
  "on-primary-container": "onPrimaryContainer",
  secondary: "secondary",
  "on-secondary": "onSecondary",
  "secondary-container": "secondaryContainer",
  "on-secondary-container": "onSecondaryContainer",
  tertiary: "tertiary",
  "on-tertiary": "onTertiary",
  "tertiary-container": "tertiaryContainer",
  "on-tertiary-container": "onTertiaryContainer",
  error: "error",
  "on-error": "onError",
  "error-container": "errorContainer",
  "on-error-container": "onErrorContainer",
  surface: "surface",
  "on-surface": "onSurface",
  "surface-variant": "surfaceVariant",
  "on-surface-variant": "onSurfaceVariant",
  "surface-container-lowest": "surfaceContainerLowest",
  "surface-container-low": "surfaceContainerLow",
  "surface-container": "surfaceContainer",
  "surface-container-high": "surfaceContainerHigh",
  "surface-container-highest": "surfaceContainerHighest",
  "surface-dim": "surfaceDim",
  "surface-bright": "surfaceBright",
  "inverse-surface": "inverseSurface",
  "inverse-on-surface": "inverseOnSurface",
  "inverse-primary": "inversePrimary",
  outline: "outline",
  "outline-variant": "outlineVariant",
  scrim: "scrim",
  shadow: "shadow",
  "primary-fixed": "primaryFixed",
  "primary-fixed-dim": "primaryFixedDim",
  "on-primary-fixed": "onPrimaryFixed",
  "on-primary-fixed-variant": "onPrimaryFixedVariant",
  "secondary-fixed": "secondaryFixed",
  "secondary-fixed-dim": "secondaryFixedDim",
  "on-secondary-fixed": "onSecondaryFixed",
  "on-secondary-fixed-variant": "onSecondaryFixedVariant",
  "tertiary-fixed": "tertiaryFixed",
  "tertiary-fixed-dim": "tertiaryFixedDim",
  "on-tertiary-fixed": "onTertiaryFixed",
  "on-tertiary-fixed-variant": "onTertiaryFixedVariant",
} as const satisfies Record<string, keyof DynamicScheme>;

/** `--md-sys-color-*` custom property name → hex value. */
export type SchemeVars = Record<string, string>;

/** The `@material/material-color-utilities` module. */
export type ColorUtilities = typeof import("@material/material-color-utilities");

export interface SchemeSelectors {
  light: string;
  dark: string;
}

/**
 * The scheme's colors as `--md-sys-color-*` custom properties (hex values), from an already
 * loaded color-utilities module. Synchronous, so build tools can call it (see `@solidx/kit/vite`).
 */
export function buildScheme(utilities: ColorUtilities, options: SchemeOptions): SchemeVars {
  const schemes = {
    "tonal-spot": utilities.SchemeTonalSpot,
    vibrant: utilities.SchemeVibrant,
    expressive: utilities.SchemeExpressive,
    fidelity: utilities.SchemeFidelity,
    content: utilities.SchemeContent,
    neutral: utilities.SchemeNeutral,
    monochrome: utilities.SchemeMonochrome,
  };
  const Scheme = schemes[options.variant ?? "tonal-spot"];
  const scheme = new Scheme(
    utilities.Hct.fromInt(utilities.argbFromHex(options.seed)),
    options.dark ?? false,
    options.contrast ?? 0,
    options.specVersion ?? "2025",
  );
  const vars: SchemeVars = {};
  for (const [role, getter] of Object.entries(roles)) {
    vars[`--md-sys-color-${role}`] = utilities.hexFromArgb(scheme[getter] as number);
  }
  return vars;
}

/** The scheme's colors as `--md-sys-color-*` custom properties (hex values). */
export async function createScheme(options: SchemeOptions): Promise<SchemeVars> {
  return buildScheme(await loadUtilities(), options);
}

/**
 * Sets the scheme on an element (for example `document.documentElement`, or a `[data-m3]`
 * wrapper to theme one region). Resolves to a function that removes the properties again.
 *
 * Takes either options, or vars that are already computed (for example `light` / `dark` from
 * `virtual:m3-scheme`). Vars apply without loading color-utilities.
 */
export async function applyScheme(
  element: HTMLElement,
  scheme: SchemeOptions | SchemeVars,
): Promise<() => void> {
  const vars = isOptions(scheme) ? await createScheme(scheme) : scheme;
  for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, value);
  return () => {
    for (const name of Object.keys(vars)) element.style.removeProperty(name);
  };
}

function isOptions(scheme: SchemeOptions | SchemeVars): scheme is SchemeOptions {
  return typeof scheme.seed === "string";
}

/** A stylesheet with the light vars on `selectors.light` and the dark vars on `selectors.dark`. */
export function schemeCssFrom(
  light: SchemeVars,
  dark: SchemeVars,
  selectors: SchemeSelectors = { light: ":root", dark: ".dark" },
): string {
  const block = (selector: string, vars: SchemeVars) => {
    const lines = Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`);
    return `${selector} {\n${lines.join("\n")}\n}`;
  };
  return `${block(selectors.light, light)}\n\n${block(selectors.dark, dark)}\n`;
}

/** A stylesheet with the light scheme on `:root` and the dark scheme on `.dark`. */
export async function schemeCss(
  options: Omit<SchemeOptions, "dark">,
  selectors?: SchemeSelectors,
): Promise<string> {
  const utilities = await loadUtilities();
  return schemeCssFrom(
    buildScheme(utilities, { ...options, dark: false }),
    buildScheme(utilities, { ...options, dark: true }),
    selectors,
  );
}

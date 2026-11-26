import { DocsPage } from "~/components/preview";
import { ColorSchemeDemo } from "~/demos/m3/color-scheme";
import source from "~/demos/m3/color-scheme.tsx?raw";

const snippet = `import { applyScheme, createScheme, schemeCss } from "@solidx/kit/m3";

// Apply to the page (or any [data-m3] element). Resolves to a cleanup function.
const remove = await applyScheme(document.documentElement, { seed: "#006A6A", dark: false });

// Or print a stylesheet to paste over the baseline values in theme.css.
console.log(await schemeCss({ seed: "#006A6A", variant: "vibrant" }));

// Or generate the default tokens at build time. vite.config.ts:
//   import { m3Scheme } from "@solidx/kit/vite";
//   plugins: [m3Scheme({ seed: "#006A6A", variant: "vibrant" }), tailwindcss(), …]
// Then import "virtual:m3-scheme.css" from the entry (or set outFile and @import it from CSS).
// The vars are also importable, and apply without loading color-utilities:
import { dark } from "virtual:m3-scheme";
await applyScheme(document.documentElement, dark);`;

export default function ColorSchemePage() {
  return (
    <DocsPage
      title="Color scheme"
      description="Generate a light or dark scheme from a seed color at runtime."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/color-scheme.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <ColorSchemeDemo />
    </DocsPage>
  );
}

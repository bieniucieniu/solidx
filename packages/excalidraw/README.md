# @solidx/excalidraw

The [Excalidraw](https://github.com/excalidraw/excalidraw) editor for Solid 2.0, headless: `<Excalidraw>` renders the canvas and handles drawing, selection, text editing, keyboard shortcuts, clipboard, and history. Your UI goes on top, built from the hooks.

Like the tiptap bindings, it brings only the engine: no UI components, no icons, no fonts, and English only. You bring the rest (see [Bring your own](#bring-your-own)).

```tsx
import { Excalidraw, useProperty, useTool } from "@solidx/excalidraw";
import "@solidx/excalidraw/style.css";
import { For } from "solid-js";
import { TOOL_ICONS } from "./icons"; // your icons
import { fonts } from "./fonts"; // your font files (see below)

const tools = ["selection", "rectangle", "ellipse", "arrow", "text"] as const;

function Toolbar() {
  const tool = useTool();
  const stroke = useProperty("strokeColor");
  return (
    <div class="toolbar">
      <For each={tools}>
        {(type) => {
          const Icon = TOOL_ICONS[type]!;
          return (
            <button
              aria-pressed={tool.isActive(type) ? "true" : "false"}
              onClick={() => tool.set(type)}
            >
              <Icon />
            </button>
          );
        }}
      </For>
      <button onClick={() => stroke.set("#1971c2")}>Blue stroke</button>
    </div>
  );
}

<div style={{ height: "600px" }}>
  <Excalidraw fonts={fonts} onChange={(elements, appState) => save(elements)}>
    <Toolbar />
  </Excalidraw>
</div>;
```

`<Excalidraw>` takes upstream's `ExcalidrawProps` (`initialData`, `onChange`, `theme`, `viewModeEnabled`, `onExcalidrawAPI`, …). Children render in `.excalidraw__ui`, a layer over the canvas that lets pointer events through; give interactive panels `pointer-events: auto`.

## Hooks

| Hook                                                  | Gives                                                                                   |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `useExcalidraw()`                                     | `{ app, api, appState, elements, selectedElements, render, shapeActions, … }`           |
| `useExcalidrawAPI()`                                  | upstream's `ExcalidrawImperativeAPI`                                                    |
| `useAppState(select)`                                 | a memo over the app state                                                               |
| `useElements()`, `useSelectedElements()`              | the scene elements and the selection                                                    |
| `useTool()`                                           | `active`, `isActive(type)`, `set(type)`, `locked`, `toggleLock()`                       |
| `useAction(name)`                                     | any registered action: `label`, `shortcut`, `enabled`, `checked`, `perform(value?)`     |
| `useProperty(name)`                                   | a styling property (`strokeColor`, `fontSize`, …): `value`, `set`, `enabled`, `applies` |
| `useShapeActions()`                                   | which properties and selection actions apply now, as upstream's panel decides           |
| `useShowShapeActions()`                               | whether upstream would show the properties panel at all                                 |
| `useHistory()`                                        | `canUndo`, `canRedo`, `undo`, `redo`                                                    |
| `useContextMenu()`                                    | the right-click menu: `open`, `position`, `entries`, `close`                            |
| `useExport()`                                         | `toPng`, `toSvg`, `download`                                                            |
| `useI18n()`, `useCursorHint()`, `useEditorAtom(atom)` | language, the cursor hint, editor atoms                                                 |

## Bring your own

### Fonts

The package bundles no font files. Pass them per family with the `fonts` prop (or `registerFonts` from `@solidx/excalidraw/core`, e.g. before a headless export). A family without files renders with its CSS fallbacks. The editor needs file URLs rather than CSS, because SVG export fetches and embeds the files.

```ts
import type { ExcalidrawFonts } from "@solidx/excalidraw/core";
import ranges from "@fontsource/nunito/unicode.json";
import nunitoLatin from "@fontsource/nunito/files/nunito-latin-500-normal.woff2?url";
import excalifont from "./fonts/Excalifont-Regular.woff2?url";

export const fonts: ExcalidrawFonts = {
  Excalifont: [{ url: excalifont }],
  Nunito: [{ url: nunitoLatin, unicodeRange: ranges.latin, weight: "500" }],
};
```

The families are `Excalifont` (the default), `Nunito`, `Lilita One`, `Cascadia`, `Comic Shanns`, `Virgil`, `Liberation Sans`, and the fallbacks `Xiaolai` (CJK) and `Segoe UI Emoji`. Fontsource has Nunito, Lilita One and Cascadia Code. The others are in [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw/tree/master/packages/excalidraw/fonts) (OFL / MIT); the docs app's set is in `apps/web/src/demos/excalidraw/fonts`.

### Languages

Only English is bundled. Pass others with `locales` and pick one with `langCode`; the JSON files are upstream's [`locales/*.json`](https://github.com/excalidraw/excalidraw/tree/master/packages/excalidraw/locales).

```tsx
<Excalidraw langCode="de-DE" locales={{ "de-DE": () => import("./locales/de-DE.json") }} />
```

### Export font subsetting

SVG export embeds the fonts its text uses. Upstream subsets them to the used glyphs with bundled harfbuzz and woff2 wasm; this package doesn't bundle those, so the whole font files are embedded unless you set a subsetter:

```ts
import { setFontSubsetter } from "@solidx/excalidraw/core";

// (woff2: ArrayBuffer, codePoints: number[]) => Promise<ArrayBuffer>, e.g. with harfbuzzjs
setFontSubsetter(mySubsetter);
```

### Icons and components

None are bundled. Build the UI from the hooks with your own components and icons, as the docs demos do with `@solidx/kit` and a few inline SVGs.

## Entry points

- `@solidx/excalidraw` — the component and hooks.
- `@solidx/excalidraw/core` — the framework-free editor (`createEditor`, `App`, actions, export and data helpers). It has no Solid dependency.
- `@solidx/excalidraw/style.css` — the structural styles the canvas layers and text editor need.

## TypeScript

The engine packages' declarations import `@excalidraw/excalidraw/*`. Map it to this package's core in the consuming app's `tsconfig.json`:

```json
"paths": { "@excalidraw/excalidraw/*": ["../../packages/excalidraw/src/core/*"] }
```

## How it is built

`src/core` is upstream's `packages/excalidraw` without React. See [UPSTREAM.md](UPSTREAM.md) for the pinned commit, every change, and how to sync. Upstream's MIT license is in [LICENSE](LICENSE).

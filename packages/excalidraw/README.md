# @solidx/excalidraw

The [Excalidraw](https://github.com/excalidraw/excalidraw) editor for Solid 2.0, headless: `<Excalidraw>` renders the canvas and handles drawing, selection, text editing, keyboard shortcuts, clipboard, and history. Your UI goes on top, built from the hooks.

```tsx
import { Excalidraw, useProperty, useTool } from "@solidx/excalidraw";
import { TOOL_ICONS } from "@solidx/excalidraw/icons";
import "@solidx/excalidraw/style.css";
import { For } from "solid-js";

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
  <Excalidraw onChange={(elements, appState) => save(elements)}>
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

## Entry points

- `@solidx/excalidraw` — the component and hooks.
- `@solidx/excalidraw/core` — the framework-free editor (`createEditor`, `App`, actions, export and data helpers). It has no Solid dependency.
- `@solidx/excalidraw/icons` — upstream's icons as Solid components, and `TOOL_ICONS`.
- `@solidx/excalidraw/style.css` — the structural styles the canvas layers and text editor need.

## TypeScript

The engine packages' declarations import `@excalidraw/excalidraw/*`. Map it to this package's core in the consuming app's `tsconfig.json`:

```json
"paths": { "@excalidraw/excalidraw/*": ["../../packages/excalidraw/src/core/*"] }
```

## How it is built

`src/core` is upstream's `packages/excalidraw` without React. See [UPSTREAM.md](UPSTREAM.md) for the pinned commit, every change, and how to sync. Upstream's MIT license is in [LICENSE](LICENSE).

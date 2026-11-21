# @solidx/kit — Solid 2.0

The main package. It rewrites the Solid 1.9 code in `packages/1.9` (`@solidx/kit-1.9`, same layout) for Solid 2.0, one subpath each:

| Subpath                                              | Source                                     | 1.9 original                         |
| ---------------------------------------------------- | ------------------------------------------ | ------------------------------------ |
| `@solidx/kit/ui`, `/ui/theme.css`                    | `src/components/ui/`                       | `packages/1.9/src/components/ui`     |
| `@solidx/kit/m3`, `/m3/theme.css`, `/m3/tokens.css`  | `src/components/m3/`, `src/lib/m3/`        | `packages/1.9/src/components/m3`     |
| `@solidx/kit/motion`                                 | `src/components/motion/`, `src/lib/motion` | `packages/1.9/src/components/motion` |
| `@solidx/kit/xyflow`, `/xyflow/panels`, `/style.css` | `src/components/xyflow/`, `src/lib/xyflow` | `packages/1.9/src/components/xyflow` |
| `@solidx/kit/tiptap`, `/tiptap/menus`, `/node-view`  | `src/components/tiptap/`, `src/lib/tiptap` | `packages/1.9/src/components/tiptap` |

Keep each subpath's public names and props the same as its 1.9 barrel unless ui-sdk forces a change.

Run tooling through devenv: `devenv shell -- vp check packages/kit`, `devenv shell -- vp test` (browser tests, Playwright chromium), and `devenv shell -- pnpm --filter @solidx/kit typecheck`.

## Stack

- `solid-js` and `@solidjs/web` `^2.0.3`. `jsxImportSource` is `@solidjs/web`. The Vite plugin is `@solidjs/vite-plugin`.
- `ui` and `m3` are built on [`@ui-sdk/solid`](https://github.com/vercel-labs/ui) and `@ui-sdk/core`, pinned to one beta. Never import Kobalte or corvu. The docs ship in `node_modules/@ui-sdk/solid/docs/` (`components/<name>.md`, `styling-and-animation.md`, `popups.md`). Read the component's doc before wrapping it.
- Internal imports use `#kit/…` (`package.json` `imports`). Shared `cn` and `partClass` live in `src/lib/utils.ts`.

## Wrapping a ui-sdk part

```tsx
import { DialogContent as DialogContentPrimitive } from "@ui-sdk/solid/dialog";
import { type ComponentProps } from "solid-js";
import { partClass } from "#kit/lib/utils";

export function DialogContent(props: ComponentProps<typeof DialogContentPrimitive>) {
  return <DialogContentPrimitive {...props} class={partClass("…tailwind…", props.class)} />;
}
```

- Spread `{...props}` first and put the attributes you set again (`class`, `style`, handlers, JSX children) after it; later attributes win. Defaults a caller may override (`type="button"`, `role`) go before the spread.
- `omit` only the keys the wrapper consumes and must not reach the element (`variant`, `size`). Every `omit` / `merge` builds a props view, so do not add one for a key you set again anyway.
- Never write `ref={props.ref}`: the spread already applies the caller's ref, and an explicit one runs it a second time.

- ui-sdk sets `data-slot` on every part. Do not set it on a wrapped part. Set it on plain elements (`data-slot="dialog-header"`).
- A part's `class`, `style`, and `children` may be functions of its state. `partClass(base, props.class)` merges both forms.
- Change the element with `render={(props, state) => <a {...props} />}`. There is no `as` or `asChild`.
- Style state with the ui-sdk attributes: `data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-indeterminate`, `data-highlighted`, `data-selected`, `data-pressed`, `data-disabled`, `data-invalid`, `data-orientation`, `data-side`, `data-align`. There is no `data-state` or `data-expanded`.
- Animate popups with transitions on `data-starting-style` and `data-ending-style` (`transition-[opacity,scale] data-starting-style:opacity-0 data-ending-style:opacity-0`). ui-sdk waits for them before it unmounts. Size and origin with `--anchor-width`, `--available-height`, `--transform-origin`; panels with `--accordion-panel-height` and `--collapsible-panel-height`.
- Roots take `open`/`defaultOpen`/`onOpenChange(open, details)` or `value`/`defaultValue`/`onValueChange(value, details)`.
- The page must declare `@layer ui-sdk;` before `@import "tailwindcss"`, or ui-sdk's base CSS lands above the utilities.

## Solid 2.0 rules

The Solid 2.0 rules are the repo default and live in the root [AGENTS.md](../../AGENTS.md#package-development-solid-20-default).

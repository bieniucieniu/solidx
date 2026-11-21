# solidx

> **Work in progress.** APIs change without notice and nothing is published to npm yet.

SolidJS ports of popular React libraries, plus shadcn-style component registries, in one pnpm workspace. Libraries live in `packages/`, apps in `apps/`. The workspace root is private and exports nothing.

`packages/kit` (`@solidx/kit`) is the main package: a Solid 2.0 rewrite of the 1.9 code, with `ui` and `m3` on [ui-sdk](https://github.com/vercel-labs/ui). `packages/1.9` (`@solidx/kit-1.9`) is the frozen Solid 1.9 code in the same layout; it feeds Storybook and the shadcn registry. Both expose one subpath per area: `./ui`, `./m3`, `./motion`, `./xyflow`, `./tiptap`.

## Packages

| Package           | Path           | What it is                                                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `@solidx/kit`     | `packages/kit` | Solid 2.0: ui and m3 on `@ui-sdk/solid`, plus motion, xyflow, and tiptap                                      |
| `@solidx/kit-1.9` | `packages/1.9` | Solid 1.9, frozen: the ui and m3 shadcn registries, motion, xyflow, tiptap ([README](packages/1.9/README.md)) |

Per area: `tiptap` follows the public API of `@tiptap/react`; `xyflow` is a node graph editor on `@xyflow/system` with the graph in a Solid store; `motion` is Solid lifecycle around the vanilla `motion` API with props that match Motion for React; `m3` is Material 3 Expressive on the same API as `ui`.

## Apps

| App              | Path                  | What it is                                                                          |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| `web`            | `apps/web`            | Docs and demo site for `@solidx/kit` (Solid 2.0 start mode, m3 chrome, prerendered) |
| `kit-playground` | `apps/kit-playground` | Client-only Solid 2.0 playground for `@solidx/kit`                                  |
| `storybook`      | `apps/storybook`      | Storybook for `@solidx/kit-1.9` (Solid 1.9)                                         |

## Development

pnpm workspace with [Vite+](https://viteplus.dev/guide/) as the toolchain. [devenv](https://devenv.sh) provides Node.js and pnpm.

## License

[MIT](LICENSE)

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

## shadcn registry

The 1.9 `ui` and `m3` components install into a Solid app with the shadcn CLI, as `bieniucieniu/solidx/<item>` (for example `pnpm dlx shadcn@latest add bieniucieniu/solidx/button`). Setup and the item list are in the [1.9 README](packages/1.9/README.md). `pnpm registry:build` regenerates `public/r/*.json` from `registry.json`.

## Development

pnpm workspace with [Vite+](https://viteplus.dev/guide/) (`vp`) as the toolchain and TypeScript 7. [devenv](https://devenv.sh) provides Node.js and pnpm, so run every command inside it:

```bash
devenv shell -- pnpm install
```

```bash
devenv shell -- vp check
```

```bash
devenv shell -- pnpm --filter web dev
```

- `vp check` formats, lints, and type-checks the whole workspace.
- `vp test run` in `packages/kit` or `packages/1.9` runs the browser tests in Playwright Chromium. After Playwright updates, install its browser once with `devenv shell -- pnpm exec playwright install chromium`.
- Dev servers: `web` (port 3000), `kit-playground` (3100), and `storybook` (6006), each with `pnpm --filter <name> dev`.
- `pnpm --filter web build` prerenders the site to `apps/web/dist/client`; `node apps/web/dist/server/node.js` serves it.

## Deployment

[`.github/workflows/web.yml`](.github/workflows/web.yml) builds [`docker/web/Dockerfile`](docker/web/Dockerfile) for amd64 and arm64 and pushes `ghcr.io/bieniucieniu/solidx/web`, tagged `latest` on `main`. The image runs the bundled Node server on port 8080 and needs no `node_modules`. Flux in [`bieniucieniu/infra`](https://github.com/bieniucieniu/infra) deploys it to the `rpi` cluster and picks up new `latest` digests on its own.

CI only builds the image; run `vp check` and the tests before you push.

## License

[MIT](LICENSE)

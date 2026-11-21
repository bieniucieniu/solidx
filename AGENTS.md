# Project Basics

- Act only on request; minimize unnecessary builds/checks.
- No arbitrary fix scripts; never downgrade package versions.
- If in doubt, ask for clarification.

# Git

Every commit uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). A branch an agent creates uses [Conventional Branch](https://conventionalbranch.org/).

## Commits

`<type>[optional scope][!]: <description>`

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Scope is the package or area (`ui`, `web`, `tiptap`)
- Description is imperative, lowercase, and has no trailing period
- A breaking change adds `!` after the type or scope and a `BREAKING CHANGE:` footer
- One subject line. Add a body only when the why is not obvious

```
feat(ui): add a shiki code block
fix(toast): slide siblings when the stack reflows
```

## Branches

`<type>/<description>`

The agent that creates the branch is the type:

| Agent           | Type     |
| --------------- | -------- |
| Cursor          | `cursor` |
| Claude          | `claude` |
| Any other agent | `ai`     |

Description is lowercase `a-z`, digits, and hyphens. Dots are for versions. No underscores, spaces, doubled hyphens, or a hyphen at either end.

```
cursor/shiki-code-block
claude/toast-reflow
ai/drawer-bottom-sheet
```

`main`, `master`, and `develop` stay as they are. Create a branch only when the user asks. A commit on the current branch still uses Conventional Commits.

# Repository layout

pnpm workspace. Root `solidx` is private and exports nothing. Do not re-export a package from the root. Apps live in `apps/` and are never published; libraries live in `packages/`.

Packages, both with the same layout (`src/components/<area>`, `src/lib/<area>`, one subpath per area: `./ui`, `./m3`, `./motion`, `./xyflow`, `./tiptap`):

- `packages/kit` (`@solidx/kit`) is the main package: the Solid 2.0 rewrite. Its ui-sdk and subpath rules are in [packages/kit/AGENTS.md](packages/kit/AGENTS.md).
- `packages/1.9` (`@solidx/kit-1.9`) is the Solid 1.9 code, frozen. It feeds `apps/storybook` and the shadcn registry ([packages/1.9/README.md](packages/1.9/README.md)).

Apps (`.claude/launch.json` starts each by its package name):

- `apps/web` (`web`) is the docs site, on Solid 2.0 and `@solidx/kit`.
- `apps/kit-playground` (`kit-playground`) is a client-only Solid 2.0 app that renders the kit.
- `apps/storybook` (`storybook`) is Storybook 10 for `@solidx/kit-1.9`.

Tooling: Vite+ (`vp`), TypeScript 7 (the `typecheck` scripts run its native `tsc`), and Playwright Chromium for the browser tests. Run everything through `devenv shell --`. After a Playwright update, install its browser with `devenv shell -- pnpm exec playwright install chromium`, or the test run finds the files but runs no tests. CI (`.github/workflows/web.yml`) only builds the web Docker image, `ghcr.io/bieniucieniu/solidx/web`, which `bieniucieniu/infra` deploys with Flux; lint, types, and tests are checked locally.

# Package Development: Solid 2.0 (default)

Solid 2.0 is the default everywhere except `packages/1.9/**` and `apps/storybook`, which follow the 1.9 section below. `solid-js` and `@solidjs/web` are `^2.0.3`. `jsxImportSource` is `@solidjs/web`. Guides: [v2.solidjs.com](https://v2.solidjs.com), [migration](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/MIGRATION.md).

A component function runs once. Updates come from signals read in JSX, `createMemo`, or an effect's compute function. There is no re-render and no dependency array. Never import `react`, `react-dom`, or `react/jsx-runtime`, and never write React hooks, `className`, `htmlFor`, `key=`, camelCase `style` keys, or unitless style numbers.

| Do not write (1.9 or React)                   | Write (2.0)                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| `useState` / `useMemo` / `useRef`             | `createSignal` / inline reads or `createMemo` / `let el` + `ref={el}`         |
| `splitProps(props, [...])`                    | `<X {...props} class={…} />`; `omit` only keys that must not reach the DOM    |
| `mergeProps(a, b)`                            | `merge(a, b)` (`undefined` overrides)                                         |
| `createEffect(() => { … onCleanup(…) })`      | `createEffect(() => read(), (value) => { …; return cleanup })`                |
| `on(deps, fn)`                                | read the deps in the compute function; `{ defer: true }` to skip the first    |
| `onMount`                                     | `onSettled(() => { …; return cleanup })`                                      |
| `<Ctx.Provider value={v}>`                    | `<Ctx value={v}>`; an optional context needs a `null` default                 |
| `classList={{ a: on() }}`                     | `class={{ a: on() }}` or `class={["base", { a: on() }]}`                      |
| `<Index each>`                                | `<For each keyed={false}>` (item is an accessor, index a number)              |
| `<Dynamic component={c}>`                     | `const C = dynamic(() => c)` from `@solidjs/web`, then `<C />`                |
| `solid-js/web`, `solid-js/store`              | `@solidjs/web`; stores from `solid-js`                                        |
| store path setters, `produce`, `unwrap`       | draft setters `setState((d) => { d.a = 1 })`, `snapshot`                      |
| `Suspense`, `ErrorBoundary`, `createResource` | `Loading`, `Errored`, async `createMemo`                                      |
| `batch`, `createMutable`                      | nothing; writes batch on the microtask. `flush()` in tests                    |
| `use:`, `on:`, `attr:`, `bool:`, `/*@once*/`  | ref callbacks or factories, camelCase `onX`, plain attributes                 |
| `tabIndex`, `aria-pressed={on()}`             | `tabindex`, ARIA values as strings (`aria-pressed={on() ? "true" : "false"}`) |

- Never destructure `props`. Read `props.x` inside JSX, a memo, or an effect's compute function. Reads at the top of a component body warn (`STRICT_READ_UNTRACKED`).
- Do not write signals inside a memo or a component body. Writes go in event handlers, actions, or an effect's apply function. Writes apply on the next microtask; do not call `flush()` inside `onSettled`.
- A ref callback cannot create effects or call `onCleanup`. Do that work in the component body and keep the element in a variable.
- `JSX`, `ComponentProps`, `Portal`, `dynamic`, `isServer`, `render`, `clientOnly`, `HydrationScript`, `httpStatus` come from `@solidjs/web`. `Show`, `For`, `Switch`, `Match`, `Loading`, `createSignal`, `createMemo`, `createEffect`, `createStore`, `omit`, `merge` come from `solid-js`.
- Components come from `@solidx/kit/<subpath>`. Never import `@solidx/kit-1.9` into 2.0 code.

## `apps/web`

- Solid 2 start mode: `@solidjs/vite-plugin` with `start` + `ssr`, `src/Document.tsx` (the HTML shell) and `src/App.tsx` (the router). There is no `@solidjs/start` or `entry-*.tsx`.
- File routes under `src/routes` (`filesystem-routing`); `file-routes.d.ts` is generated by the build and committed. The formatter skips it (root `vite.config.ts`), so do not hand-format it. A route exports `route = { preload } satisfies RouteDefinition` for data and `httpStatus`.
- `@solidjs/router` 2: links are plain `<a href>`; there is no `<A>`. The router sets `data-active` on every link the path is under and `aria-current="page"` on the exact one. Use `useLinkState(href, { end })` for active state in JS.
- `prerender-crawler` writes every page reachable from `/` to static HTML in `dist/client`. `dist/server/node.js` serves those and renders the rest; it bundles its dependencies (`ssr.noExternal`), so it runs without `node_modules`.
- Browser-only code (tiptap, xyflow, motion demos) goes through `clientOnly(() => import(...))`.
- The chrome is m3 (`AppBar`, `NavigationDrawer`, `Tabs`, `CodeBlock`). The `/m3`, `/motion`, `/xyflow`, and `/tiptap` sections wrap their pages in `data-m3` so `--primary` and friends switch to the M3 scheme. Demos outside `/ui` use m3 components; add a missing one to `packages/kit/src/components/m3/`, based on its `ui` counterpart.

# Package Development: Solid 1.9 (`packages/1.9/**`, `apps/storybook`)

Peer dependency is `solid-js` `^1.9.0`. `jsxImportSource` is `solid-js`. Write Solid 1.9 only in these folders; everything else is 2.0 (above). Storybook 10 and its Solid adapter are 1.9-only, so Storybook stays on this package. Import it by subpath, `@solidx/kit-1.9/<area>`. Inside the package, ui and m3 import `@/lib/…` (the alias the shadcn registry ships); motion, xyflow, and tiptap import `#/…`. Do not rewrite either.

Match the public behavior of [Tiptap React](https://github.com/ueberdosis/tiptap/tree/main/packages/react). Implement it with the patterns already in `packages/1.9/src/components/tiptap` and `src/lib/tiptap`. Copying React component bodies, hooks, or JSX is a bug.

A component function runs once. Updates come from signals read in JSX, `createMemo`, or `createEffect`. There is no re-render and no dependency array.

## Banned

Never import `react`, `react-dom`, or `react/jsx-runtime`.

Never write these. They compile, then do nothing, or they are the wrong framework:

- `useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer`, `useContext` from React, `forwardRef`, `memo(`, `React.FC`, `.current`
- a dependency array on `createEffect` (the second argument is the previous value, not deps)
- a cleanup function returned from `createEffect` (1.9 cleanup is `onCleanup`)
- `className`, `htmlFor`, camelCase `style` keys, unitless style numbers (`fontSize: 12`)
- `key=` on list children, `{items.map(...)}` for a list that changes, `{cond && <Node />}` when `cond` can be `0`
- destructuring `props`
- `createSignal(props.value)` to mirror a prop
- `createMutable` (gone in 2.0; this repo uses `createSignal` / `createStore`)
- Solid 2.0-only APIs listed below

| React habit                     | Solid 1.9 in this repo                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `useState`                      | `createSignal`; read it with `count()`                                                                 |
| `useEffect(fn, deps)`           | `createEffect(fn)`; it tracks reads. Cleanup: `onCleanup`                                              |
| `useMemo` / `useCallback`       | read it inline. `createMemo` only for a new object/array, or a call to a function that came from props |
| `useRef` / `.current`           | `let ref: HTMLElement \| undefined` and `ref={(el) => { ref = el }}`                                   |
| `useContext`                    | `useContext` from `solid-js`                                                                           |
| destructure `props`             | `props.x`, or `splitProps`                                                                             |
| `className`                     | `class`                                                                                                |
| `className={on ? "a" : "b"}`    | `classList={{ a: on() }}`                                                                              |
| `style={{ fontSize: 12 }}`      | `style={{ "font-size": "12px" }}`                                                                      |
| `onChange` on a text field      | `onInput` (`onChange` is the DOM change event)                                                         |
| `<div onClick={props.onClick}>` | `<div onClick={(e) => props.onClick?.(e)}>` — native `on*` is not a tracked scope                      |
| `{list.map}`                    | `<For each={list()}>`                                                                                  |
| index-stable list               | `<Index each={list()}>`                                                                                |
| `{cond && <A />}`               | `<Show when={cond()}>`                                                                                 |
| `React.memo`                    | nothing                                                                                                |

## Solid 1.9

- Props are a reactive proxy. Never destructure them. `splitProps` when you need the rest. If you only read the pulled keys off `props`, drop the local: `const [, rest] = splitProps(...)`.
- The only allowed tuple destructure is `const [value, setValue] = createSignal(...)`. Do not destructure hook return objects.
- Read props and signals inside JSX, `createMemo`, or `createEffect`. `const x = props.foo` at the top of the function freezes the first value.
- JSX `editor={editor()}` compiles to a getter and stays reactive. `editor={editor}` passes the function.
- Hook arguments that must stay reactive: pass an accessor, `useEditor(() => options)`.
- `createSignal` for primitives. `createStore` from `solid-js/store` for nested objects.
- `createMemo` only for a new object/array, or when calling a function that came from props. Skip it for `a + b`, `a.b`, and raw functions.
- `onMount` is one-shot after mount. Re-running work goes in `createEffect`. Use `on(deps, fn)` from `solid-js` when tracking must be narrowed (`useEditor.ts`).
- Refs: `let ref: HTMLElement | undefined`, assign with `ref={(el) => { ref = el }}` or `ref={ref}`. The callback receives the element, not `null`.
- Control flow: `<Show when={state()}>{(v) => ...}</Show>`. `<For>` and `<Index>` from `solid-js`. `<Dynamic>` from `solid-js/web`. `<Switch>` / `<Match>` for several branches.
- To inspect children in JS, use the `children()` helper. In JSX, `props.children` is enough.

### Preferred `splitProps` pattern

```tsx
export function NodeViewWrapper(props: NodeViewWrapperProps) {
  const [, rest] = splitProps(props, ["as", "style", "ref"]);
  const nv = useSolidNodeView();
  return (
    <Dynamic
      component={props.as || "div"}
      {...rest}
      ref={props.ref}
      onDragStart={nv.onDragStart}
      style={{ "white-space": "normal", ...(typeof props.style === "object" ? props.style : {}) }}
    />
  );
}
```

## Solid 2.0 APIs stay out of the 1.9 folders

These folders typecheck as 1.9. In `packages/1.9/**` and `apps/storybook`:

| If you reach for this (2.0)                                           | Stay on this (1.9)                                                          |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `omit` / `merge`                                                      | `splitProps` / `mergeProps`                                                 |
| `onSettled`                                                           | `onMount` + `onCleanup`                                                     |
| `createEffect(compute, apply)` and return-as-cleanup                  | one-function `createEffect` + `onCleanup`                                   |
| `Loading` / `Errored` / `Reveal` / `isPending` / `flush`              | `Suspense` / `ErrorBoundary`; no `flush`                                    |
| async `createMemo`, no `createResource`                               | `createResource` when a fetch helper is actually needed                     |
| object or array `class`                                               | `class` string + `classList`                                                |
| `@solidjs/web`, `@solidjs/signals`, `jsxImportSource: "@solidjs/web"` | `solid-js`, `solid-js/web`, `solid-js/store`, `jsxImportSource: "solid-js"` |
| context used as the provider element                                  | `Context.Provider`                                                          |

`createMutable`, `produce`, and `batch` still exist in 1.9 and are removed in 2.0. Do not add them. Use `createSignal` and `createStore`.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

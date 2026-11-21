# `@solidx/kit-1.9`

The Solid 1.9 code, frozen. Same layout as [`@solidx/kit`](../kit) (the Solid 2.0 rewrite): one package, one subpath per area.

| Subpath                                                         | Source                                      |                                       |
| --------------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| `@solidx/kit-1.9/ui`, `/ui/theme.css`                           | `src/components/ui/`, `src/lib/`            | shadcn registry on Kobalte and corvu  |
| `@solidx/kit-1.9/m3`, `/m3/theme.css`, `/m3/tokens.css`         | `src/components/m3/`, `src/lib/m3/`         | Material 3 Expressive registry        |
| `@solidx/kit-1.9/motion`                                        | `src/components/motion/`, `src/lib/motion/` | Motion for Solid                      |
| `@solidx/kit-1.9/xyflow`, `/xyflow/panels`, `/xyflow/style.css` | `src/components/xyflow/`, `src/lib/xyflow/` | node graph editor on `@xyflow/system` |
| `@solidx/kit-1.9/tiptap`, `/tiptap/menus`, `/tiptap/node-view`  | `src/components/tiptap/`, `src/lib/tiptap/` | Tiptap bindings                       |

ui and m3 import `@/lib/…`: the shadcn CLI rewrites that alias when it installs an item, so a consumer of the package source (Storybook) needs an `@` alias to `src`. motion, xyflow, and tiptap import `#/…` through `package.json` `imports`. Registry items for ui and m3 are in the root [`registry.json`](../../registry.json); motion, xyflow, and tiptap are in [`registry.json`](registry.json) here.

## ui

SolidJS components for the [shadcn CLI](https://ui.shadcn.com/docs/registry). Tailwind CSS 4. One style per component. Theme comes from CSS variables on `:root` and `.dark`.

Install into an app. Do not import this package as a component library. The CLI copies the source and rewrites `@/lib/utils`.

### Install

From a project that already has `components.json` (see below):

```bash
pnpm dlx shadcn@latest add bieniucieniu/solidx/theme
pnpm dlx shadcn@latest add bieniucieniu/solidx/button
pnpm dlx shadcn@latest add bieniucieniu/solidx/dialog
pnpm dlx shadcn@latest add bieniucieniu/solidx/tooltip
pnpm dlx shadcn@latest add bieniucieniu/solidx/checkbox
```

`utils` (`cn`) installs with the components. Add `theme` once. Later component installs do not write color tokens again.

`shadcn` has no Solid `init` template. Do not run `shadcn init` in a Solid app. Hand-write `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

`src/index.css` must start with `@import "tailwindcss";`. Set `tailwind.css` to that file. `shadcn add bieniucieniu/solidx/theme` merges the variables and the `.dark` variant into it.

### Theming

Edit CSS variables only. Controls use `h-7`, `rounded-md`, and `text-xs/relaxed`. Surfaces use `rounded-lg` or `rounded-xl`, `bg-popover` / `bg-card`, and `ring-foreground/10`. Colors come from `bg-background`, `text-foreground`, `border-input`, `bg-primary`, and `text-primary-foreground`.

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

Put `.dark` on an ancestor. Components follow shadcn's Mira style. `button`, `badge`, `toggle`, `alert`, `item` and a few others take shadcn's `variant` / `size` props; `buttonVariants`, `badgeVariants` and `toggleVariants` return the same class strings for other elements.

### Animations

`theme` installs [`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css) and imports it next to `tailwindcss`. Overlays use Kobalte's (and corvu's) state attributes: `data-expanded:animate-in` on open and `data-closed:animate-out` on close (`data-open` for corvu). Kobalte keeps the element mounted until the exit animation ends. It only waits when the `animation-name` changes between open and closed, so keep separate enter and exit animations. Accordion and collapsible animate `height` through `--kb-accordion-content-height` / `--kb-collapsible-content-height`. Popper content scales from `--kb-*-content-transform-origin`.

The same tokens live in [`src/components/ui/theme.css`](src/components/ui/theme.css).

### Primitives

`dialog` uses `@corvu/dialog`. `tooltip` uses `@corvu/tooltip`. `calendar`, `input-otp`, and `resizable` use corvu's `@corvu/calendar`, `@corvu/otp-field`, and `@corvu/resizable`, because Kobalte has no primitive for them. `checkbox` uses `@kobalte/core/checkbox`. New components use `@kobalte/core`. Markup components are styled HTML.

The registry item name matches the filename. The full list is in the root [`registry.json`](../../registry.json).

| Item              | Primitive                     |
| ----------------- | ----------------------------- |
| `button`          | `<button>`                    |
| `dialog`          | `@corvu/dialog`               |
| `tooltip`         | `@corvu/tooltip`              |
| `checkbox`        | `@kobalte/core/checkbox`      |
| `accordion`       | `@corvu/accordion`            |
| `alert`           | `@kobalte/core/alert`         |
| `alert-dialog`    | `@corvu/dialog`               |
| `aspect-ratio`    | styled HTML                   |
| `avatar`          | `@kobalte/core/image`         |
| `badge`           | styled HTML                   |
| `breadcrumb`      | `@kobalte/core/breadcrumbs`   |
| `button-group`    | styled HTML                   |
| `calendar`        | `@corvu/calendar`             |
| `card`            | styled HTML                   |
| `collapsible`     | `@corvu/disclosure`           |
| `combobox`        | `@kobalte/core/combobox`      |
| `context-menu`    | `@kobalte/core/context-menu`  |
| `drawer`          | `@corvu/drawer`               |
| `dropdown-menu`   | `@kobalte/core/dropdown-menu` |
| `empty`           | styled HTML                   |
| `field`           | styled HTML                   |
| `hover-card`      | `@kobalte/core/hover-card`    |
| `input`           | `@kobalte/core/text-field`    |
| `input-group`     | styled HTML                   |
| `input-otp`       | `@corvu/otp-field`            |
| `item`            | styled HTML                   |
| `kbd`             | styled HTML                   |
| `label`           | styled HTML                   |
| `menubar`         | `@kobalte/core/menubar`       |
| `native-select`   | styled HTML                   |
| `navigation-menu` | `@kobalte/core/popover`       |
| `pagination`      | `@kobalte/core/pagination`    |
| `popover`         | `@corvu/popover`              |
| `progress`        | `@kobalte/core/progress`      |
| `radio-group`     | `@kobalte/core/radio-group`   |
| `resizable`       | `@corvu/resizable`            |
| `scroll-area`     | styled HTML                   |
| `select`          | `@kobalte/core/select`        |
| `separator`       | `@kobalte/core/separator`     |
| `sheet`           | `@corvu/dialog`               |
| `skeleton`        | `@kobalte/core/skeleton`      |
| `slider`          | `@kobalte/core/slider`        |
| `spinner`         | styled HTML                   |
| `switch`          | `@kobalte/core/switch`        |
| `table`           | styled HTML                   |
| `tabs`            | `@kobalte/core/tabs`          |
| `textarea`        | `@kobalte/core/text-field`    |
| `toast`           | `@kobalte/core/toast`         |
| `toggle`          | `@kobalte/core/toggle-button` |
| `toggle-group`    | `@kobalte/core/toggle-group`  |

```tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogLabel,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger as={Button}>Open</DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogLabel>Title</DialogLabel>
      <DialogDescription>Details</DialogDescription>
      <DialogClose>Close</DialogClose>
    </DialogContent>
  </DialogPortal>
</Dialog>;
```

Trigger, portal, and anchor stay unstyled so they can render `as={Button}`.

From the repo root, `pnpm registry:build` runs `pnpm dlx shadcn@latest build` and writes `public/r/*.json`.

## m3

Material 3 Expressive components for Solid, delivered through the [shadcn CLI](https://ui.shadcn.com/docs/registry). Same API as [`ui`](#ui): compound parts with flat names (`Dialog`, `DialogTrigger`, `DialogContent`), `variant` / `size` props, `xxxVariants()` class helpers, `data-slot` attributes, and Kobalte or corvu primitives. The look follows [m3.material.io](https://m3.material.io).

Install into an app. The CLI copies the source and rewrites `@/lib/utils`.

### Install

In a Vite app with Tailwind CSS 4 (`src/index.css` starts with `@import "tailwindcss";`) and an `@/*` path alias:

```bash
pnpm dlx shadcn@latest init bieniucieniu/solidx/m3
pnpm dlx shadcn@latest add bieniucieniu/solidx/m3-button
pnpm dlx shadcn@latest add bieniucieniu/solidx/m3-dialog
```

`init` with `m3` writes `components.json`, adds `utils` and `m3-theme`, and skips shadcn's default React style. It stops if `components.json` already exists. In that case, or where `init` finds no supported framework, set up `components.json` as in the [`ui` install section](#install) and run `shadcn add bieniucieniu/solidx/m3-theme` instead.

Items are named `m3-<component>` and install into `components/m3/`, so they can sit next to `ui` components. Each one pulls in `utils`. The theme installs once, at init. Later component installs do not touch the tokens, so tuned values in `m3-tokens.css` and `src/index.css` stay.

`m3-theme` copies `m3-tokens.css` next to your Tailwind CSS file (`src/index.css`), imports it, and points `--primary` / `--secondary` at the M3 scheme. Adding it again resets `--primary`, `--secondary`, and the `body` classes in `src/index.css`, and with `--overwrite` replaces `m3-tokens.css`.

Inside this repo, import the package directly:

```css
@import "@solidx/kit-1.9/m3/theme.css"; /* tailwindcss + tw-animate-css + tokens */
```

### Tokens

Raw values use the M3 names on `:root` (light) and `.dark` (dark): `--md-sys-color-*`, `--md-sys-typescale-*`, `--md-sys-shape-corner-*`, `--md-sys-elevation-*`, `--md-sys-motion-*`. Tailwind utilities use the bare role names:

| Group      | Utilities                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Color      | `bg-primary`, `text-on-primary-container`, `bg-surface-container-high`, `border-outline-variant`, `bg-inverse-surface`, ...                    |
| Type       | `typescale-display-large` ... `typescale-label-small`, plus `typescale-emphasized-*`. One class sets font, size, line height, tracking, weight |
| Shape      | `rounded-extra-small` (4) ... `rounded-extra-extra-large` (48), `rounded-full`                                                                 |
| Elevation  | `shadow-level-0` ... `shadow-level-5`                                                                                                          |
| Motion     | `motion-fast`, `motion-default`, `motion-slow` (spring curves: spatial overshoots, effects don't); `ease-fast-spatial` and friends             |
| States     | `state-layer` (8% hover, 10% focus and press, on `currentColor`), `focus-ring` (3px secondary outline)                                         |
| Breakpoint | `medium:` (600), `expanded:` (840), `large:` (1200), `extra-large:` (1600)                                                                     |

Type styles are `typescale-*` rather than `text-*`: `tailwind-merge` reads an unknown `text-body-medium` as a color and drops it next to `text-on-surface`. With the `typescale-` prefix the shared `cn` needs no configuration. A `class` override of `typescale-*`, `rounded-<m3 name>`, or `shadow-level-*` is resolved by stylesheet order, not argument order.

### Next to a shadcn theme

`bg-primary` and `bg-secondary` read `--primary` / `--secondary`, the same variables shadcn uses. When an app also loads the `ui` theme (like this repo's Storybook), import `@solidx/kit-1.9/m3/tokens.css` instead of `theme.css` and put `data-m3` on the M3 part of the page. While an element with `data-m3` is mounted, `:root:has([data-m3])` points the two variables at M3, so portals (dialogs, menus, tooltips) follow too.

### Dynamic color

`m3-scheme` generates a scheme from a seed color with [material-color-utilities](https://github.com/material-foundation/material-color-utilities). The library loads on first use, so it stays out of the main bundle and out of SSR (0.4.0 has an import that Node's ESM loader rejects).

```ts
import { applyScheme, schemeCss } from "@/lib/m3-scheme";

const remove = await applyScheme(document.documentElement, { seed: "#006A6A", dark: false });
console.log(await schemeCss({ seed: "#006A6A", variant: "vibrant" })); // paste over the baseline
```

### Components

| Item                   | Parts                                                                                                                                                                                | Primitive                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `m3-button`            | `Button`, `ToggleButton`, `buttonVariants`                                                                                                                                           | `<button>`, `@kobalte/core/toggle-button`    |
| `m3-icon-button`       | `IconButton`, `ToggleIconButton`                                                                                                                                                     | `<button>`, `@kobalte/core/toggle-button`    |
| `m3-fab`               | `Fab`, `ExtendedFab`                                                                                                                                                                 | `<button>`                                   |
| `m3-fab-menu`          | `FabMenu`, `FabMenuTrigger`, `FabMenuContent`, `FabMenuItem`                                                                                                                         | `@kobalte/core/dropdown-menu`                |
| `m3-button-group`      | `ButtonGroup` (standard, connected)                                                                                                                                                  | styled HTML                                  |
| `m3-segmented-button`  | `SegmentedButton`, `SegmentedButtonItem`, `SegmentedButtonIcon`                                                                                                                      | `@kobalte/core/toggle-group`                 |
| `m3-split-button`      | `SplitButton`, `SplitButtonAction`, `SplitButtonTrigger` (with `m3-menu`)                                                                                                            | `@kobalte/core/dropdown-menu`                |
| `m3-checkbox`          | same parts as `ui` checkbox                                                                                                                                                          | `@kobalte/core/checkbox`                     |
| `m3-radio-group`       | same parts as `ui` radio group                                                                                                                                                       | `@kobalte/core/radio-group`                  |
| `m3-switch`            | same parts as `ui` switch; `SwitchThumb icons`                                                                                                                                       | `@kobalte/core/switch`                       |
| `m3-slider`            | same parts as `ui` slider                                                                                                                                                            | `@kobalte/core/slider`                       |
| `m3-chip`              | `AssistChip`, `FilterChip`, `InputChip`, `InputChipRemove`, `SuggestionChip`, `ChipSet`                                                                                              | `<button>`, `@kobalte/core/toggle-button`    |
| `m3-text-field`        | `TextField`, `TextFieldContainer`, `TextFieldLabel`, `TextFieldInput`, `TextFieldTextArea`, `TextFieldLeading`, `TextFieldTrailing`, `TextFieldDescription`, `TextFieldErrorMessage` | `@kobalte/core/text-field`                   |
| `m3-search`            | `Search`, `SearchControl`, `SearchInput`, `SearchContent`, `SearchItem`, ...                                                                                                         | `@kobalte/core/search`                       |
| `m3-card`              | `Card` (elevated, filled, outlined), `CardMedia`, `CardHeader`, ...                                                                                                                  | styled HTML                                  |
| `m3-list`              | `List`, `ListItem`, `ListItemLeading`, `ListItemContent`, `ListItemHeadline`, ...                                                                                                    | styled HTML                                  |
| `m3-divider`           | `Divider`                                                                                                                                                                            | `@kobalte/core/separator`                    |
| `m3-scroll-area`       | `ScrollArea`                                                                                                                                                                         | styled HTML                                  |
| `m3-dialog`            | `Dialog`, `DialogContent` (`fullScreen`), `DialogIcon`, `DialogHeadline`, `DialogActions`, `DialogClose`, ...                                                                        | `@corvu/dialog`                              |
| `m3-bottom-sheet`      | `BottomSheet`, `BottomSheetContent`, `BottomSheetBody`, `BottomSheetDragHandle`, ...                                                                                                 | `@corvu/drawer`                              |
| `m3-side-sheet`        | `SideSheet`, `SideSheetContent`, `SideSheetHeader`, `SideSheetActions`, ...                                                                                                          | `@corvu/dialog`                              |
| `m3-menu`              | `Menu`, `MenuContent`, `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`, `MenuSub`, ...                                                                                               | `@kobalte/core/dropdown-menu`                |
| `m3-tooltip`           | `Tooltip*`, `RichTooltip*`                                                                                                                                                           | `@corvu/tooltip`, `@kobalte/core/hover-card` |
| `m3-snackbar`          | `Snackbar`, `SnackbarRegion`, `SnackbarMessage`, `SnackbarAction`, `snackbar.show()`                                                                                                 | `@kobalte/core/toast` (own region)           |
| `m3-badge`             | `Badge`, `BadgeAnchor`                                                                                                                                                               | styled HTML                                  |
| `m3-progress`          | `Progress` parts (`ProgressFill wavy`), `CircularProgress`                                                                                                                           | `@kobalte/core/progress`                     |
| `m3-loading-indicator` | `LoadingIndicator`                                                                                                                                                                   | styled HTML                                  |
| `m3-app-bar`           | `AppBar` (small, medium, large), `AppBarLeading`, `AppBarHeadline`, `AppBarTitle`, ...                                                                                               | styled HTML                                  |
| `m3-toolbar`           | `Toolbar` (docked, floating; standard, vibrant)                                                                                                                                      | styled HTML                                  |
| `m3-tabs`              | `Tabs` (primary, secondary), `TabsList`, `TabsTrigger`, `TabsIndicator`, `TabsContent`                                                                                               | `@kobalte/core/tabs`                         |
| `m3-navigation-bar`    | `NavigationBar`, `NavigationBarItem`, `NavigationBarIcon`, `NavigationBarLabel`                                                                                                      | styled HTML                                  |
| `m3-navigation-rail`   | `NavigationRail` (`expanded`), `NavigationRailHeader`, `NavigationRailItem`, ...                                                                                                     | styled HTML                                  |
| `m3-navigation-drawer` | `NavigationDrawer`, `NavigationDrawerItem`, `ModalNavigationDrawer*`                                                                                                                 | styled HTML, `@corvu/drawer`                 |

Not built yet: date and time pickers (Kobalte has no calendar) and carousel.

```tsx
import { Button } from "@/components/m3/button";
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeadline,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/m3/dialog";

<Dialog>
  <DialogTrigger as={Button} variant="tonal">
    Delete
  </DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogHeadline>Permanently delete?</DialogHeadline>
      <DialogDescription>This can't be undone.</DialogDescription>
      <DialogActions>
        <DialogClose>Cancel</DialogClose>
        <DialogClose>Delete</DialogClose>
      </DialogActions>
    </DialogContent>
  </DialogPortal>
</Dialog>;
```

`tokens.css` is generated. Edit values in place; keep the names.

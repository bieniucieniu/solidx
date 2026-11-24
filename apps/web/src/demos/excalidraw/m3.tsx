import {
  Excalidraw,
  useAction,
  useAppState,
  useContextMenu,
  useExport,
  useHistory,
  useProperty,
  useShowShapeActions,
  useTool,
} from "@solidx/excalidraw";
import type { PropertyName } from "@solidx/excalidraw/core";
import { fonts } from "./fonts";
import {
  LockIcon,
  LockOpenIcon,
  MenuIcon,
  RedoIcon,
  TOOL_ICONS,
  UndoIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "./icons";
import "@solidx/excalidraw/style.css";
import {
  Card,
  IconButton,
  iconButtonVariants,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  ScrollArea,
  SegmentedButton,
  SegmentedButtonItem,
  Slider,
  SliderFill,
  SliderThumb,
  SliderTrack,
  ToggleIconButton,
  Toolbar,
} from "@solidx/kit/m3";
import type { JSX } from "@solidjs/web";
import { type Accessor, For, Show } from "solid-js";
import {
  BACKGROUND_COLORS,
  FILL_STYLES,
  FONT_FAMILIES,
  FONT_SIZES,
  ROUNDNESS,
  SLOPPINESS,
  STROKE_COLORS,
  STROKE_STYLES,
  STROKE_WIDTHS,
  swatchStyle,
  TEXT_ALIGNS,
  TOOLBAR,
} from "./shared";

function Tools() {
  const tool = useTool();
  return (
    <Toolbar variant="floating" class="pointer-events-auto min-w-0">
      <ScrollArea class="flex min-w-0 items-center gap-1">
        <ToggleIconButton
          aria-label="Keep the tool active after drawing"
          pressed={tool.locked()}
          onPressedChange={() => tool.toggleLock()}
        >
          {tool.locked() ? <LockIcon class="size-5" /> : <LockOpenIcon class="size-5" />}
        </ToggleIconButton>
        <For each={TOOLBAR}>
          {(item) => {
            const Icon = TOOL_ICONS[item.type]!;
            return (
              <ToggleIconButton
                variant="tonal"
                aria-label={`${item.label} — ${item.key}`}
                title={`${item.label} — ${item.key}`}
                pressed={tool.isActive(item.type)}
                onPressedChange={() => tool.set(item.type)}
              >
                <Icon class="size-5" />
              </ToggleIconButton>
            );
          }}
        </For>
      </ScrollArea>
    </Toolbar>
  );
}

function Property<N extends PropertyName>(props: {
  name: N;
  label: string;
  children: (property: ReturnType<typeof useProperty<N>>) => JSX.Element;
}) {
  const property = useProperty(props.name);
  return (
    <Show when={property.applies()}>
      <fieldset class="flex flex-col gap-2">
        <legend class="mb-1 text-label-medium text-on-surface-variant">{props.label}</legend>
        {props.children(property)}
      </fieldset>
    </Show>
  );
}

function Options(props: {
  property: { value: Accessor<unknown>; set: (value: never) => void };
  options: readonly { value: string | number; label: string }[];
}) {
  return (
    <SegmentedButton
      class="w-full"
      value={[String(props.property.value())]}
      onValueChange={(next) => {
        const [value] = next as string[];
        const option = props.options.find((o) => String(o.value) === value);
        if (option) props.property.set(option.value as never);
      }}
    >
      <For each={props.options}>
        {(option) => (
          <SegmentedButtonItem value={String(option.value)}>{option.label}</SegmentedButtonItem>
        )}
      </For>
    </SegmentedButton>
  );
}

function Swatches(props: {
  property: ReturnType<typeof useProperty<"strokeColor">>;
  colors: readonly string[];
}) {
  return (
    <div class="flex gap-1.5">
      <For each={props.colors}>
        {(color) => (
          <button
            type="button"
            aria-label={color}
            aria-pressed={props.property.value() === color ? "true" : "false"}
            class="size-7 rounded-full border border-outline-variant outline-offset-2 aria-pressed:outline-2 aria-pressed:outline-primary"
            style={swatchStyle(color)}
            onClick={() => props.property.set(color)}
          />
        )}
      </For>
    </div>
  );
}

function PropertiesPanel() {
  const show = useShowShapeActions();
  return (
    <Show when={show()}>
      <Card
        variant="elevated"
        class="pointer-events-auto flex max-h-full w-72 flex-col gap-4 overflow-y-auto p-4"
      >
        <Property name="strokeColor" label="Stroke">
          {(property) => <Swatches property={property} colors={STROKE_COLORS} />}
        </Property>
        <Property name="backgroundColor" label="Background">
          {(property) => <Swatches property={property} colors={BACKGROUND_COLORS} />}
        </Property>
        <Property name="fillStyle" label="Fill">
          {(property) => <Options property={property} options={FILL_STYLES} />}
        </Property>
        <Property name="strokeWidth" label="Stroke width">
          {(property) => <Options property={property} options={STROKE_WIDTHS} />}
        </Property>
        <Property name="strokeStyle" label="Stroke style">
          {(property) => <Options property={property} options={STROKE_STYLES} />}
        </Property>
        <Property name="sloppiness" label="Sloppiness">
          {(property) => <Options property={property} options={SLOPPINESS} />}
        </Property>
        <Property name="roundness" label="Edges">
          {(property) => <Options property={property} options={ROUNDNESS} />}
        </Property>
        <Property name="fontSize" label="Font size">
          {(property) => <Options property={property} options={FONT_SIZES} />}
        </Property>
        <Property name="fontFamily" label="Font">
          {(property) => <Options property={property} options={FONT_FAMILIES} />}
        </Property>
        <Property name="textAlign" label="Text align">
          {(property) => <Options property={property} options={TEXT_ALIGNS} />}
        </Property>
        <Property name="opacity" label="Opacity">
          {(property) => (
            <Slider
              min={0}
              max={100}
              step={10}
              value={[property.value() ?? 100]}
              onValueCommit={(value) => property.set((value as number[])[0]!)}
            >
              <SliderTrack>
                <SliderFill />
                <SliderThumb aria-label="Opacity" />
              </SliderTrack>
            </Slider>
          )}
        </Property>
      </Card>
    </Show>
  );
}

function ActionIconButton(props: { name: Parameters<typeof useAction>[0]; children: JSX.Element }) {
  const action = useAction(props.name);
  return (
    <IconButton
      aria-label={action.label()}
      title={action.shortcut ? `${action.label()} — ${action.shortcut}` : action.label()}
      onClick={() => action.perform()}
    >
      {props.children}
    </IconButton>
  );
}

function Footer() {
  const history = useHistory();
  const zoom = useAppState((state) => Math.round(state.zoom.value * 100));
  return (
    <div class="flex gap-2">
      <Toolbar variant="floating" class="pointer-events-auto">
        <ActionIconButton name="zoomOut">
          <ZoomOutIcon class="size-5" />
        </ActionIconButton>
        <ActionIconButton name="resetZoom">
          <span class="text-label-small tabular-nums">{zoom()}%</span>
        </ActionIconButton>
        <ActionIconButton name="zoomIn">
          <ZoomInIcon class="size-5" />
        </ActionIconButton>
      </Toolbar>
      <Toolbar variant="floating" class="pointer-events-auto">
        <IconButton aria-label="Undo" disabled={!history.canUndo()} onClick={history.undo}>
          <UndoIcon class="size-5" />
        </IconButton>
        <IconButton aria-label="Redo" disabled={!history.canRedo()} onClick={history.redo}>
          <RedoIcon class="size-5" />
        </IconButton>
      </Toolbar>
    </div>
  );
}

function MenuAction(props: { name: Parameters<typeof useAction>[0] }) {
  const action = useAction(props.name);
  return (
    <MenuItem onSelect={() => action.perform()}>
      <MenuItemLabel>{action.label()}</MenuItemLabel>
      <Show when={action.shortcut}>
        <MenuShortcut>{action.shortcut}</MenuShortcut>
      </Show>
    </MenuItem>
  );
}

function MainMenu() {
  const exporter = useExport();
  const dark = useAppState((state) => state.theme === "dark");
  return (
    <Menu>
      <MenuTrigger
        aria-label="Menu"
        class={iconButtonVariants({ variant: "tonal", class: "pointer-events-auto shrink-0" })}
      >
        <MenuIcon class="size-5" />
      </MenuTrigger>
      <MenuContent class="pointer-events-auto">
        <MenuAction name="loadScene" />
        <MenuAction name="saveFileToDisk" />
        <MenuItem
          onSelect={async () =>
            exporter.download(await exporter.toPng({ dark: dark() }), "drawing.png")
          }
        >
          <MenuItemLabel>Export image</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuAction name="toggleTheme" />
        <MenuAction name="gridMode" />
        <MenuAction name="zenMode" />
        <MenuSeparator />
        <MenuAction name="clearCanvas" />
      </MenuContent>
    </Menu>
  );
}

/** the canvas context menu, opened by the editor on right-click */
function ContextMenu() {
  const menu = useContextMenu();
  return (
    <Menu
      open={menu.open()}
      onOpenChange={(open) => {
        if (!open) menu.close();
      }}
    >
      <MenuTrigger
        aria-hidden="true"
        tabindex="-1"
        class="pointer-events-none absolute size-px opacity-0"
        style={{ top: `${menu.position()?.top ?? 0}px`, left: `${menu.position()?.left ?? 0}px` }}
      />
      <MenuContent align="start">
        <For each={menu.entries()}>
          {(entry) =>
            entry.type === "separator" ? (
              <MenuSeparator />
            ) : (
              <MenuItem onSelect={entry.select}>
                <MenuItemLabel class={entry.dangerous ? "text-error" : undefined}>
                  {entry.label}
                </MenuItemLabel>
                <Show when={entry.shortcut}>
                  <MenuShortcut>{entry.shortcut}</MenuShortcut>
                </Show>
              </MenuItem>
            )
          }
        </For>
      </MenuContent>
    </Menu>
  );
}

export default function ExcalidrawM3Demo() {
  return (
    <div class="h-[640px] overflow-hidden rounded-large border border-outline-variant">
      <Excalidraw fonts={fonts}>
        <div class="flex h-full flex-col justify-between p-3">
          <div class="flex items-start justify-between gap-3">
            <MainMenu />
            <Tools />
            <div class="w-12" />
          </div>
          <div class="flex min-h-0 flex-1 items-start py-3">
            <PropertiesPanel />
          </div>
          <Footer />
        </div>
        <ContextMenu />
      </Excalidraw>
    </div>
  );
}

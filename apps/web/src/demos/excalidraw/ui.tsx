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
import {
  HamburgerMenuIcon,
  LockedIcon,
  RedoIcon,
  TOOL_ICONS,
  UndoIcon,
  UnlockedIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@solidx/excalidraw/icons";
import "@solidx/excalidraw/style.css";
import {
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  ScrollArea,
  Separator,
  Slider,
  SliderControl,
  SliderFill,
  SliderThumb,
  SliderTrack,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  cn,
} from "@solidx/kit/ui";
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

/** the island style every floating panel shares */
const island = "pointer-events-auto rounded-lg border bg-background/95 p-1 shadow-sm backdrop-blur";

function Toolbar() {
  const tool = useTool();
  return (
    <ScrollArea class={cn(island, "flex min-w-0 items-center gap-1")}>
      <Toggle
        size="sm"
        aria-label="Keep the tool active after drawing"
        pressed={tool.locked()}
        onPressedChange={() => tool.toggleLock()}
      >
        {tool.locked() ? <LockedIcon class="size-4" /> : <UnlockedIcon class="size-4" />}
      </Toggle>
      <Separator orientation="vertical" class="h-5" />
      <ToggleGroup
        size="sm"
        value={[tool.active().type]}
        onValueChange={(next) => {
          const [type] = next as string[];
          if (type) tool.set(type as (typeof TOOLBAR)[number]["type"]);
        }}
      >
        <For each={TOOLBAR}>
          {(item) => {
            const Icon = TOOL_ICONS[item.type as keyof typeof TOOL_ICONS]!;
            return (
              <ToggleGroupItem
                value={item.type}
                aria-label={`${item.label} — ${item.key}`}
                title={`${item.label} — ${item.key}`}
              >
                <Icon class="size-4" />
              </ToggleGroupItem>
            );
          }}
        </For>
      </ToggleGroup>
    </ScrollArea>
  );
}

/** one row of the properties panel, shown when the property applies */
function Property<N extends PropertyName>(props: {
  name: N;
  label: string;
  children: (property: ReturnType<typeof useProperty<N>>) => JSX.Element;
}) {
  const property = useProperty(props.name);
  return (
    <Show when={property.applies()}>
      <fieldset class="flex flex-col gap-1.5">
        <legend class="mb-1 text-xs font-medium text-muted-foreground">{props.label}</legend>
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
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      value={[String(props.property.value())]}
      onValueChange={(next) => {
        const [value] = next as string[];
        const option = props.options.find((o) => String(o.value) === value);
        if (option) props.property.set(option.value as never);
      }}
    >
      <For each={props.options}>
        {(option) => <ToggleGroupItem value={String(option.value)}>{option.label}</ToggleGroupItem>}
      </For>
    </ToggleGroup>
  );
}

function Swatches(props: {
  property: ReturnType<typeof useProperty<"strokeColor">>;
  colors: readonly string[];
}) {
  return (
    <div class="flex gap-1">
      <For each={props.colors}>
        {(color) => (
          <button
            type="button"
            aria-label={color}
            aria-pressed={props.property.value() === color ? "true" : "false"}
            class="size-6 rounded-md border ring-offset-1 ring-offset-background aria-pressed:ring-2 aria-pressed:ring-ring"
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
      <div class={cn(island, "flex w-56 flex-col gap-3 p-3")}>
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
              value={property.value() ?? 100}
              onValueCommit={(value) => property.set(value as number)}
            >
              <SliderControl>
                <SliderTrack>
                  <SliderFill />
                  <SliderThumb aria-label="Opacity" />
                </SliderTrack>
              </SliderControl>
            </Slider>
          )}
        </Property>
      </div>
    </Show>
  );
}

function ActionButton(props: { name: Parameters<typeof useAction>[0]; children: JSX.Element }) {
  const action = useAction(props.name);
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={action.label()}
      title={action.shortcut ? `${action.label()} — ${action.shortcut}` : action.label()}
      onClick={() => action.perform()}
    >
      {props.children}
    </Button>
  );
}

function Footer() {
  const history = useHistory();
  const zoom = useAppState((state) => Math.round(state.zoom.value * 100));
  return (
    <div class="flex gap-2">
      <div class={cn(island, "flex items-center")}>
        <ActionButton name="zoomOut">
          <ZoomOutIcon class="size-4" />
        </ActionButton>
        <ActionButton name="resetZoom">
          <span class="w-10 text-xs tabular-nums">{zoom()}%</span>
        </ActionButton>
        <ActionButton name="zoomIn">
          <ZoomInIcon class="size-4" />
        </ActionButton>
      </div>
      <div class={cn(island, "flex items-center")}>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Undo"
          disabled={!history.canUndo()}
          onClick={history.undo}
        >
          <UndoIcon class="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Redo"
          disabled={!history.canRedo()}
          onClick={history.redo}
        >
          <RedoIcon class="size-4" />
        </Button>
      </div>
    </div>
  );
}

function MenuAction(props: { name: Parameters<typeof useAction>[0]; variant?: "destructive" }) {
  const action = useAction(props.name);
  return (
    <DropdownMenuItem variant={props.variant} onSelect={() => action.perform()}>
      {action.label()}
      <Show when={action.shortcut}>
        <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
      </Show>
    </DropdownMenuItem>
  );
}

function MainMenu() {
  const exporter = useExport();
  const dark = useAppState((state) => state.theme === "dark");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        class={cn(island, buttonVariants({ variant: "ghost", size: "icon" }), "shrink-0")}
        aria-label="Menu"
      >
        <HamburgerMenuIcon class="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="pointer-events-auto min-w-52">
        <MenuAction name="loadScene" />
        <MenuAction name="saveFileToDisk" />
        <DropdownMenuItem
          onSelect={async () =>
            exporter.download(await exporter.toPng({ dark: dark() }), "drawing.png")
          }
        >
          Export image
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <MenuAction name="toggleTheme" />
        <MenuAction name="gridMode" />
        <MenuAction name="zenMode" />
        <DropdownMenuSeparator />
        <MenuAction name="clearCanvas" variant="destructive" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** the canvas context menu, opened by the editor on right-click */
function ContextMenu() {
  const menu = useContextMenu();
  return (
    <DropdownMenu
      open={menu.open()}
      onOpenChange={(open) => {
        if (!open) menu.close();
      }}
    >
      <DropdownMenuTrigger
        aria-hidden="true"
        tabindex="-1"
        class="pointer-events-none absolute size-px opacity-0"
        style={{ top: `${menu.position()?.top ?? 0}px`, left: `${menu.position()?.left ?? 0}px` }}
      />
      <DropdownMenuContent class="min-w-52" align="start">
        <For each={menu.entries()}>
          {(entry) =>
            entry.type === "separator" ? (
              <DropdownMenuSeparator />
            ) : (
              <DropdownMenuItem
                variant={entry.dangerous ? "destructive" : undefined}
                onSelect={entry.select}
              >
                {entry.label}
                <Show when={entry.shortcut}>
                  <DropdownMenuShortcut>{entry.shortcut}</DropdownMenuShortcut>
                </Show>
              </DropdownMenuItem>
            )
          }
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ExcalidrawUiDemo() {
  return (
    <div class="h-[640px] overflow-hidden rounded-lg border">
      <Excalidraw>
        <div class="flex h-full flex-col justify-between p-3">
          <div class="flex items-start justify-between gap-3">
            <MainMenu />
            <Toolbar />
            <div class="w-8" />
          </div>
          <div class="flex flex-1 items-start py-3">
            <PropertiesPanel />
          </div>
          <Footer />
        </div>
        <ContextMenu />
      </Excalidraw>
    </div>
  );
}

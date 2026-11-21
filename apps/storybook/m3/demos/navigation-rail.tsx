import {
  ExtendedFab,
  Fab,
  IconButton,
  NavigationRail,
  NavigationRailHeader,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailLabel,
} from "@solidx/kit-1.9/m3";
import { createSignal, For, type JSX, Show } from "solid-js";
import { EditIcon, HomeIcon, MailIcon, MenuIcon, PersonIcon, StarIcon } from "./shared";

const items: { label: string; icon: () => JSX.Element }[] = [
  { label: "Home", icon: () => <HomeIcon /> },
  { label: "Mail", icon: () => <MailIcon /> },
  { label: "Starred", icon: () => <StarIcon /> },
  { label: "Profile", icon: () => <PersonIcon /> },
];

export function NavigationRailDemo() {
  const [expanded, setExpanded] = createSignal(false);
  const [active, setActive] = createSignal("Home");
  return (
    <div class="flex h-120 overflow-hidden rounded-medium border border-outline-variant">
      <NavigationRail expanded={expanded()}>
        <NavigationRailHeader>
          <IconButton
            aria-label={expanded() ? "Collapse navigation" : "Expand navigation"}
            onClick={() => setExpanded((value) => !value)}
          >
            <MenuIcon />
          </IconButton>
          <Show
            when={expanded()}
            fallback={
              <Fab aria-label="Compose" class="shadow-none hover:shadow-none">
                <EditIcon />
              </Fab>
            }
          >
            <ExtendedFab class="shadow-none hover:shadow-none">
              <EditIcon />
              Compose
            </ExtendedFab>
          </Show>
        </NavigationRailHeader>
        <For each={items}>
          {(item) => (
            <NavigationRailItem
              active={active() === item.label}
              onClick={() => setActive(item.label)}
            >
              <NavigationRailIcon>{item.icon()}</NavigationRailIcon>
              <NavigationRailLabel>{item.label}</NavigationRailLabel>
            </NavigationRailItem>
          )}
        </For>
      </NavigationRail>
      <div class="flex-1 bg-surface-container-low p-6 typescale-body-medium text-on-surface-variant">
        {active()}
      </div>
    </div>
  );
}

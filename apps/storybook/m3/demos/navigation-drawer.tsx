import {
  Button,
  ModalNavigationDrawer,
  ModalNavigationDrawerContent,
  ModalNavigationDrawerOverlay,
  ModalNavigationDrawerPortal,
  ModalNavigationDrawerTrigger,
  NavigationDrawer,
  NavigationDrawerDivider,
  NavigationDrawerHeadline,
  NavigationDrawerItem,
  NavigationDrawerItemBadge,
  NavigationDrawerItemLabel,
} from "@solidx/kit-1.9/m3";
import { createSignal, For, type JSX } from "solid-js";
import { DeleteIcon, HomeIcon, MailIcon, SendIcon, StarIcon } from "./shared";

const items: { label: string; icon: () => JSX.Element; badge?: string }[] = [
  { label: "Inbox", icon: () => <MailIcon />, badge: "24" },
  { label: "Starred", icon: () => <StarIcon /> },
  { label: "Sent", icon: () => <SendIcon /> },
  { label: "Trash", icon: () => <DeleteIcon /> },
];

function Destinations() {
  const [active, setActive] = createSignal("Inbox");
  return (
    <>
      <NavigationDrawerHeadline>Mail</NavigationDrawerHeadline>
      <For each={items}>
        {(item) => (
          <NavigationDrawerItem
            active={active() === item.label}
            onClick={() => setActive(item.label)}
          >
            {item.icon()}
            <NavigationDrawerItemLabel>{item.label}</NavigationDrawerItemLabel>
            {item.badge ? (
              <NavigationDrawerItemBadge>{item.badge}</NavigationDrawerItemBadge>
            ) : null}
          </NavigationDrawerItem>
        )}
      </For>
      <NavigationDrawerDivider />
      <NavigationDrawerHeadline>Labels</NavigationDrawerHeadline>
      <NavigationDrawerItem>
        <HomeIcon />
        <NavigationDrawerItemLabel>Family</NavigationDrawerItemLabel>
      </NavigationDrawerItem>
    </>
  );
}

export function NavigationDrawerDemo() {
  return (
    <div class="flex flex-col gap-6">
      <div class="h-110 overflow-hidden rounded-medium border border-outline-variant">
        <NavigationDrawer class="bg-surface-container-low">
          <Destinations />
        </NavigationDrawer>
      </div>
      <ModalNavigationDrawer>
        <ModalNavigationDrawerTrigger as={Button} variant="tonal" class="self-start">
          Open modal drawer
        </ModalNavigationDrawerTrigger>
        <ModalNavigationDrawerPortal>
          <ModalNavigationDrawerOverlay />
          <ModalNavigationDrawerContent>
            <Destinations />
          </ModalNavigationDrawerContent>
        </ModalNavigationDrawerPortal>
      </ModalNavigationDrawer>
    </div>
  );
}

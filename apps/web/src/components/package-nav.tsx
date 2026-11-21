import {
  NavigationBar,
  NavigationBarIcon,
  NavigationBarItem,
  NavigationBarLabel,
  NavigationRail,
  NavigationRailIcon,
  NavigationRailItem,
  NavigationRailLabel,
} from "@solidx/kit/m3";
import { useLinkState } from "@solidjs/router";
import { For } from "solid-js";
import { PackageIcon } from "~/components/package-icon";
import { type PackageNav, packages } from "~/nav";

function RailItem(props: { item: PackageNav }) {
  const link = useLinkState(() => props.item.href);
  return (
    <NavigationRailItem as="a" href={props.item.href} active={link.active()}>
      <NavigationRailIcon>
        <PackageIcon id={props.item.id} />
      </NavigationRailIcon>
      <NavigationRailLabel>{props.item.title}</NavigationRailLabel>
    </NavigationRailItem>
  );
}

function BarItem(props: { item: PackageNav }) {
  const link = useLinkState(() => props.item.href);
  return (
    <NavigationBarItem as="a" href={props.item.href} active={link.active()}>
      <NavigationBarIcon>
        <PackageIcon id={props.item.id} />
      </NavigationBarIcon>
      <NavigationBarLabel>{props.item.title}</NavigationBarLabel>
    </NavigationBarItem>
  );
}

/**
 * The packages as M3 primary navigation: a navigation bar at the bottom of compact windows, a
 * collapsed navigation rail on the leading edge from medium up.
 */
export function PackageNavigation() {
  return (
    <>
      <NavigationRail
        aria-label="Packages"
        class="m3-chrome fixed top-(--header-height) bottom-0 left-0 z-30 hidden h-auto overflow-y-auto pt-1 medium:flex"
      >
        <For each={packages}>{(item) => <RailItem item={item} />}</For>
      </NavigationRail>
      <NavigationBar
        aria-label="Packages"
        class="m3-chrome fixed bottom-0 z-30 h-auto min-h-16 pb-[env(safe-area-inset-bottom)] medium:hidden"
      >
        <For each={packages}>{(item) => <BarItem item={item} />}</For>
      </NavigationBar>
    </>
  );
}

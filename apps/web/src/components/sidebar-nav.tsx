import {
  cn,
  NavigationDrawer,
  NavigationDrawerHeadline,
  NavigationDrawerItem,
  NavigationDrawerItemLabel,
} from "@solidx/kit/m3";
import { useLinkState } from "@solidjs/router";
import { For, Show } from "solid-js";
import type { NavItem } from "~/nav";

/**
 * The router marks plain anchors itself: `data-active` on every link the path is under, and
 * `aria-current="page"` on the exact one. Only the exact page gets the active indicator, so the
 * overview link stays plain on its child pages.
 */
const exactActiveClass =
  "h-11 data-active:bg-transparent data-active:text-on-surface-variant data-active:aria-[current=page]:bg-secondary-container data-active:aria-[current=page]:text-on-secondary-container";

function SidebarLink(props: { item: NavItem }) {
  const link = useLinkState(() => props.item.href, { end: true });
  return (
    <NavigationDrawerItem
      as="a"
      href={props.item.href}
      active={link.current()}
      class={exactActiveClass}
    >
      <NavigationDrawerItemLabel>{props.item.title}</NavigationDrawerItemLabel>
    </NavigationDrawerItem>
  );
}

/** The package's pages as an M3 navigation drawer column. */
export function SidebarNav(props: { items: NavItem[]; title?: string; class?: string }) {
  return (
    <NavigationDrawer aria-label={props.title} class={cn("w-full bg-transparent", props.class)}>
      <Show when={props.title}>
        {(title) => <NavigationDrawerHeadline>{title()}</NavigationDrawerHeadline>}
      </Show>
      <For each={props.items}>{(item) => <SidebarLink item={item} />}</For>
    </NavigationDrawer>
  );
}

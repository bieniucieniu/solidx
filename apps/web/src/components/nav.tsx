import {
  AppBar,
  AppBarLeading,
  AppBarTrailing,
  ModalNavigationDrawer,
  ModalNavigationDrawerContent,
  ModalNavigationDrawerOverlay,
  ModalNavigationDrawerTitle,
  ModalNavigationDrawerTrigger,
  NavigationRailHeader,
  ScrollArea,
  iconButtonVariants,
} from "@solidx/kit/m3";
import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, onSettled, For, Show } from "solid-js";
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
import { PackageIcon } from "~/components/package-icon";
import { NavItem, type PackageNav, packages, sidebars } from "~/nav";
import { ThemeToggle } from "./theme-toggle";
import {
  cn,
  NavigationDrawer,
  NavigationDrawerHeadline,
  NavigationDrawerItem,
  NavigationDrawerItemLabel,
} from "@solidx/kit/m3";
import { useLinkState } from "@solidjs/router";

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
      <ScrollArea>
        <For each={props.items}>{(item) => <SidebarLink item={item} />}</For>
      </ScrollArea>
    </NavigationDrawer>
  );
}

function HomeIcon(props: { class?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" />
    </svg>
  );
}

export function Header() {
  const location = useLocation();
  const segment = () => location.pathname.split("/").filter(Boolean)[0] ?? "";
  const currentPackage = () => packages.find((item) => item.id === segment());
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  // M3 small app bar: flat on surface at rest, surface-container once content scrolls under it.
  onSettled(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  });

  // Close the mobile drawer once a link in it navigates.
  createEffect(
    () => location.pathname,
    () => {
      setMenuOpen(false);
    },
    { defer: true },
  );

  return (
    <Show when={currentPackage()}>
      {(pkg) => (
        <AppBar
          scrolled={scrolled()}
          class="m3-chrome sticky top-0 z-40 h-(--header-height) min-h-0 px-1 medium:hidden"
        >
          <AppBarLeading class="h-(--header-height)">
            <ModalNavigationDrawer open={menuOpen()} onOpenChange={(open) => setMenuOpen(open)}>
              <ModalNavigationDrawerTrigger
                aria-label={`Open ${pkg().title} navigation`}
                class={iconButtonVariants({ size: "sm", class: "expanded:hidden" })}
              >
                <HomeIcon />
              </ModalNavigationDrawerTrigger>
              <ModalNavigationDrawerOverlay />
              <ModalNavigationDrawerContent>
                <ModalNavigationDrawerTitle class="sr-only">
                  {pkg().title} navigation
                </ModalNavigationDrawerTitle>
                <SidebarNav items={sidebars[pkg().id]} title={pkg().title} class="p-0" />
              </ModalNavigationDrawerContent>
            </ModalNavigationDrawer>
            <a href="/" class="px-2 typescale-title-large whitespace-nowrap text-on-surface">
              solidx
            </a>
          </AppBarLeading>
          <AppBarTrailing>
            <ThemeToggle />
          </AppBarTrailing>
        </AppBar>
      )}
    </Show>
  );
}

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
 * The packages as M3 primary navigation: a collapsed navigation rail on the leading edge from medium up.
 */
export function PackageNavigationRail(props: { class?: string }) {
  return (
    <NavigationRail aria-label="Packages" class={["m3-chrome h-auto overflow-y-auto", props.class]}>
      <NavigationRailHeader as="a" href={"/"}>
        <NavigationRailIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M6,19H9V13h6v6h3V10L12,5.5L6,10v9ZM4,21V9l8-6l8,6V21H13V15H11v6H4Zm8-8.75Z" />
          </svg>
        </NavigationRailIcon>
        <NavigationRailLabel>solidx</NavigationRailLabel>
      </NavigationRailHeader>
      <For each={packages}>{(item) => <RailItem item={item} />}</For>
      <div class="flex-1" />
      <ThemeToggle class="-mb-5" />
    </NavigationRail>
  );
}
/**
 * The packages as M3 primary navigation: a navigation bar at the bottom of compact windows.
 */
export function PackageNavigationBar(props: { class?: string }) {
  return (
    <NavigationBar aria-label="Packages" class={["m3-chrome", props.class]}>
      <For each={packages}>{(item) => <BarItem item={item} />}</For>
    </NavigationBar>
  );
}

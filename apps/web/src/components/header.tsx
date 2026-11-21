import {
  AppBar,
  AppBarLeading,
  AppBarTrailing,
  ModalNavigationDrawer,
  ModalNavigationDrawerContent,
  ModalNavigationDrawerOverlay,
  ModalNavigationDrawerTitle,
  ModalNavigationDrawerTrigger,
  buttonVariants,
  iconButtonVariants,
} from "@solidx/kit/m3";
import { useLinkState, useLocation } from "@solidjs/router";
import { For, Show, createEffect, createSignal } from "solid-js";
import { SidebarNav } from "~/components/sidebar-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { type PackageNav, packages, sidebars } from "~/nav";

function PackageLink(props: { item: PackageNav }) {
  const link = useLinkState(() => props.item.href);
  return (
    <a
      href={props.item.href}
      aria-current={link.active() ? "page" : undefined}
      class={buttonVariants({
        variant: link.active() ? "tonal" : "text",
        size: "xs",
        class: "shrink-0",
      })}
    >
      {props.item.title}
    </a>
  );
}

export function Header() {
  const location = useLocation();
  const segment = () => location.pathname.split("/").filter(Boolean)[0] ?? "";
  const currentPackage = () => packages.find((item) => item.id === segment());
  const [menuOpen, setMenuOpen] = createSignal(false);

  // Close the mobile drawer once a link in it navigates.
  createEffect(
    () => location.pathname,
    () => {
      setMenuOpen(false);
    },
    { defer: true },
  );

  return (
    <AppBar class="sticky top-0 z-40 h-(--header-height) min-h-0 border-b border-outline-variant">
      <AppBarLeading class="h-(--header-height)">
        <Show when={currentPackage()}>
          {(pkg) => (
            <ModalNavigationDrawer open={menuOpen()} onOpenChange={(open) => setMenuOpen(open)}>
              <ModalNavigationDrawerTrigger
                aria-label={`Open ${pkg().title} navigation`}
                class={iconButtonVariants({ size: "sm", class: "md:hidden" })}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" />
                </svg>
              </ModalNavigationDrawerTrigger>
              <ModalNavigationDrawerOverlay />
              <ModalNavigationDrawerContent>
                <ModalNavigationDrawerTitle class="sr-only">
                  {pkg().title} navigation
                </ModalNavigationDrawerTitle>
                <SidebarNav items={sidebars[pkg().id]} title={pkg().title} class="p-0" />
              </ModalNavigationDrawerContent>
            </ModalNavigationDrawer>
          )}
        </Show>
        <a
          href="/"
          class="mr-2 shrink-0 px-2 typescale-title-medium whitespace-nowrap text-on-surface"
        >
          solidx
        </a>
      </AppBarLeading>
      <nav
        aria-label="Packages"
        class="col-start-2 row-start-1 flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none]"
      >
        <For each={packages}>{(item) => <PackageLink item={item} />}</For>
      </nav>
      <AppBarTrailing class="h-(--header-height)">
        <ThemeToggle />
      </AppBarTrailing>
    </AppBar>
  );
}

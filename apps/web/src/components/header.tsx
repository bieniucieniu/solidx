import {
  AppBar,
  AppBarLeading,
  AppBarTrailing,
  ModalNavigationDrawer,
  ModalNavigationDrawerContent,
  ModalNavigationDrawerOverlay,
  ModalNavigationDrawerTitle,
  ModalNavigationDrawerTrigger,
  iconButtonVariants,
} from "@solidx/kit/m3";
import { useLocation } from "@solidjs/router";
import { Show, createEffect, createSignal, onSettled } from "solid-js";
import { SidebarNav } from "~/components/sidebar-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { packages, sidebars } from "~/nav";

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
    <AppBar
      scrolled={scrolled()}
      class="m3-chrome sticky top-0 z-40 h-(--header-height) min-h-0 px-1 medium:px-3"
    >
      <AppBarLeading class="h-(--header-height)">
        <Show when={currentPackage()}>
          {(pkg) => (
            <ModalNavigationDrawer open={menuOpen()} onOpenChange={(open) => setMenuOpen(open)}>
              <ModalNavigationDrawerTrigger
                aria-label={`Open ${pkg().title} navigation`}
                class={iconButtonVariants({ size: "sm", class: "expanded:hidden" })}
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
        <a href="/" class="px-2 typescale-title-large whitespace-nowrap text-on-surface">
          solidx
        </a>
      </AppBarLeading>
      <AppBarTrailing class="h-(--header-height)">
        <ThemeToggle />
      </AppBarTrailing>
    </AppBar>
  );
}

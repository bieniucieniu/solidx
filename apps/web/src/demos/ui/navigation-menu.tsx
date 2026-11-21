import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@solidx/kit/ui";
import { For } from "solid-js";

const gettingStarted = [
  { title: "Introduction", href: "/", description: "What solidx is and how the packages fit." },
  { title: "Installation", href: "/ui", description: "Add components with the shadcn CLI." },
  { title: "Theming", href: "/ui", description: "CSS variables, dark mode, and radius tokens." },
  { title: "Registry", href: "/ui", description: "Copy the source into your own project." },
];

const components = [
  { title: "Button", href: "/ui/button" },
  { title: "Dialog", href: "/ui/dialog" },
  { title: "Dropdown menu", href: "/ui/dropdown-menu" },
  { title: "Tabs", href: "/ui/tabs" },
  { title: "Tooltip", href: "/ui/tooltip" },
];

const packages = [
  { title: "@solidx/kit/ui", href: "/ui", description: "shadcn-style components on ui-sdk." },
  { title: "@solidx/kit/tiptap", href: "/", description: "Tiptap editor bindings for Solid." },
];

export function NavigationMenuDemo() {
  // The viewport renders below the list, so leave room for it inside clipped previews.
  return (
    <div class="min-h-64">
      <NavigationMenu aria-label="Site">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent class="grid w-96 grid-cols-2 gap-1">
              <For each={gettingStarted}>
                {(item) => (
                  <NavigationMenuLink href={item.href} class="flex-col items-start gap-0.5">
                    <span class="font-medium">{item.title}</span>
                    <span class="text-muted-foreground">{item.description}</span>
                  </NavigationMenuLink>
                )}
              </For>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent class="w-48">
              <For each={components}>
                {(item) => <NavigationMenuLink href={item.href}>{item.title}</NavigationMenuLink>}
              </For>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Packages</NavigationMenuTrigger>
            <NavigationMenuContent class="w-72">
              <For each={packages}>
                {(item) => (
                  <NavigationMenuLink href={item.href} class="flex-col items-start gap-0.5">
                    <span class="font-medium">{item.title}</span>
                    <span class="text-muted-foreground">{item.description}</span>
                  </NavigationMenuLink>
                )}
              </For>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="https://github.com/bieniucieniu/solidx"
              class={navigationMenuTriggerStyle}
            >
              GitHub
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

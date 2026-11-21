import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { For } from "solid-js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NavigationMenuDemo />,
};

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
  {
    title: "@solidx/kit-1.9/ui",
    href: "/ui",
    description: "shadcn-style components on Kobalte.",
  },
  {
    title: "@solidx/kit-1.9/tiptap",
    href: "/",
    description: "Tiptap editor bindings for Solid.",
  },
];

function NavigationMenuDemo() {
  // The viewport renders below the list, so leave room for it inside clipped previews.
  return (
    <div class="min-h-64">
      <NavigationMenu>
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
        <NavigationMenuTrigger href="https://github.com/bieniucieniu/solidx">
          GitHub
        </NavigationMenuTrigger>
      </NavigationMenu>
    </div>
  );
}

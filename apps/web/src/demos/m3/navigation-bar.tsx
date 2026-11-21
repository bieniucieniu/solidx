import {
  Badge,
  BadgeAnchor,
  NavigationBar,
  NavigationBarIcon,
  NavigationBarItem,
  NavigationBarLabel,
} from "@solidx/kit/m3";
import { type JSX } from "@solidjs/web";
import { createSignal, For } from "solid-js";
import { DemoRow, DemoStack, HomeIcon, MailIcon, PersonIcon, StarIcon } from "./shared";

const items: { label: string; icon: () => JSX.Element; badge?: string }[] = [
  { label: "Home", icon: () => <HomeIcon /> },
  { label: "Mail", icon: () => <MailIcon />, badge: "3" },
  { label: "Starred", icon: () => <StarIcon /> },
  { label: "Profile", icon: () => <PersonIcon /> },
];

function Example(props: { layout?: "stacked" | "inline" }) {
  const [active, setActive] = createSignal("Home");
  return (
    <NavigationBar layout={props.layout} class="rounded-medium">
      <For each={items}>
        {(item) => (
          <NavigationBarItem active={active() === item.label} onClick={() => setActive(item.label)}>
            <NavigationBarIcon>
              <BadgeAnchor>
                {item.icon()}
                {item.badge ? <Badge>{item.badge}</Badge> : null}
              </BadgeAnchor>
            </NavigationBarIcon>
            <NavigationBarLabel>{item.label}</NavigationBarLabel>
          </NavigationBarItem>
        )}
      </For>
    </NavigationBar>
  );
}

export function NavigationBarDemo() {
  return (
    <DemoStack>
      <DemoRow label="Stacked (compact windows)" class="block">
        <Example />
      </DemoRow>
      <DemoRow label="Inline (medium windows)" class="block">
        <Example layout="inline" />
      </DemoRow>
    </DemoStack>
  );
}

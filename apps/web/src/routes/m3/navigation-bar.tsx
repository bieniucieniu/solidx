import { DocsPage } from "~/components/preview";
import { NavigationBarDemo } from "~/demos/m3/navigation-bar";
import source from "~/demos/m3/navigation-bar.tsx?raw";

const snippet = `import { NavigationBar, NavigationBarIcon, NavigationBarItem, NavigationBarLabel } from "@solidx/kit/m3";

// layout: "stacked" | "inline"
<NavigationBar>
  <NavigationBarItem as="a" href="/" active={isHome()}>
    <NavigationBarIcon><HomeIcon /></NavigationBarIcon>
    <NavigationBarLabel>Home</NavigationBarLabel>
  </NavigationBarItem>
</NavigationBar>`;

export default function NavigationBarPage() {
  return (
    <DocsPage
      title="Navigation bar"
      description="Bottom navigation for compact and medium windows."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/navigation-bar.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <NavigationBarDemo />
    </DocsPage>
  );
}

import { DocsPage } from "~/components/preview";
import { NavigationDrawerDemo } from "~/demos/m3/navigation-drawer";
import source from "~/demos/m3/navigation-drawer.tsx?raw";

const snippet = `import { NavigationDrawer, NavigationDrawerHeadline, NavigationDrawerItem, NavigationDrawerItemBadge, NavigationDrawerItemLabel } from "@solidx/kit/m3";

<NavigationDrawer>
  <NavigationDrawerHeadline>Mail</NavigationDrawerHeadline>
  <NavigationDrawerItem active>
    <MailIcon />
    <NavigationDrawerItemLabel>Inbox</NavigationDrawerItemLabel>
    <NavigationDrawerItemBadge>24</NavigationDrawerItemBadge>
  </NavigationDrawerItem>
</NavigationDrawer>`;

export default function NavigationDrawerPage() {
  return (
    <DocsPage
      title="Navigation drawer"
      description="Standard and modal navigation drawers."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/navigation-drawer.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <NavigationDrawerDemo />
    </DocsPage>
  );
}

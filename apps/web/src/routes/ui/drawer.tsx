import { DocsPage } from "~/components/preview";
import { DrawerDemo } from "~/demos/ui/drawer";
import source from "~/demos/ui/drawer.tsx?raw";

const snippet = `import {
  buttonVariants,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel,
  DrawerOverlay,
  DrawerTrigger,
} from "@solidx/kit/ui";

<Drawer>
  <DrawerTrigger class={buttonVariants()}>Open</DrawerTrigger>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerHeader>
      <DrawerLabel>Filters</DrawerLabel>
      <DrawerDescription>Narrow the list.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

export default function DrawerPage() {
  return (
    <DocsPage
      title="Drawer"
      description="A panel that slides in from an edge. Drag it back to dismiss."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/drawer.tsx"
    >
      <DrawerDemo />
    </DocsPage>
  );
}

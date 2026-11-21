import { DocsPage } from "~/components/preview";
import { SheetDemo } from "~/demos/ui/sheet";
import source from "~/demos/ui/sheet.tsx?raw";

const snippet = `import {
  buttonVariants,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetLabel,
  SheetOverlay,
  SheetTrigger,
} from "@solidx/kit/ui";

// SheetContent side: "top" | "right" | "bottom" | "left"
<Sheet>
  <SheetTrigger class={buttonVariants()}>Open</SheetTrigger>
  <SheetOverlay />
  <SheetContent side="left">
    <SheetHeader>
      <SheetLabel>Settings</SheetLabel>
      <SheetDescription>Changes apply to this project.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose>Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

export default function SheetPage() {
  return (
    <DocsPage
      title="Sheet"
      description="A panel that slides in from the right."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/sheet.tsx"
    >
      <SheetDemo />
    </DocsPage>
  );
}

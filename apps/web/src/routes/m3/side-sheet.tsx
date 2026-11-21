import { DocsPage } from "~/components/preview";
import { SideSheetDemo } from "~/demos/m3/side-sheet";
import source from "~/demos/m3/side-sheet.tsx?raw";

const snippet = `import { SideSheet, SideSheetActions, SideSheetBody, SideSheetClose, SideSheetContent, SideSheetHeader, SideSheetOverlay, SideSheetTitle, SideSheetTrigger, buttonVariants } from "@solidx/kit/m3";

<SideSheet>
  <SideSheetTrigger class={buttonVariants()}>Filters</SideSheetTrigger>
  <SideSheetOverlay />
  <SideSheetContent side="end">
    <SideSheetHeader>
      <SideSheetTitle>Filters</SideSheetTitle>
      <SideSheetClose />
    </SideSheetHeader>
    <SideSheetBody>...</SideSheetBody>
    <SideSheetActions><Button>Apply</Button></SideSheetActions>
  </SideSheetContent>
</SideSheet>`;

export default function SideSheetPage() {
  return (
    <DocsPage
      title="Side sheet"
      description="A modal sheet anchored to the side of the screen."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/side-sheet.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SideSheetDemo />
    </DocsPage>
  );
}

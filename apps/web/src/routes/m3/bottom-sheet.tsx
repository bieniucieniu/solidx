import { DocsPage } from "~/components/preview";
import { BottomSheetDemo } from "~/demos/m3/bottom-sheet";
import source from "~/demos/m3/bottom-sheet.tsx?raw";

const snippet = `import { BottomSheet, BottomSheetBody, BottomSheetContent, BottomSheetDragHandle, BottomSheetOverlay, BottomSheetTitle, BottomSheetTrigger, buttonVariants } from "@solidx/kit/m3";

<BottomSheet>
  <BottomSheetTrigger class={buttonVariants()}>Share</BottomSheetTrigger>
  <BottomSheetOverlay />
  <BottomSheetContent>
    <BottomSheetDragHandle />
    <BottomSheetTitle>Share</BottomSheetTitle>
    <BottomSheetBody>{/* scrolls when it outgrows the sheet */}</BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>`;

export default function BottomSheetPage() {
  return (
    <DocsPage
      title="Bottom sheet"
      description="A modal sheet anchored to the bottom of the screen."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/bottom-sheet.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <BottomSheetDemo />
    </DocsPage>
  );
}

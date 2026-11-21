import { DocsPage } from "~/components/preview";
import { SegmentedButtonDemo } from "~/demos/m3/segmented-button";
import source from "~/demos/m3/segmented-button.tsx?raw";

const snippet = `import { SegmentedButton, SegmentedButtonIcon, SegmentedButtonItem } from "@solidx/kit/m3";

// The value is the array of selected segments. Pass \`multiple\` to select several.
<SegmentedButton value={size()} onValueChange={(next) => setSize(next)}>
  <SegmentedButtonItem value="s">Small</SegmentedButtonItem>
  <SegmentedButtonItem value="m">
    <SegmentedButtonIcon><StarIcon /></SegmentedButtonIcon>
    Medium
  </SegmentedButtonItem>
</SegmentedButton>`;

export default function SegmentedButtonPage() {
  return (
    <DocsPage
      title="Segmented button"
      description="Select one or several options in an outlined row."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/segmented-button.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SegmentedButtonDemo />
    </DocsPage>
  );
}

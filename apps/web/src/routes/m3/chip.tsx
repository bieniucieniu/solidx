import { DocsPage } from "~/components/preview";
import { ChipDemo } from "~/demos/m3/chip";
import source from "~/demos/m3/chip.tsx?raw";

const snippet = `import { AssistChip, ChipSet, FilterChip, InputChip, InputChipRemove, SuggestionChip } from "@solidx/kit/m3";

<ChipSet>
  <AssistChip><StarIcon />Add to favorites</AssistChip>
  <FilterChip defaultPressed>Vegetarian</FilterChip>
  <InputChip>Ada<InputChipRemove aria-label="Remove Ada" /></InputChip>
  <SuggestionChip>On my way</SuggestionChip>
</ChipSet>`;

export default function ChipPage() {
  return (
    <DocsPage
      title="Chips"
      description="Assist, filter, input, and suggestion chips."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/chip.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <ChipDemo />
    </DocsPage>
  );
}

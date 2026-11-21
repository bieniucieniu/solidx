import { DocsPage } from "~/components/preview";
import { RadioGroupDemo } from "~/demos/m3/radio-group";
import source from "~/demos/m3/radio-group.tsx?raw";

const snippet = `import { RadioGroup, RadioGroupItem, RadioGroupItemControl, RadioGroupItemIndicator, RadioGroupItemLabel, RadioGroupLabel } from "@solidx/kit/m3";

<RadioGroup defaultValue="vibrate">
  <RadioGroupLabel>Sound</RadioGroupLabel>
  <RadioGroupItem value="vibrate">
    <RadioGroupItemControl><RadioGroupItemIndicator /></RadioGroupItemControl>
    <RadioGroupItemLabel>Vibrate</RadioGroupItemLabel>
  </RadioGroupItem>
</RadioGroup>`;

export default function RadioGroupPage() {
  return (
    <DocsPage
      title="Radio group"
      description="Select one option from a set."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/radio-group.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <RadioGroupDemo />
    </DocsPage>
  );
}

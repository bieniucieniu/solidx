import { DocsPage } from "~/components/preview";
import { RadioGroupDemo } from "~/demos/ui/radio-group";
import source from "~/demos/ui/radio-group.tsx?raw";

const snippet = `import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "@solidx/kit/ui";

<RadioGroup aria-label="Fruit" value={fruit()} onValueChange={(next) => setFruit(next)}>
  <RadioGroupItemLabel>
    <RadioGroupItem value="apple" />
    Apple
  </RadioGroupItemLabel>
  <RadioGroupItemLabel>
    <RadioGroupItem value="pear" />
    Pear
  </RadioGroupItemLabel>
</RadioGroup>`;

export default function RadioGroupPage() {
  return (
    <DocsPage
      title="Radio group"
      description="One choice from a list."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/radio-group.tsx"
    >
      <RadioGroupDemo />
    </DocsPage>
  );
}

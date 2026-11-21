import { DocsPage } from "~/components/preview";
import { SelectDemo } from "~/demos/ui/select";
import source from "~/demos/ui/select.tsx?raw";

const snippet = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@solidx/kit/ui";

<Select value={fruit()} onValueChange={(next) => setFruit(next)} placeholder="Pick a fruit">
  <SelectLabel>Fruit</SelectLabel>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Apple">Apple</SelectItem>
    <SelectItem value="Banana">Banana</SelectItem>
  </SelectContent>
</Select>`;

export default function SelectPage() {
  return (
    <DocsPage
      title="Select"
      description="A list of options in a popup."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/select.tsx"
    >
      <SelectDemo />
    </DocsPage>
  );
}

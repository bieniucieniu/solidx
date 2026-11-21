import { DocsPage } from "~/components/preview";
import { ComboboxDemo } from "~/demos/ui/combobox";
import source from "~/demos/ui/combobox.tsx?raw";

const snippet = `import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxTrigger,
} from "@solidx/kit/ui";

<Combobox value={value()} onValueChange={(next) => setValue(next)}>
  <ComboboxLabel>Fruit</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="Search fruit" />
    <ComboboxTrigger />
  </ComboboxControl>
  <ComboboxContent>
    <ComboboxListbox>
      <ComboboxItem value="Apple">Apple</ComboboxItem>
      <ComboboxItem value="Banana">Banana</ComboboxItem>
    </ComboboxListbox>
    <ComboboxEmpty>No fruit found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`;

export default function ComboboxPage() {
  return (
    <DocsPage
      title="Combobox"
      description="A text field with a filtered list."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/combobox.tsx"
    >
      <ComboboxDemo />
    </DocsPage>
  );
}

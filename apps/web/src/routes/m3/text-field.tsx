import { DocsPage } from "~/components/preview";
import { TextFieldDemo } from "~/demos/m3/text-field";
import source from "~/demos/m3/text-field.tsx?raw";

const snippet = `import { TextField, TextFieldContainer, TextFieldDescription, TextFieldInput, TextFieldLabel } from "@solidx/kit/m3";

// variant: "filled" | "outlined". Pass \`invalid\` or \`disabled\` on TextField; the value goes on
// TextFieldInput.
<TextField variant="outlined">
  <TextFieldContainer>
    <TextFieldLabel>Name</TextFieldLabel>
    <TextFieldInput value={name()} onValueChange={(next) => setName(next)} />
  </TextFieldContainer>
  <TextFieldDescription>As it appears on your ID</TextFieldDescription>
</TextField>`;

export default function TextFieldPage() {
  return (
    <DocsPage
      title="Text field"
      description="Filled and outlined text fields with a floating label."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/text-field.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <TextFieldDemo />
    </DocsPage>
  );
}

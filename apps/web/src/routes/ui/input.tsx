import { DocsPage } from "~/components/preview";
import { InputDemo } from "~/demos/ui/input";
import source from "~/demos/ui/input.tsx?raw";

const snippet = `import { Input, InputControl, InputDescription, InputLabel } from "@solidx/kit/ui";

// Input is the field: pass \`disabled\` or \`invalid\` here. The value goes on InputControl.
<Input>
  <InputLabel>Email</InputLabel>
  <InputControl type="email" value={value()} onValueChange={(next) => setValue(next)} />
  <InputDescription>Used to sign in.</InputDescription>
</Input>`;

export default function InputPage() {
  return (
    <DocsPage
      title="Input"
      description="A labeled text field."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/input.tsx"
    >
      <InputDemo />
    </DocsPage>
  );
}

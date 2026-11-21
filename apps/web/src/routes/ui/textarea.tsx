import { DocsPage } from "~/components/preview";
import { TextareaDemo } from "~/demos/ui/textarea";
import source from "~/demos/ui/textarea.tsx?raw";

const snippet = `import { Textarea, TextareaControl, TextareaDescription, TextareaLabel } from "@solidx/kit/ui";

<Textarea>
  <TextareaLabel>Bio</TextareaLabel>
  <TextareaControl value={value()} onValueChange={(next) => setValue(next)} />
  <TextareaDescription>Shown on your profile.</TextareaDescription>
</Textarea>`;

export default function TextareaPage() {
  return (
    <DocsPage
      title="Textarea"
      description="A labeled multiline field."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/textarea.tsx"
    >
      <TextareaDemo />
    </DocsPage>
  );
}

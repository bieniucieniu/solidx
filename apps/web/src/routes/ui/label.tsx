import { DocsPage } from "~/components/preview";
import { LabelDemo } from "~/demos/ui/label";
import source from "~/demos/ui/label.tsx?raw";

const snippet = `import { Label } from "@solidx/kit/ui";

<Label for="name">Name</Label>`;

export default function LabelPage() {
  return (
    <DocsPage
      title="Label"
      description="A caption for a form control."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/label.tsx"
    >
      <LabelDemo />
    </DocsPage>
  );
}

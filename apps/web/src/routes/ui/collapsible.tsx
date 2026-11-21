import { DocsPage } from "~/components/preview";
import { CollapsibleDemo } from "~/demos/ui/collapsible";
import source from "~/demos/ui/collapsible.tsx?raw";

const snippet = `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@solidx/kit/ui";

<Collapsible>
  <CollapsibleTrigger>Show notes</CollapsibleTrigger>
  <CollapsibleContent>Notes stay hidden until you open them.</CollapsibleContent>
</Collapsible>`;

export default function CollapsiblePage() {
  return (
    <DocsPage
      title="Collapsible"
      description="A single section that opens and closes."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/collapsible.tsx"
    >
      <CollapsibleDemo />
    </DocsPage>
  );
}

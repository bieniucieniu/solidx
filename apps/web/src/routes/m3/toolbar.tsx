import { DocsPage } from "~/components/preview";
import { ToolbarDemo } from "~/demos/m3/toolbar";
import source from "~/demos/m3/toolbar.tsx?raw";

const snippet = `import { Toolbar } from "@solidx/kit/m3";

// variant: "docked" | "floating"; color: "standard" | "vibrant"
<Toolbar variant="floating" color="vibrant">
  <IconButton aria-label="Edit"><EditIcon /></IconButton>
  <IconButton aria-label="Share"><ShareIcon /></IconButton>
</Toolbar>`;

export default function ToolbarPage() {
  return (
    <DocsPage
      title="Toolbar"
      description="Docked and floating toolbars for frequent actions."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/toolbar.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <ToolbarDemo />
    </DocsPage>
  );
}

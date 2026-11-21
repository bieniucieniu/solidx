import { DocsPage } from "~/components/preview";
import { SeparatorDemo } from "~/demos/ui/separator";
import source from "~/demos/ui/separator.tsx?raw";

const snippet = `import { Separator } from "@solidx/kit/ui";

// orientation: "horizontal" | "vertical"
<Separator />
<div class="flex h-5 items-center gap-3">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
</div>`;

export default function SeparatorPage() {
  return (
    <DocsPage
      title="Separator"
      description="A line between sections."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/separator.tsx"
    >
      <SeparatorDemo />
    </DocsPage>
  );
}

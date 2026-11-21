import { DocsPage } from "~/components/preview";
import { DividerDemo } from "~/demos/m3/divider";
import source from "~/demos/m3/divider.tsx?raw";

const snippet = `import { Divider } from "@solidx/kit/m3";

// inset: "none" | "start" | "middle"
<Divider inset="middle" />
<Divider orientation="vertical" />`;

export default function DividerPage() {
  return (
    <DocsPage
      title="Divider"
      description="A thin line between groups of content."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/divider.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <DividerDemo />
    </DocsPage>
  );
}

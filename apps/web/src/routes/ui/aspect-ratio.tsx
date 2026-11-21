import { DocsPage } from "~/components/preview";
import { AspectRatioDemo } from "~/demos/ui/aspect-ratio";
import source from "~/demos/ui/aspect-ratio.tsx?raw";

const snippet = `import { AspectRatio } from "@solidx/kit/ui";

<AspectRatio ratio="16 / 9">16 / 9</AspectRatio>`;

export default function AspectRatioPage() {
  return (
    <DocsPage
      title="Aspect ratio"
      description="A box that keeps a width to height ratio."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/aspect-ratio.tsx"
    >
      <AspectRatioDemo />
    </DocsPage>
  );
}

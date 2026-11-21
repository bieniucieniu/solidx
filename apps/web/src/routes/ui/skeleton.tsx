import { DocsPage } from "~/components/preview";
import { SkeletonDemo } from "~/demos/ui/skeleton";
import source from "~/demos/ui/skeleton.tsx?raw";

const snippet = `import { Skeleton } from "@solidx/kit/ui";

<Skeleton visible class="h-8 w-48">
  Loaded text
</Skeleton>`;

export default function SkeletonPage() {
  return (
    <DocsPage
      title="Skeleton"
      description="A placeholder while content loads."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/skeleton.tsx"
    >
      <SkeletonDemo />
    </DocsPage>
  );
}

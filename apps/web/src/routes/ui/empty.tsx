import { DocsPage } from "~/components/preview";
import { EmptyDemo } from "~/demos/ui/empty";
import source from "~/demos/ui/empty.tsx?raw";

const snippet = `import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@solidx/kit/ui";

<Empty>
  <EmptyHeader>
    <EmptyTitle>No files</EmptyTitle>
    <EmptyDescription>Upload one to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Upload</Button>
  </EmptyContent>
</Empty>`;

export default function EmptyPage() {
  return (
    <DocsPage
      title="Empty"
      description="A placeholder when there is nothing to show."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/empty.tsx"
    >
      <EmptyDemo />
    </DocsPage>
  );
}

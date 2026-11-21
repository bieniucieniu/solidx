import { DocsPage } from "~/components/preview";
import { ScrollAreaDemo } from "~/demos/ui/scroll-area";
import source from "~/demos/ui/scroll-area.tsx?raw";

const snippet = `import { ScrollArea } from "@solidx/kit/ui";

<ScrollArea class="h-24">
  <p>Line one of a long note.</p>
  <p>Line two of a long note.</p>
</ScrollArea>`;

export default function ScrollAreaPage() {
  return (
    <DocsPage
      title="Scroll area"
      description="A box that scrolls its content."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/scroll-area.tsx"
    >
      <ScrollAreaDemo />
    </DocsPage>
  );
}

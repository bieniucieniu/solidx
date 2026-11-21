import { DocsPage } from "~/components/preview";
import { ScrollAreaDemo } from "~/demos/m3/scroll-area";
import source from "~/demos/m3/scroll-area.tsx?raw";

const snippet = `import { ScrollArea } from "@solidx/kit/m3";

<ScrollArea class="h-72">
  <List>...</List>
</ScrollArea>`;

export default function ScrollAreaPage() {
  return (
    <DocsPage
      title="Scroll area"
      description="A box that scrolls its content, with a thin outline-colored scrollbar."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/scroll-area.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <ScrollAreaDemo />
    </DocsPage>
  );
}

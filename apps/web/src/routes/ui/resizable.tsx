import { DocsPage } from "~/components/preview";
import { ResizableDemo } from "~/demos/ui/resizable";
import source from "~/demos/ui/resizable.tsx?raw";

const snippet = `import { Resizable, ResizableHandle, ResizablePanel } from "@solidx/kit/ui";

// Sizes are percentages of the space the panels share.
<Resizable class="h-64 rounded-lg border">
  <ResizablePanel defaultSize={40} minSize={15}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>
    <Resizable orientation="vertical">
      <ResizablePanel>Top</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Bottom</ResizablePanel>
    </Resizable>
  </ResizablePanel>
</Resizable>`;

export default function ResizablePage() {
  return (
    <DocsPage
      title="Resizable"
      description="Panel groups resized by dragging or with the keyboard."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/resizable.tsx"
    >
      <ResizableDemo />
    </DocsPage>
  );
}

import { Resizable, ResizableHandle, ResizablePanel } from "@solidx/kit/ui";

export function ResizableDemo() {
  return (
    <Resizable class="h-64 max-w-md rounded-lg border border-border">
      <ResizablePanel defaultSize={40} minSize={15}>
        <div class="flex h-full items-center justify-center text-xs">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <Resizable orientation="vertical">
          <ResizablePanel defaultSize={50}>
            <div class="flex h-full items-center justify-center text-xs">Top</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div class="flex h-full items-center justify-center text-xs">Bottom</div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  );
}

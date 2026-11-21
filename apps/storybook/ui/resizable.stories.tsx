import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Resizable, ResizableHandle, ResizablePanel } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Resizable",
  component: Resizable,
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Resizable class="h-48 max-w-md rounded-lg border border-border">
      <ResizablePanel initialSize={0.5} minSize={0.2}>
        <div class="flex h-full items-center justify-center text-xs">One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel initialSize={0.5} minSize={0.2}>
        <div class="flex h-full items-center justify-center text-xs">Two</div>
      </ResizablePanel>
    </Resizable>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Resizable orientation="vertical" class="h-64 max-w-md rounded-lg border border-border">
      <ResizablePanel initialSize={0.3}>
        <div class="flex h-full items-center justify-center text-xs">Header</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.7}>
        <div class="flex h-full items-center justify-center text-xs">Content</div>
      </ResizablePanel>
    </Resizable>
  ),
};

export const Nested: Story = {
  render: () => (
    <Resizable class="h-64 max-w-md rounded-lg border border-border">
      <ResizablePanel initialSize={0.4} minSize={0.15} collapsible>
        <div class="flex h-full items-center justify-center text-xs">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.6}>
        <Resizable orientation="vertical">
          <ResizablePanel initialSize={0.5}>
            <div class="flex h-full items-center justify-center text-xs">Top</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel initialSize={0.5}>
            <div class="flex h-full items-center justify-center text-xs">Bottom</div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  ),
};

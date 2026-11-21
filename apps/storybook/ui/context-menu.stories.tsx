import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuTrigger,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/ContextMenu",
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ContextMenuDemo />,
};

function ContextMenuDemo() {
  const [action, setAction] = createSignal("None");

  return (
    <div class="flex flex-col items-start gap-3">
      <ContextMenu>
        <ContextMenuTrigger class="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
          Right click
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => setAction("Back")}>Back</ContextMenuItem>
            <ContextMenuItem onSelect={() => setAction("Forward")}>Forward</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenu>
      <p class="text-xs text-muted-foreground">Action: {action()}</p>
    </div>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DropdownMenuDemo />,
};

function DropdownMenuDemo() {
  const [action, setAction] = createSignal("None");

  return (
    <div class="flex flex-col items-start gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger as={Button}>Open</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setAction("Edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAction("Duplicate")}>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => setAction("Delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <p class="text-sm text-muted-foreground">Action: {action()}</p>
    </div>
  );
}

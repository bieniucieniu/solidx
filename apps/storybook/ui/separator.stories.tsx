import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Separator } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SeparatorDemo />,
};

function SeparatorDemo() {
  return (
    <div class="flex max-w-xs flex-col gap-3 text-sm text-foreground">
      <span>Above</span>
      <Separator />
      <span>Below</span>
    </div>
  );
}

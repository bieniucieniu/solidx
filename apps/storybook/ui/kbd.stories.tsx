import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Kbd } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Kbd",
  component: Kbd,
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <KbdDemo />,
};

function KbdDemo() {
  return (
    <p class="flex items-center gap-1 text-sm text-foreground">
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
    </p>
  );
}

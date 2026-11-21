import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ScrollArea } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ScrollAreaDemo />,
};

function ScrollAreaDemo() {
  return (
    <ScrollArea class="h-24 max-w-xs rounded-lg border border-border p-2 text-xs text-foreground">
      <p>Line one of a long note.</p>
      <p>Line two of a long note.</p>
      <p>Line three of a long note.</p>
      <p>Line four of a long note.</p>
      <p>Line five of a long note.</p>
      <p>Line six of a long note.</p>
    </ScrollArea>
  );
}

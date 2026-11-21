import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { AspectRatio } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AspectRatioDemo />,
};

function AspectRatioDemo() {
  return (
    <AspectRatio
      ratio="16 / 9"
      class="flex items-center justify-center bg-muted text-sm text-muted-foreground"
    >
      16 / 9
    </AspectRatio>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Skeleton } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SkeletonDemo />,
};

function SkeletonDemo() {
  return (
    <Skeleton visible class="h-8 w-48">
      Loaded text
    </Skeleton>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { MotionConfig, motion } from "@solidx/kit-1.9/motion";

const meta = {
  title: "Motion/Hover",
  component: motion.div,
} satisfies Meta<typeof motion.div>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HoverDemo />,
};

function HoverDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <motion.div class="size-16 rounded-lg bg-primary" whileHover={{ scale: 1.15 }} />
    </MotionConfig>
  );
}

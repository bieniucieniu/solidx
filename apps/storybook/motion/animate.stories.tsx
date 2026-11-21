import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { MotionConfig, motion } from "@solidx/kit-1.9/motion";

const meta = {
  title: "Motion/Animate",
  component: motion.div,
} satisfies Meta<typeof motion.div>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AnimateDemo />,
};

function AnimateDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="h-16 w-40">
        <motion.div class="size-16 rounded-lg bg-primary" animate={{ x: 80 }} />
      </div>
    </MotionConfig>
  );
}

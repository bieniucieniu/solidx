import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { MotionConfig, motion } from "@solidx/kit-1.9/motion";

const meta = {
  title: "Motion/Drag",
  component: motion.div,
} satisfies Meta<typeof motion.div>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DragDemo />,
};

function DragDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <motion.div
        class="size-16 rounded-lg bg-foreground"
        drag="x"
        dragConstraints={{ left: 0, right: 160 }}
      />
    </MotionConfig>
  );
}

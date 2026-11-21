import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { MotionConfig, motion, useMotionValue, useSpring } from "@solidx/kit-1.9/motion";
import { Button } from "@solidx/kit-1.9/ui";

const meta = {
  title: "Motion/Spring",
  component: motion.div,
} satisfies Meta<typeof motion.div>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SpringDemo />,
};

function SpringDemo() {
  const x = useMotionValue(0);
  const springX = useSpring(x, () => ({ stiffness: 220, damping: 18 }));

  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="flex items-center gap-4">
        <Button type="button" onClick={() => x.set(x.get() > 40 ? 0 : 120)}>
          Spring
        </Button>
        <motion.div class="size-16 rounded-lg bg-primary" style={{ x: springX }} />
      </div>
    </MotionConfig>
  );
}

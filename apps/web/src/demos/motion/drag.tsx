import { MotionConfig, motion } from "@solidx/kit/motion";

export default function DragDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <motion.div
        class="size-16 rounded-large bg-tertiary"
        drag="x"
        dragConstraints={{ left: 0, right: 160 }}
      />
    </MotionConfig>
  );
}

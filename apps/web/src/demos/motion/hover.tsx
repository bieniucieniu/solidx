import { MotionConfig, motion } from "@solidx/kit/motion";

export default function HoverDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <motion.div class="size-16 rounded-large bg-primary" whileHover={{ scale: 1.15 }} />
    </MotionConfig>
  );
}

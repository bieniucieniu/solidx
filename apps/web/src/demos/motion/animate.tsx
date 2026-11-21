import { MotionConfig, motion } from "@solidx/kit/motion";

export default function AnimateDemo() {
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="h-16 w-40">
        <motion.div class="size-16 rounded-large bg-primary" animate={{ x: 80 }} />
      </div>
    </MotionConfig>
  );
}

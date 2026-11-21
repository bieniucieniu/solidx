import { AnimatePresence, MotionConfig, motion } from "@solidx/kit/motion";
import { Button } from "@solidx/kit/m3";
import { createSignal } from "solid-js";

export default function PresenceDemo() {
  const [open, setOpen] = createSignal(true);

  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="flex flex-wrap items-center gap-4">
        <Button onClick={() => setOpen((value) => !value)}>Toggle</Button>
        <AnimatePresence when={open}>
          <motion.div
            class="rounded-large bg-secondary-container px-4 py-3 typescale-body-medium text-on-secondary-container"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            Panel
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

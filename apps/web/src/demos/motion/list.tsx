import { AnimatePresence, MotionConfig, motion } from "@solidx/kit/motion";
import { Button } from "@solidx/kit/m3";
import { createSignal } from "solid-js";

interface Item {
  id: number;
  name: string;
}

export default function ListDemo() {
  const [items, setItems] = createSignal<Item[]>([
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
  ]);

  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              setItems((list) => [...list, { id: Date.now(), name: `Item ${list.length + 1}` }])
            }
          >
            Add
          </Button>
          <Button variant="outlined" onClick={() => setItems((list) => list.slice(0, -1))}>
            Remove
          </Button>
        </div>
        <div class="flex flex-col gap-2">
          <AnimatePresence each={items} by={(item) => item.id}>
            {(item) => (
              <motion.div
                class="rounded-medium bg-surface-container-high px-4 py-3 typescale-body-medium text-on-surface"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {item.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

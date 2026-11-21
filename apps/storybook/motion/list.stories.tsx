import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { AnimatePresence, MotionConfig, motion } from "@solidx/kit-1.9/motion";
import { Button } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "Motion/List",
  component: AnimatePresence,
} satisfies Meta<typeof AnimatePresence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ListDemo />,
};

interface Item {
  id: number;
  name: string;
}

function ListDemo() {
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
            type="button"
            onClick={() =>
              setItems((list) => [...list, { id: Date.now(), name: `Item ${list.length + 1}` }])
            }
          >
            Add
          </Button>
          <Button type="button" onClick={() => setItems((list) => list.slice(0, -1))}>
            Remove
          </Button>
        </div>
        <div class="flex flex-col gap-2">
          <AnimatePresence each={items} by={(item) => item.id}>
            {(item) => (
              <motion.div
                class="rounded-lg bg-muted px-3 py-2 text-sm text-foreground"
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

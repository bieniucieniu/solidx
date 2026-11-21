import { AnimatePresence, MotionConfig, motion } from "@solidx/kit/motion";
import { Tiptap, TiptapContent, useEditor, useTiptapState } from "@solidx/kit/tiptap";
import { Button } from "@solidx/kit/ui";
import { Flow, Position, createFlow } from "@solidx/kit/xyflow";
import { Background, Controls } from "@solidx/kit/xyflow/panels";
import StarterKit from "@tiptap/starter-kit";
import { createSignal } from "solid-js";

export function MotionPage() {
  const [open, setOpen] = createSignal(true);
  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <div class="flex flex-col gap-6">
        <div class="h-16 w-60">
          <motion.div
            data-testid="motion-box"
            class="size-16 rounded-lg bg-primary"
            animate={{ x: 120 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <Button variant="outline" class="w-fit" onClick={() => setOpen((value) => !value)}>
          Toggle presence
        </Button>
        <div class="h-16">
          <AnimatePresence when={open}>
            <motion.div
              class="size-16 rounded-full bg-secondary-foreground"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

export function XyflowPage() {
  const flow = createFlow(() => ({
    nodes: [
      {
        id: "start",
        type: "input",
        position: { x: 0, y: 80 },
        sourcePosition: Position.Right,
        data: { label: "Order placed" },
      },
      {
        id: "pay",
        position: { x: 220, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: { label: "Take payment" },
      },
      {
        id: "ship",
        type: "output",
        position: { x: 440, y: 80 },
        targetPosition: Position.Left,
        data: { label: "Shipped" },
      },
    ],
    edges: [
      { id: "start-pay", source: "start", target: "pay", animated: true },
      { id: "pay-ship", source: "pay", target: "ship" },
    ],
    fitView: true,
  }));
  return (
    <div class="h-96 rounded-lg border">
      <Flow flow={flow}>
        <Background />
        <Controls />
      </Flow>
    </div>
  );
}

function WordCount() {
  const words = useTiptapState({
    selector: ({ editor }) => editor?.getText().split(/\s+/).filter(Boolean).length ?? 0,
  });
  return <p class="px-4 pb-2 text-xs text-muted-foreground">{words()} words</p>;
}

export function TiptapPage() {
  const editor = useEditor(() => ({
    extensions: [StarterKit],
    content: "<h2>Tiptap on Solid 2</h2><p>Type here to see the word count follow.</p>",
  }));
  return (
    <div class="rounded-lg border">
      <Tiptap editor={editor}>
        <TiptapContent />
        <WordCount />
      </Tiptap>
    </div>
  );
}

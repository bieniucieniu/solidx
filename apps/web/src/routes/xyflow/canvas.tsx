import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/xyflow/canvas.tsx?raw";

const CanvasDemo = clientOnly(() => import("~/demos/xyflow/canvas"));

const snippet = `import { Flow, Position, createFlow } from "@solidx/kit/xyflow";
import { Background, Controls } from "@solidx/kit/xyflow/panels";
import "@solidx/kit/xyflow/style.css";

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
      id: "ship",
      type: "output",
      position: { x: 240, y: 80 },
      targetPosition: Position.Left,
      data: { label: "Shipped" },
    },
  ],
  edges: [{ id: "start-ship", source: "start", target: "ship", animated: true }],
  fitView: true,
}));

<Flow flow={flow}>
  <Background />
  <Controls />
</Flow>`;

export default function CanvasPage() {
  return (
    <DocsPage
      title="Canvas"
      description="Built-in input, default, and output nodes with an animated edge."
      snippet={snippet}
      source={source}
      sourceTitle="demos/xyflow/canvas.tsx"
      previewClass="p-0"
    >
      <CanvasDemo fallback={<div class="h-96" />} />
    </DocsPage>
  );
}

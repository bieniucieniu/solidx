import { Flow, Position, createFlow } from "@solidx/kit/xyflow";
import { Background, Controls } from "@solidx/kit/xyflow/panels";
import "@solidx/kit/xyflow/style.css";

export default function CanvasDemo() {
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
        id: "pack",
        position: { x: 220, y: 160 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: { label: "Pack items" },
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
      { id: "start-pack", source: "start", target: "pack" },
      { id: "pay-ship", source: "pay", target: "ship" },
      { id: "pack-ship", source: "pack", target: "ship" },
    ],
    fitView: true,
  }));

  return (
    <div class="h-96">
      <Flow flow={flow}>
        <Background />
        <Controls />
      </Flow>
    </div>
  );
}

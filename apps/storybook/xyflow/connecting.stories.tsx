import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button, ButtonGroup, ButtonGroupText } from "@solidx/kit-1.9/ui";
import { Flow, Position, createFlow, type FlowEdge, type FlowNode } from "@solidx/kit-1.9/xyflow";
import { Background, Controls } from "@solidx/kit-1.9/xyflow/panels";
import { createSignal } from "solid-js";
import "@solidx/kit-1.9/xyflow/style.css";

const meta = {
  title: "Xyflow/Connecting",
  component: Flow,
} as Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ConnectingDemo />,
};

const side = { sourcePosition: Position.Right, targetPosition: Position.Left };

const initialNodes: FlowNode[] = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "Source A" }, ...side },
  { id: "b", type: "input", position: { x: 0, y: 120 }, data: { label: "Source B" }, ...side },
  { id: "c", position: { x: 240, y: 60 }, data: { label: "Merge" }, ...side },
  { id: "d", type: "output", position: { x: 480, y: 60 }, data: { label: "Sink" }, ...side },
];

const initialEdges: FlowEdge[] = [{ id: "a-c", source: "a", target: "c" }];

function ConnectingDemo() {
  const [last, setLast] = createSignal("Drag from a handle to another node.");
  let count = 0;

  const flow = createFlow(() => ({
    nodes: initialNodes,
    edges: initialEdges,
    fitView: true,
    // The store already adds the edge; this only reports it.
    onConnect: (connection) => setLast(`Connected ${connection.source} → ${connection.target}`),
  }));

  const addNode = () => {
    count += 1;
    const id = `n${count}`;
    flow.setNodes([
      ...flow.nodes,
      {
        id,
        position: { x: 240, y: 160 + count * 70 },
        data: { label: `Step ${count}` },
        ...side,
      },
    ]);
    setLast(`Added ${id}. Connect it to the graph.`);
    void flow.fitView();
  };

  const reset = () => {
    count = 0;
    // Keep the existing node objects so their measured size survives; only move them back.
    const start = new Map(initialNodes.map((node) => [node.id, node.position]));
    flow.setNodes(
      flow.nodes
        .filter((node) => start.has(node.id))
        .map((node) => ({ ...node, position: { ...(start.get(node.id) ?? node.position) } })),
    );
    flow.setEdges(initialEdges.map((edge) => ({ ...edge })));
    setLast("Reset to the starting graph.");
    void flow.fitView();
  };

  return (
    <div class="flex flex-col">
      <div class="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <ButtonGroup>
          <Button variant="outline" onClick={addNode}>
            Add node
          </Button>
          <Button variant="outline" onClick={() => void flow.fitView()}>
            Fit view
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText>
            {flow.nodes.length} nodes · {flow.edges.length} edges
          </ButtonGroupText>
        </ButtonGroup>
        <p class="text-xs text-muted-foreground" aria-live="polite">
          {last()}
        </p>
      </div>
      <div class="h-96">
        <Flow flow={flow}>
          <Background />
          <Controls />
        </Flow>
      </div>
    </div>
  );
}

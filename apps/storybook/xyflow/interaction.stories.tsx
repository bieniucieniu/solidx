import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb } from "@solidx/kit-1.9/ui";
import { Flow, Position, createFlow, type FlowEdge, type FlowNode } from "@solidx/kit-1.9/xyflow";
import { Background, Controls } from "@solidx/kit-1.9/xyflow/panels";
import { type Accessor, For, createSignal, type Setter } from "solid-js";
import "@solidx/kit-1.9/xyflow/style.css";

const meta = {
  title: "Xyflow/Interaction",
  component: Flow,
} as Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InteractionDemo />,
};

const side = { sourcePosition: Position.Right, targetPosition: Position.Left };

// Defined once: a new array in the options accessor would replace the graph on every change.
const nodes: FlowNode[] = [
  { id: "1", type: "input", position: { x: 0, y: 0 }, data: { label: "Drag me" }, ...side },
  { id: "2", position: { x: 220, y: -60 }, data: { label: "Connect me" }, ...side },
  { id: "3", position: { x: 220, y: 60 }, data: { label: "Select me" }, ...side },
  { id: "4", type: "output", position: { x: 440, y: 0 }, data: { label: "Snap me" }, ...side },
];

const edges: FlowEdge[] = [
  { id: "1-2", source: "1", target: "2" },
  { id: "1-3", source: "1", target: "3" },
];

function InteractionDemo() {
  const [draggable, setDraggable] = createSignal(true);
  const [connectable, setConnectable] = createSignal(true);
  const [selectable, setSelectable] = createSignal(true);
  const [snap, setSnap] = createSignal(false);

  const flow = createFlow(() => ({
    nodes,
    edges,
    fitView: true,
    nodesDraggable: draggable(),
    nodesConnectable: connectable(),
    elementsSelectable: selectable(),
    snapToGrid: snap(),
    snapGrid: [40, 40],
  }));

  const options: { label: string; value: Accessor<boolean>; set: Setter<boolean> }[] = [
    { label: "Draggable", value: draggable, set: setDraggable },
    { label: "Connectable", value: connectable, set: setConnectable },
    { label: "Selectable", value: selectable, set: setSelectable },
    { label: "Snap to 40px grid", value: snap, set: setSnap },
  ];

  return (
    <div class="flex flex-col">
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-3 py-2.5">
        <For each={options}>
          {(option) => (
            <Switch size="sm" checked={option.value()} onChange={(next) => option.set(next)}>
              <SwitchInput />
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchLabel>{option.label}</SwitchLabel>
            </Switch>
          )}
        </For>
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

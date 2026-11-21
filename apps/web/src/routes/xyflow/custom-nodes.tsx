import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/xyflow/custom-nodes.tsx?raw";

const CustomNodesDemo = clientOnly(() => import("~/demos/xyflow/custom-nodes"));

const snippet = `import { Card, CardHeader, CardTitle, Switch, SwitchControl, SwitchLabel } from "@solidx/kit/m3";
import {
  Handle,
  Position,
  createFlow,
  useFlow,
  type NodeComponentProps,
} from "@solidx/kit/xyflow";

function TaskNode(props: NodeComponentProps) {
  const flow = useFlow();
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>{props.node.data.title as string}</CardTitle>
        </CardHeader>
        {/* \`nodrag\` lets the switch take the pointer instead of starting a node drag. */}
        <Switch class="nodrag">
          <SwitchControl
            checked={props.node.data.done as boolean}
            onCheckedChange={(done) => flow.updateNode(props.node.id, { data: { done } })}
          />
          <SwitchLabel>Complete</SwitchLabel>
        </Switch>
      </Card>
      <Handle id="approved" type="source" position={Position.Right} />
    </>
  );
}

const flow = createFlow(() => ({
  nodes: [
    {
      id: "draft",
      type: "task",
      position: { x: 0, y: 0 },
      data: { title: "Write draft", done: false },
    },
  ],
  nodeTypes: { task: TaskNode },
}));`;

export default function CustomNodesPage() {
  return (
    <DocsPage
      title="Custom nodes"
      description="Nodes built from m3 cards, with named handles and state the node updates itself."
      snippet={snippet}
      source={source}
      sourceTitle="demos/xyflow/custom-nodes.tsx"
      previewClass="p-0"
    >
      <CustomNodesDemo fallback={<div class="h-96" />} />
    </DocsPage>
  );
}

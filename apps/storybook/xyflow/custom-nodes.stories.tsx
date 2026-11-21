import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
  SwitchControl,
  SwitchInput,
  SwitchLabel,
  SwitchThumb,
} from "@solidx/kit-1.9/ui";
import {
  Flow,
  Handle,
  Position,
  createFlow,
  useFlow,
  type NodeComponentProps,
} from "@solidx/kit-1.9/xyflow";
import { Background, Controls } from "@solidx/kit-1.9/xyflow/panels";
import "@solidx/kit-1.9/xyflow/style.css";

const meta = {
  title: "Xyflow/Custom nodes",
  component: Flow,
} as Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CustomNodesDemo />,
};

type TaskData = { title: string; owner: string; done: boolean };
type ReviewData = { title: string };

function TaskNode(props: NodeComponentProps) {
  const flow = useFlow();
  const data = () => props.node.data as TaskData;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card size="sm" class="w-56">
        <CardHeader>
          <CardTitle>{data().title}</CardTitle>
          <CardDescription>{data().owner}</CardDescription>
          <CardAction>
            <Badge variant={data().done ? "default" : "secondary"}>
              {data().done ? "Done" : "Open"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* `nodrag` lets the switch take the pointer instead of starting a node drag. */}
          <Switch
            class="nodrag"
            checked={data().done}
            onChange={(done) => flow.updateNode(props.node.id, { data: { done } })}
          >
            <SwitchInput />
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <SwitchLabel>Complete</SwitchLabel>
          </Switch>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

function ReviewNode(props: NodeComponentProps) {
  const data = () => props.node.data as ReviewData;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card size="sm" class="w-44">
        <CardHeader>
          <CardTitle>{data().title}</CardTitle>
          <CardDescription>Two outcomes</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-2 text-right text-muted-foreground">
          <span>Approved</span>
          <span>Changes</span>
        </CardContent>
      </Card>
      <Handle id="approved" type="source" position={Position.Right} class="top-[62%]!" />
      <Handle id="changes" type="source" position={Position.Right} class="top-[82%]!" />
    </>
  );
}

function CustomNodesDemo() {
  const flow = createFlow(() => ({
    nodes: [
      {
        id: "draft",
        type: "task",
        position: { x: 0, y: 40 },
        data: { title: "Write draft", owner: "Ada", done: true },
      },
      {
        id: "review",
        type: "review",
        position: { x: 300, y: 40 },
        data: { title: "Review" },
      },
      {
        id: "publish",
        type: "task",
        position: { x: 560, y: -40 },
        data: { title: "Publish", owner: "Grace", done: false },
      },
      {
        id: "revise",
        type: "task",
        position: { x: 560, y: 150 },
        data: { title: "Revise", owner: "Ada", done: false },
      },
    ],
    edges: [
      { id: "draft-review", source: "draft", target: "review" },
      {
        id: "review-publish",
        source: "review",
        sourceHandle: "approved",
        target: "publish",
        animated: true,
      },
      { id: "review-revise", source: "review", sourceHandle: "changes", target: "revise" },
    ],
    fitView: true,
    nodeTypes: { task: TaskNode, review: ReviewNode },
  }));

  return (
    <div class="h-[28rem]">
      <Flow flow={flow}>
        <Background />
        <Controls />
      </Flow>
    </div>
  );
}

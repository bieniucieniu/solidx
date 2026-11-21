import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputChip,
  Switch,
  SwitchControl,
  SwitchLabel,
} from "@solidx/kit/m3";
import {
  Flow,
  Handle,
  Position,
  createFlow,
  useFlow,
  type NodeComponentProps,
} from "@solidx/kit/xyflow";
import { Background, Controls } from "@solidx/kit/xyflow/panels";
import "@solidx/kit/xyflow/style.css";

type TaskData = { title: string; owner: string; done: boolean };
type ReviewData = { title: string };

function TaskNode(props: NodeComponentProps) {
  const flow = useFlow();
  const data = () => props.node.data as TaskData;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card variant="outlined" class="w-60">
        <CardHeader>
          <CardTitle>{data().title}</CardTitle>
          <CardDescription>{data().owner}</CardDescription>
          <CardAction>
            <InputChip
              class={
                data().done
                  ? "h-6 border-transparent bg-secondary-container px-2 text-on-secondary-container"
                  : "h-6 px-2"
              }
            >
              {data().done ? "Done" : "Open"}
            </InputChip>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* `nodrag` lets the switch take the pointer instead of starting a node drag. */}
          <Switch class="nodrag">
            <SwitchControl
              checked={data().done}
              onCheckedChange={(done) => flow.updateNode(props.node.id, { data: { done } })}
            />
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
      <Card variant="outlined" class="w-44">
        <CardHeader>
          <CardTitle>{data().title}</CardTitle>
          <CardDescription>Two outcomes</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-2 text-right typescale-body-medium text-on-surface-variant">
          <span>Approved</span>
          <span>Changes</span>
        </CardContent>
      </Card>
      <Handle id="approved" type="source" position={Position.Right} class="top-[62%]!" />
      <Handle id="changes" type="source" position={Position.Right} class="top-[82%]!" />
    </>
  );
}

export default function CustomNodesDemo() {
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

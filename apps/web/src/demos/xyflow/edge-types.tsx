import { InputChip } from "@solidx/kit/m3";
import {
  BaseEdge,
  Flow,
  Position,
  createFlow,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  type EdgeComponentProps,
  type FlowEdge,
  type FlowNode,
} from "@solidx/kit/xyflow";
import { Background, Controls } from "@solidx/kit/xyflow/panels";
import "@solidx/kit/xyflow/style.css";

type PathKind = "bezier" | "straight" | "step" | "smoothstep";

function pathFor(props: EdgeComponentProps, kind: PathKind) {
  const points = {
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition ?? Position.Right,
    targetPosition: props.targetPosition ?? Position.Left,
  };
  if (kind === "straight") return getStraightPath(points);
  if (kind === "step") return getSmoothStepPath({ ...points, borderRadius: 0 });
  if (kind === "smoothstep") return getSmoothStepPath(points);
  return getBezierPath(points);
}

/** An edge that draws its own path and puts a label at the path's midpoint. */
function LabeledEdge(props: EdgeComponentProps) {
  const kind = () => (props.edge.data?.kind as PathKind | undefined) ?? "bezier";
  const geometry = () => pathFor(props, kind());

  return (
    <>
      <BaseEdge path={geometry()[0]} style={props.edge.style} />
      <foreignObject
        x={geometry()[1] - 50}
        y={geometry()[2] - 12}
        width={100}
        height={24}
        class="overflow-visible"
      >
        <div class="flex h-full items-center justify-center">
          <InputChip class="h-6 bg-surface px-2 typescale-label-medium">
            {props.edge.label ?? kind()}
          </InputChip>
        </div>
      </foreignObject>
    </>
  );
}

const kinds: PathKind[] = ["bezier", "straight", "step", "smoothstep"];

const nodes: FlowNode[] = kinds.flatMap((kind, row) => [
  {
    id: `${kind}-from`,
    type: "input",
    position: { x: 0, y: row * 110 },
    sourcePosition: Position.Right,
    data: { label: "From" },
  },
  {
    id: `${kind}-to`,
    type: "output",
    position: { x: 360, y: row * 110 + 50 },
    targetPosition: Position.Left,
    data: { label: "To" },
  },
]);

const edges: FlowEdge[] = kinds.map((kind) => ({
  id: kind,
  type: "labeled",
  source: `${kind}-from`,
  target: `${kind}-to`,
  data: { kind },
  animated: kind === "smoothstep",
}));

export default function EdgeTypesDemo() {
  const flow = createFlow(() => ({
    nodes,
    edges,
    fitView: true,
    edgeTypes: { labeled: LabeledEdge },
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

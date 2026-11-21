import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/xyflow/edge-types.tsx?raw";

const EdgeTypesDemo = clientOnly(() => import("~/demos/xyflow/edge-types"));

const snippet = `import { InputChip } from "@solidx/kit/m3";
import { BaseEdge, createFlow, getBezierPath, type EdgeComponentProps } from "@solidx/kit/xyflow";

function LabeledEdge(props: EdgeComponentProps) {
  const geometry = () => getBezierPath(props);
  return (
    <>
      <BaseEdge path={geometry()[0]} />
      <foreignObject x={geometry()[1] - 50} y={geometry()[2] - 12} width={100} height={24}>
        <InputChip class="h-6 bg-surface px-2">{props.edge.label}</InputChip>
      </foreignObject>
    </>
  );
}

const flow = createFlow(() => ({
  nodes,
  edges: [{ id: "e", type: "labeled", source: "a", target: "b", label: "bezier" }],
  edgeTypes: { labeled: LabeledEdge },
}));`;

export default function EdgeTypesPage() {
  return (
    <DocsPage
      title="Edge types"
      description="A custom edge that draws bezier, straight, step, and smooth step paths with a label."
      snippet={snippet}
      source={source}
      sourceTitle="demos/xyflow/edge-types.tsx"
      previewClass="p-0"
    >
      <EdgeTypesDemo fallback={<div class="h-96" />} />
    </DocsPage>
  );
}

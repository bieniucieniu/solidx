import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/xyflow/connecting.tsx?raw";

const ConnectingDemo = clientOnly(() => import("~/demos/xyflow/connecting"));

const snippet = `import { Button, ButtonGroup } from "@solidx/kit/m3";
import { Flow, createFlow } from "@solidx/kit/xyflow";

const flow = createFlow(() => ({
  nodes: initialNodes,
  edges: initialEdges,
  // The store adds the edge. This callback only hears about it.
  onConnect: (connection) => console.log(connection.source, connection.target),
}));

<ButtonGroup variant="connected">
  <Button variant="tonal" onClick={() => flow.setNodes([...flow.nodes, nextNode()])}>
    Add node
  </Button>
  <Button variant="tonal" onClick={() => void flow.fitView()}>
    Fit view
  </Button>
</ButtonGroup>
<Flow flow={flow} />`;

export default function ConnectingPage() {
  return (
    <DocsPage
      title="Connecting"
      description="Drag between handles to add edges, and change the graph from a toolbar."
      snippet={snippet}
      source={source}
      sourceTitle="demos/xyflow/connecting.tsx"
      previewClass="p-0"
    >
      <ConnectingDemo fallback={<div class="h-96" />} />
    </DocsPage>
  );
}

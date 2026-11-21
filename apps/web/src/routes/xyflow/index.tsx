import { PackageIndex } from "~/components/package-index";
import { sidebars } from "~/nav";

const pages = sidebars.xyflow.slice(1);

export default function XYFlowIndex() {
  return (
    <PackageIndex
      title="XYFlow"
      description="A canvas for nodes and edges. The store owns the graph."
      snippet={'import { Flow, Handle, createFlow } from "@solidx/kit/xyflow";'}
      pages={pages}
    />
  );
}

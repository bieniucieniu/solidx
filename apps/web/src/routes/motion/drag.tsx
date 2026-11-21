import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/motion/drag.tsx?raw";

const DragDemo = clientOnly(() => import("~/demos/motion/drag"));

const snippet = `import { motion } from "@solidx/kit/motion";

<motion.div drag="x" dragConstraints={{ left: 0, right: 160 }} />`;

export default function DragPage() {
  return (
    <DocsPage
      title="Drag"
      description="Drag along the x axis inside constraints."
      snippet={snippet}
      source={source}
      sourceTitle="demos/motion/drag.tsx"
    >
      <DragDemo fallback={<div class="h-16" />} />
    </DocsPage>
  );
}

import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/motion/hover.tsx?raw";

const HoverDemo = clientOnly(() => import("~/demos/motion/hover"));

const snippet = `import { motion } from "@solidx/kit/motion";

<motion.div whileHover={{ scale: 1.15 }} />`;

export default function HoverPage() {
  return (
    <DocsPage
      title="Hover"
      description="Scale while the pointer is over the box."
      snippet={snippet}
      source={source}
      sourceTitle="demos/motion/hover.tsx"
    >
      <HoverDemo fallback={<div class="h-16" />} />
    </DocsPage>
  );
}

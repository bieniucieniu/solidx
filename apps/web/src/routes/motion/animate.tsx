import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/motion/animate.tsx?raw";

const AnimateDemo = clientOnly(() => import("~/demos/motion/animate"));

const snippet = `import { motion } from "@solidx/kit/motion";

<motion.div animate={{ x: 80 }} />`;

export default function AnimatePage() {
  return (
    <DocsPage
      title="Animate"
      description="Move an element to a target."
      snippet={snippet}
      source={source}
      sourceTitle="demos/motion/animate.tsx"
    >
      <AnimateDemo fallback={<div class="h-16" />} />
    </DocsPage>
  );
}

import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/motion/spring.tsx?raw";

const SpringDemo = clientOnly(() => import("~/demos/motion/spring"));

const snippet = `import { motion, useMotionValue, useSpring } from "@solidx/kit/motion";

const x = useMotionValue(0);
const springX = useSpring(x, () => ({ stiffness: 220, damping: 18 }));

<motion.div style={{ x: springX }} />`;

export default function SpringPage() {
  return (
    <DocsPage
      title="Spring"
      description="Spring a motion value toward a target."
      snippet={snippet}
      source={source}
      sourceTitle="demos/motion/spring.tsx"
    >
      <SpringDemo fallback={<div class="h-16" />} />
    </DocsPage>
  );
}

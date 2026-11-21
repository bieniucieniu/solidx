import { PackageIndex } from "~/components/package-index";
import { sidebars } from "~/nav";

const pages = sidebars.motion.slice(1);

export default function MotionIndex() {
  return (
    <PackageIndex
      title="Motion"
      description="Animate, hover, drag, spring, presence, and lists."
      snippet={
        'import { AnimatePresence, motion, useMotionValue, useSpring } from "@solidx/kit/motion";'
      }
      pages={pages}
    />
  );
}

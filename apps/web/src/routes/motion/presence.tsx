import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/motion/presence.tsx?raw";

const PresenceDemo = clientOnly(() => import("~/demos/motion/presence"));

const snippet = `import { AnimatePresence, motion } from "@solidx/kit/motion";

<AnimatePresence when={open}>
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
  />
</AnimatePresence>`;

export default function PresencePage() {
  return (
    <DocsPage
      title="Presence"
      description="Enter and exit when the panel toggles."
      snippet={snippet}
      source={source}
      sourceTitle="demos/motion/presence.tsx"
    >
      <PresenceDemo fallback={<div class="h-16" />} />
    </DocsPage>
  );
}

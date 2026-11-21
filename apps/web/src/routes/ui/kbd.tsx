import { DocsPage } from "~/components/preview";
import { KbdDemo } from "~/demos/ui/kbd";
import source from "~/demos/ui/kbd.tsx?raw";

const snippet = `import { Kbd } from "@solidx/kit/ui";

<p>
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
</p>`;

export default function KbdPage() {
  return (
    <DocsPage
      title="Kbd"
      description="A keyboard key."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/kbd.tsx"
    >
      <KbdDemo />
    </DocsPage>
  );
}

import { DocsPage } from "~/components/preview";
import { ToggleDemo } from "~/demos/ui/toggle";
import source from "~/demos/ui/toggle.tsx?raw";

const snippet = `import { Toggle } from "@solidx/kit/ui";

// variant: "default" | "outline"   size: "sm" | "default" | "lg"
<Toggle variant="outline" size="sm" pressed={pressed()} onPressedChange={(next) => setPressed(next)}>
  Bold
</Toggle>`;

export default function TogglePage() {
  return (
    <DocsPage
      title="Toggle"
      description="A button that stays pressed."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/toggle.tsx"
    >
      <ToggleDemo />
    </DocsPage>
  );
}

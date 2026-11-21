import { DocsPage } from "~/components/preview";
import { SwitchDemo } from "~/demos/ui/switch";
import source from "~/demos/ui/switch.tsx?raw";

const snippet = `import { Switch, SwitchLabel } from "@solidx/kit/ui";

// size: "sm" | "default"
<SwitchLabel>
  <Switch checked={checked()} onCheckedChange={(next) => setChecked(next)} />
  Airplane mode
</SwitchLabel>`;

export default function SwitchPage() {
  return (
    <DocsPage
      title="Switch"
      description="A toggle between on and off."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/switch.tsx"
    >
      <SwitchDemo />
    </DocsPage>
  );
}

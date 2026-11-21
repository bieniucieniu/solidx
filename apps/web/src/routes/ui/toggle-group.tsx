import { DocsPage } from "~/components/preview";
import { ToggleGroupDemo } from "~/demos/ui/toggle-group";
import source from "~/demos/ui/toggle-group.tsx?raw";

const snippet = `import { ToggleGroup, ToggleGroupItem } from "@solidx/kit/ui";

// variant: "default" | "outline"   size: "sm" | "default" | "lg"
// spacing: number (0 joins the items)   orientation: "horizontal" | "vertical"
// The value is the array of pressed items. Pass \`multiple\` to press several.
<ToggleGroup variant="outline" spacing={0} value={value()} onValueChange={(next) => setValue(next)}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;

export default function ToggleGroupPage() {
  return (
    <DocsPage
      title="Toggle group"
      description="A set of toggle buttons."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/toggle-group.tsx"
    >
      <ToggleGroupDemo />
    </DocsPage>
  );
}

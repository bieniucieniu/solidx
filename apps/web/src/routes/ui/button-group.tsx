import { DocsPage } from "~/components/preview";
import { ButtonGroupDemo } from "~/demos/ui/button-group";
import source from "~/demos/ui/button-group.tsx?raw";

const snippet = `import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@solidx/kit/ui";

// orientation: "horizontal" | "vertical"
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>

<ButtonGroup>
  <ButtonGroupText>Zoom</ButtonGroupText>
  <Button variant="secondary">-</Button>
  <ButtonGroupSeparator />
  <Button variant="secondary">+</Button>
</ButtonGroup>`;

export default function ButtonGroupPage() {
  return (
    <DocsPage
      title="Button group"
      description="Buttons placed in a row."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/button-group.tsx"
    >
      <ButtonGroupDemo />
    </DocsPage>
  );
}

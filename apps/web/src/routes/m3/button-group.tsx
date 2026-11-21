import { DocsPage } from "~/components/preview";
import { ButtonGroupDemo } from "~/demos/m3/button-group";
import source from "~/demos/m3/button-group.tsx?raw";

const snippet = `import { ButtonGroup, ToggleButton } from "@solidx/kit/m3";

<ButtonGroup variant="connected" size="md">
  <ToggleButton variant="tonal" pressed={view() === "day"} onPressedChange={() => setView("day")}>
    Day
  </ToggleButton>
  <ToggleButton variant="tonal" pressed={view() === "week"} onPressedChange={() => setView("week")}>
    Week
  </ToggleButton>
</ButtonGroup>`;

export default function ButtonGroupPage() {
  return (
    <DocsPage
      title="Button group"
      description="Standard or connected groups of buttons and toggles. Children take the group's size."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/button-group.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <ButtonGroupDemo />
    </DocsPage>
  );
}

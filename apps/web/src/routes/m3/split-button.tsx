import { DocsPage } from "~/components/preview";
import { SplitButtonDemo } from "~/demos/m3/split-button";
import source from "~/demos/m3/split-button.tsx?raw";

const snippet = `import { Menu, MenuContent, MenuItem, SplitButton, SplitButtonAction, SplitButtonTrigger } from "@solidx/kit/m3";

<SplitButton variant="tonal" size="sm">
  <SplitButtonAction>Send</SplitButtonAction>
  <Menu>
    <SplitButtonTrigger aria-label="More send options" />
    <MenuContent align="end">
      <MenuItem>Schedule send</MenuItem>
    </MenuContent>
  </Menu>
</SplitButton>`;

export default function SplitButtonPage() {
  return (
    <DocsPage
      title="Split button"
      description="A main action joined to a menu of related actions."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/split-button.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SplitButtonDemo />
    </DocsPage>
  );
}

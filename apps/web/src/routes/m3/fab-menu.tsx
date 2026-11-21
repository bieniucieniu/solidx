import { DocsPage } from "~/components/preview";
import { FabMenuDemo } from "~/demos/m3/fab-menu";
import source from "~/demos/m3/fab-menu.tsx?raw";

const snippet = `import { FabMenu, FabMenuContent, FabMenuItem, FabMenuTrigger } from "@solidx/kit/m3";

<FabMenu color="primary">
  <FabMenuTrigger aria-label="Create"><AddIcon /></FabMenuTrigger>
  <FabMenuContent>
    <FabMenuItem><MailIcon />Message</FabMenuItem>
    <FabMenuItem><PersonIcon />Contact</FabMenuItem>
  </FabMenuContent>
</FabMenu>`;

export default function FabMenuPage() {
  return (
    <DocsPage
      title="FAB menu"
      description="A FAB that opens related actions and turns into a close button."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/fab-menu.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <FabMenuDemo />
    </DocsPage>
  );
}

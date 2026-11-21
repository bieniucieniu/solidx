import { DocsPage } from "~/components/preview";
import { ContextMenuDemo } from "~/demos/ui/context-menu";
import source from "~/demos/ui/context-menu.tsx?raw";

const snippet = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@solidx/kit/ui";

<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

export default function ContextMenuPage() {
  return (
    <DocsPage
      title="Context menu"
      description="A menu opened with a right click."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/context-menu.tsx"
    >
      <ContextMenuDemo />
    </DocsPage>
  );
}

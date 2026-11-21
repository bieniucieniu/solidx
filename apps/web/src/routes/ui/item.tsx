import { DocsPage } from "~/components/preview";
import { ItemDemo } from "~/demos/ui/item";
import source from "~/demos/ui/item.tsx?raw";

const snippet = `import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@solidx/kit/ui";

// variant: "default" | "outline" | "muted"   size: "default" | "sm" | "xs"
// ItemMedia variant: "default" | "icon" | "image"
<Item variant="outline" size="sm">
  <ItemMedia variant="image">
    <img src="https://github.com/solidjs.png" alt="Solid" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Ada Lovelace</ItemTitle>
    <ItemDescription>Editor</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">View</Button>
  </ItemActions>
</Item>`;

export default function ItemPage() {
  return (
    <DocsPage
      title="Item"
      description="A row with media, text, and actions."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/item.tsx"
    >
      <ItemDemo />
    </DocsPage>
  );
}

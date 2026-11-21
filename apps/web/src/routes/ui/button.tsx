import { DocsPage } from "~/components/preview";
import { ButtonDemo } from "~/demos/ui/button";
import source from "~/demos/ui/button.tsx?raw";

const snippet = `import { Button } from "@solidx/kit/ui";

// variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
// size: "xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"
<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" size="icon" aria-label="Add"><PlusIcon /></Button>`;

export default function ButtonPage() {
  return (
    <DocsPage
      title="Button"
      description="Primary action button."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/button.tsx"
    >
      <ButtonDemo />
    </DocsPage>
  );
}

import { DocsPage } from "~/components/preview";
import { BadgeDemo } from "~/demos/ui/badge";
import source from "~/demos/ui/badge.tsx?raw";

const snippet = `import { Badge } from "@solidx/kit/ui";

// variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
<Badge>New</Badge>
<Badge variant="outline">Draft</Badge>`;

export default function BadgePage() {
  return (
    <DocsPage
      title="Badge"
      description="A small status label."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/badge.tsx"
    >
      <BadgeDemo />
    </DocsPage>
  );
}

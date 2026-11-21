import { DocsPage } from "~/components/preview";
import { BadgeDemo } from "~/demos/m3/badge";
import source from "~/demos/m3/badge.tsx?raw";

const snippet = `import { Badge, BadgeAnchor } from "@solidx/kit/m3";

<BadgeAnchor>
  <MailIcon />
  <Badge>12</Badge>
</BadgeAnchor>
<Badge size="small" />`;

export default function BadgePage() {
  return (
    <DocsPage
      title="Badge"
      description="Counts and status dots on icons and navigation items."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/badge.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <BadgeDemo />
    </DocsPage>
  );
}

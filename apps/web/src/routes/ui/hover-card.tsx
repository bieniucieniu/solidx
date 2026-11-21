import { DocsPage } from "~/components/preview";
import { HoverCardDemo } from "~/demos/ui/hover-card";
import source from "~/demos/ui/hover-card.tsx?raw";

const snippet = `import {
  buttonVariants,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@solidx/kit/ui";

<HoverCard>
  <HoverCardTrigger class={buttonVariants()}>Hover</HoverCardTrigger>
  <HoverCardContent>
    Ada Lovelace
  </HoverCardContent>
</HoverCard>`;

export default function HoverCardPage() {
  return (
    <DocsPage
      title="Hover card"
      description="Content that appears on hover."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/hover-card.tsx"
    >
      <HoverCardDemo />
    </DocsPage>
  );
}

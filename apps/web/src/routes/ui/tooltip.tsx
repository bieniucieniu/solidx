import { DocsPage } from "~/components/preview";
import { TooltipDemo } from "~/demos/ui/tooltip";
import source from "~/demos/ui/tooltip.tsx?raw";

const snippet = `import { buttonVariants, Tooltip, TooltipContent, TooltipTrigger } from "@solidx/kit/ui";

<Tooltip>
  <TooltipTrigger class={buttonVariants()}>Hover</TooltipTrigger>
  <TooltipContent>
    Saved
  </TooltipContent>
</Tooltip>`;

export default function TooltipPage() {
  return (
    <DocsPage
      title="Tooltip"
      description="Hover content anchored to a trigger."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/tooltip.tsx"
    >
      <TooltipDemo />
    </DocsPage>
  );
}

import { DocsPage } from "~/components/preview";
import { TooltipDemo } from "~/demos/m3/tooltip";
import source from "~/demos/m3/tooltip.tsx?raw";

const snippet = `import {
  RichTooltip,
  RichTooltipContent,
  RichTooltipSubhead,
  RichTooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  iconButtonVariants,
} from "@solidx/kit/m3";

<Tooltip>
  <TooltipTrigger class={iconButtonVariants()} aria-label="Favorite"><StarIcon /></TooltipTrigger>
  <TooltipContent>Add to favorites</TooltipContent>
</Tooltip>

<RichTooltip>
  <RichTooltipTrigger class={iconButtonVariants()} aria-label="About"><InfoIcon /></RichTooltipTrigger>
  <RichTooltipContent>
    <RichTooltipSubhead>Storage</RichTooltipSubhead>
  </RichTooltipContent>
</RichTooltip>`;

export default function TooltipPage() {
  return (
    <DocsPage
      title="Tooltip"
      description="Plain tooltips for labels; rich tooltips with a subhead and actions."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/tooltip.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <TooltipDemo />
    </DocsPage>
  );
}

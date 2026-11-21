import { buttonVariants, Tooltip, TooltipContent, TooltipTrigger } from "@solidx/kit/ui";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger class={buttonVariants()}>Hover</TooltipTrigger>
      <TooltipContent>Saved</TooltipContent>
    </Tooltip>
  );
}

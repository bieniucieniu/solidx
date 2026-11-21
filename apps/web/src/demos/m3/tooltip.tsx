import {
  Button,
  iconButtonVariants,
  RichTooltip,
  RichTooltipActions,
  RichTooltipContent,
  RichTooltipSubhead,
  RichTooltipSupportingText,
  RichTooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@solidx/kit/m3";
import { DemoRow, DemoStack, InfoIcon, StarIcon } from "./shared";

export function TooltipDemo() {
  return (
    <DemoStack>
      <DemoRow label="Plain">
        <Tooltip>
          <TooltipTrigger class={iconButtonVariants()} aria-label="Add to favorites">
            <StarIcon />
          </TooltipTrigger>
          <TooltipContent>Add to favorites</TooltipContent>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Rich">
        <RichTooltip>
          <RichTooltipTrigger class={iconButtonVariants()} aria-label="About storage">
            <InfoIcon />
          </RichTooltipTrigger>
          <RichTooltipContent>
            <RichTooltipSubhead>Storage almost full</RichTooltipSubhead>
            <RichTooltipSupportingText>
              Free up space by removing old backups, or upgrade your plan.
            </RichTooltipSupportingText>
            <RichTooltipActions>
              <Button variant="text">Manage</Button>
              <Button variant="text">Upgrade</Button>
            </RichTooltipActions>
          </RichTooltipContent>
        </RichTooltip>
      </DemoRow>
    </DemoStack>
  );
}

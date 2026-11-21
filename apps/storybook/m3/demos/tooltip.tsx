import {
  Button,
  IconButton,
  RichTooltip,
  RichTooltipActions,
  RichTooltipContent,
  RichTooltipPortal,
  RichTooltipSubhead,
  RichTooltipSupportingText,
  RichTooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@solidx/kit-1.9/m3";
import { DemoRow, DemoStack, InfoIcon, StarIcon } from "./shared";

export function TooltipDemo() {
  return (
    <DemoStack>
      <DemoRow label="Plain">
        <Tooltip>
          <TooltipTrigger as={IconButton} aria-label="Add to favorites">
            <StarIcon />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>Add to favorites</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </DemoRow>
      <DemoRow label="Rich">
        <RichTooltip>
          <RichTooltipTrigger as={IconButton} aria-label="About storage">
            <InfoIcon />
          </RichTooltipTrigger>
          <RichTooltipPortal>
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
          </RichTooltipPortal>
        </RichTooltip>
      </DemoRow>
    </DemoStack>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger, Button } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Tooltip",
  component: TooltipDemo,
} satisfies Meta<typeof TooltipDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TooltipDemo />,
};

function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger as={Button}>Hover</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>Saved</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}

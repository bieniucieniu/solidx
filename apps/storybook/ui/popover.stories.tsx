import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverLabel,
  PopoverPortal,
  PopoverTrigger,
  Button,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Popover",
  component: PopoverDemo,
} satisfies Meta<typeof PopoverDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PopoverDemo />,
};

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger as={Button}>Open</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
          <PopoverHeader>
            <PopoverLabel>Dimensions</PopoverLabel>
            <PopoverDescription>Set the size of the frame.</PopoverDescription>
          </PopoverHeader>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
  Button,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Drawer",
  component: DrawerDemo,
} satisfies Meta<typeof DrawerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DrawerDemo />,
};

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger as={Button}>Open</DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerLabel>Filters</DrawerLabel>
            <DrawerDescription>Narrow the list.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

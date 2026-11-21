import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetLabel,
  SheetOverlay,
  SheetPortal,
  SheetTrigger,
  Button,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Sheet",
  component: SheetDemo,
} satisfies Meta<typeof SheetDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SheetDemo />,
};

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger as={Button}>Open</SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetLabel>Settings</SheetLabel>
            <SheetDescription>Changes apply to this project.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

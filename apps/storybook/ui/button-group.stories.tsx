import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ButtonGroup, Button } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ButtonGroupDemo />,
};

function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button type="button" variant="outline">
        Cut
      </Button>
      <Button type="button" variant="outline">
        Copy
      </Button>
      <Button type="button" variant="outline">
        Paste
      </Button>
    </ButtonGroup>
  );
}

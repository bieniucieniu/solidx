import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Spinner } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SpinnerDemo />,
};

function SpinnerDemo() {
  return <Spinner />;
}

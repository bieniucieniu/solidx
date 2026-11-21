import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Toggle } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToggleDemo />,
};

function ToggleDemo() {
  const [pressed, setPressed] = createSignal(false);

  return (
    <Toggle pressed={pressed()} onChange={setPressed}>
      Bold
    </Toggle>
  );
}

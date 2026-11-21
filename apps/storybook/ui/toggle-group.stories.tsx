import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ToggleGroup, ToggleGroupItem } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToggleGroupDemo />,
};

function ToggleGroupDemo() {
  const [value, setValue] = createSignal<string | null>("left");

  return (
    <ToggleGroup value={value()} onChange={setValue}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}

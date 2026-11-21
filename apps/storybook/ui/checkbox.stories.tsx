import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CheckboxDemo />,
};

function CheckboxDemo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Checkbox checked={checked()} onChange={setChecked}>
      <CheckboxInput />
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxLabel>Accept terms</CheckboxLabel>
    </Checkbox>
  );
}

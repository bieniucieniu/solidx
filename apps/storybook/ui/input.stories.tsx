import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Input, InputControl, InputDescription, InputLabel } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InputDemo />,
};

function InputDemo() {
  const [value, setValue] = createSignal("");

  return (
    <Input class="max-w-xs" value={value()} onChange={setValue}>
      <InputLabel>Email</InputLabel>
      <InputControl type="email" placeholder="ada@example.com" />
      <InputDescription>Used to sign in.</InputDescription>
    </Input>
  );
}

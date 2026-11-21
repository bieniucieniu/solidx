import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { NativeSelect } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/NativeSelect",
  component: NativeSelect,
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NativeSelectDemo />,
};

function NativeSelectDemo() {
  const [fruit, setFruit] = createSignal("apple");

  return (
    <NativeSelect
      class="max-w-xs"
      value={fruit()}
      onInput={(event) => setFruit(event.currentTarget.value)}
    >
      <option value="apple">Apple</option>
      <option value="pear">Pear</option>
    </NativeSelect>
  );
}

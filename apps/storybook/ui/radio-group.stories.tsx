import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <RadioGroupDemo />,
};

function RadioGroupDemo() {
  const [fruit, setFruit] = createSignal("apple");

  return (
    <RadioGroup value={fruit()} onChange={setFruit}>
      <RadioGroupLabel>Fruit</RadioGroupLabel>
      <RadioGroupItem value="apple">
        <RadioGroupItemInput />
        <RadioGroupItemControl>
          <RadioGroupItemIndicator />
        </RadioGroupItemControl>
        <RadioGroupItemLabel>Apple</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="pear">
        <RadioGroupItemInput />
        <RadioGroupItemControl>
          <RadioGroupItemIndicator />
        </RadioGroupItemControl>
        <RadioGroupItemLabel>Pear</RadioGroupItemLabel>
      </RadioGroupItem>
    </RadioGroup>
  );
}

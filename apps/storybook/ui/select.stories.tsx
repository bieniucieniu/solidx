import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemLabel,
  SelectLabel,
  SelectListbox,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

// Render-only stories: the demo owns the component's required props, so no `component`/args.
const meta = {
  title: "UI/Select",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SelectDemo />,
};

const options = ["Apple", "Banana", "Orange"];

function SelectDemo() {
  const [fruit, setFruit] = createSignal<string | null>(null);

  return (
    <Select
      class="max-w-xs"
      options={options}
      value={fruit()}
      onChange={setFruit}
      placeholder="Pick a fruit"
      itemComponent={(props) => (
        <SelectItem item={props.item}>
          <SelectItemLabel>{props.item.rawValue}</SelectItemLabel>
        </SelectItem>
      )}
    >
      <SelectLabel>Fruit</SelectLabel>
      <SelectTrigger>
        <SelectValue>{(state) => state.selectedOption() as string}</SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectListbox />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

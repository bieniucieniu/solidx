import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxPortal,
  ComboboxTrigger,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

// Render-only stories: the demo owns the component's required props, so no `component`/args.
const meta = {
  title: "UI/Combobox",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ComboboxDemo />,
};

const options = ["Apple", "Banana", "Orange"];

function ComboboxDemo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Combobox
      class="max-w-xs"
      options={options}
      value={value()}
      onChange={setValue}
      placeholder="Search fruit"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
        </ComboboxItem>
      )}
    >
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxContent>
          <ComboboxListbox />
        </ComboboxContent>
      </ComboboxPortal>
    </Combobox>
  );
}

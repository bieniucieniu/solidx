import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SliderDemo />,
};

function SliderDemo() {
  const [value, setValue] = createSignal([40]);

  return (
    <Slider class="max-w-xs" value={value()} onChange={setValue} minValue={0} maxValue={100}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValueLabel />
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  );
}

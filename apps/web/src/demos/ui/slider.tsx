import {
  Slider,
  SliderControl,
  SliderFill,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function SliderDemo() {
  const [value, setValue] = createSignal(40);

  return (
    <Slider
      class="max-w-xs"
      value={value()}
      onValueChange={(next) => setValue(next as number)}
      min={0}
      max={100}
    >
      <div class="flex items-center justify-between">
        <span class="text-xs/relaxed font-medium text-foreground">Volume</span>
        <SliderValueLabel />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderFill />
          <SliderThumb aria-label="Volume" />
        </SliderTrack>
      </SliderControl>
    </Slider>
  );
}

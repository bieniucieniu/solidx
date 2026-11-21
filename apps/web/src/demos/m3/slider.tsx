import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@solidx/kit/m3";
import { DemoRow, DemoStack } from "./shared";

export function SliderDemo() {
  return (
    <DemoStack class="max-w-md">
      <Slider defaultValue={[40]}>
        <div class="flex justify-between">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueLabel />
        </div>
        <SliderTrack>
          <SliderFill />
          <SliderThumb></SliderThumb>
        </SliderTrack>
      </Slider>
      <Slider defaultValue={[20, 70]}>
        <div class="flex justify-between">
          <SliderLabel>Price range</SliderLabel>
          <SliderValueLabel />
        </div>
        <SliderTrack>
          <SliderFill />
          <SliderThumb></SliderThumb>
          <SliderThumb></SliderThumb>
        </SliderTrack>
      </Slider>
      <DemoRow label="Disabled">
        <Slider defaultValue={[60]} disabled>
          <SliderTrack>
            <SliderFill />
            <SliderThumb></SliderThumb>
          </SliderTrack>
        </Slider>
      </DemoRow>
    </DemoStack>
  );
}

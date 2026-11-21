import {
  Slider,
  SliderFill,
  SliderInput,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@solidx/kit-1.9/m3";
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
          <SliderThumb>
            <SliderInput />
          </SliderThumb>
        </SliderTrack>
      </Slider>
      <Slider defaultValue={[20, 70]}>
        <div class="flex justify-between">
          <SliderLabel>Price range</SliderLabel>
          <SliderValueLabel />
        </div>
        <SliderTrack>
          <SliderFill />
          <SliderThumb>
            <SliderInput />
          </SliderThumb>
          <SliderThumb>
            <SliderInput />
          </SliderThumb>
        </SliderTrack>
      </Slider>
      <DemoRow label="Disabled">
        <Slider defaultValue={[60]} disabled>
          <SliderTrack>
            <SliderFill />
            <SliderThumb>
              <SliderInput />
            </SliderThumb>
          </SliderTrack>
        </Slider>
      </DemoRow>
    </DemoStack>
  );
}

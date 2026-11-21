import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "@solidx/kit-1.9/m3";
import { For } from "solid-js";

const options = ["Ringtone", "Vibrate", "Silent"];

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="Vibrate">
      <RadioGroupLabel>Sound</RadioGroupLabel>
      <For each={options}>
        {(option) => (
          <RadioGroupItem value={option} disabled={option === "Silent"}>
            <RadioGroupItemInput />
            <RadioGroupItemControl>
              <RadioGroupItemIndicator />
            </RadioGroupItemControl>
            <RadioGroupItemLabel>{option}</RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
    </RadioGroup>
  );
}

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "@solidx/kit/m3";
import { For } from "solid-js";

const options = ["Ringtone", "Vibrate", "Silent"];

export function RadioGroupDemo() {
  return (
    <div class="flex flex-col gap-1">
      <RadioGroupLabel id="sound-label">Sound</RadioGroupLabel>
      <RadioGroup aria-labelledby="sound-label" defaultValue="Vibrate">
        <For each={options}>
          {(option) => (
            <RadioGroupItem>
              <RadioGroupItemControl value={option} disabled={option === "Silent"} />
              <RadioGroupItemLabel>{option}</RadioGroupItemLabel>
            </RadioGroupItem>
          )}
        </For>
      </RadioGroup>
    </div>
  );
}

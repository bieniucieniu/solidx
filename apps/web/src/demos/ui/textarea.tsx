import { Textarea, TextareaControl, TextareaDescription, TextareaLabel } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function TextareaDemo() {
  const [value, setValue] = createSignal("");

  return (
    <Textarea class="max-w-xs">
      <TextareaLabel>Bio</TextareaLabel>
      <TextareaControl
        placeholder="A short note"
        value={value()}
        onValueChange={(next) => setValue(next)}
      />
      <TextareaDescription>Shown on your profile.</TextareaDescription>
    </Textarea>
  );
}

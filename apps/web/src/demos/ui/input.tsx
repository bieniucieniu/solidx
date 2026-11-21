import { Input, InputControl, InputDescription, InputLabel } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function InputDemo() {
  const [value, setValue] = createSignal("");

  return (
    <Input class="max-w-xs">
      <InputLabel>Email</InputLabel>
      <InputControl
        type="email"
        placeholder="ada@example.com"
        value={value()}
        onValueChange={(next) => setValue(next)}
      />
      <InputDescription>Used to sign in.</InputDescription>
    </Input>
  );
}

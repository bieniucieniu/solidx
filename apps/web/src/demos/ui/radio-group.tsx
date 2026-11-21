import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function RadioGroupDemo() {
  const [fruit, setFruit] = createSignal("apple");

  return (
    <div class="flex flex-col gap-3">
      <span id="fruit-label" class="text-xs/relaxed font-medium text-foreground">
        Fruit
      </span>
      <RadioGroup
        aria-labelledby="fruit-label"
        value={fruit()}
        onValueChange={(next) => setFruit(String(next))}
      >
        <RadioGroupItemLabel>
          <RadioGroupItem value="apple" />
          Apple
        </RadioGroupItemLabel>
        <RadioGroupItemLabel>
          <RadioGroupItem value="pear" />
          Pear
        </RadioGroupItemLabel>
      </RadioGroup>
    </div>
  );
}

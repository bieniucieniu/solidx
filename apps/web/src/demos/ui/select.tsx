import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";

const options = ["Apple", "Banana", "Orange"];

export function SelectDemo() {
  const [fruit, setFruit] = createSignal<string | null>(null);

  return (
    <Select
      value={fruit()}
      onValueChange={(next) => setFruit(next as string | null)}
      placeholder="Pick a fruit"
    >
      <div class="flex max-w-xs flex-col gap-2">
        <SelectLabel>Fruit</SelectLabel>
        <SelectTrigger class="w-full">
          <SelectValue />
        </SelectTrigger>
      </div>
      <SelectContent>
        <For each={options}>{(option) => <SelectItem value={option}>{option}</SelectItem>}</For>
      </SelectContent>
    </Select>
  );
}

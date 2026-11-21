import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxTrigger,
} from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";

const options = ["Apple", "Banana", "Orange"];

export function ComboboxDemo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Combobox value={value()} onValueChange={(next) => setValue(next as string | null)}>
      <div class="flex max-w-xs flex-col gap-2">
        <ComboboxLabel>Fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="Search fruit" />
          <ComboboxTrigger />
        </ComboboxControl>
      </div>
      <ComboboxContent>
        <ComboboxListbox>
          <For each={options}>
            {(option) => (
              <ComboboxItem value={option}>
                <ComboboxItemLabel>{option}</ComboboxItemLabel>
              </ComboboxItem>
            )}
          </For>
        </ComboboxListbox>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}

import { NativeSelect } from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";
import { VariantRow } from "~/components/preview";

const sizes = ["sm", "default"] as const;

export function NativeSelectDemo() {
  const [fruit, setFruit] = createSignal("apple");

  return (
    <VariantRow label="Sizes">
      <For each={sizes}>
        {(size) => (
          <NativeSelect
            size={size}
            class="w-40"
            value={fruit()}
            onInput={(event) => setFruit(event.currentTarget.value)}
          >
            <option value="apple">Apple</option>
            <option value="pear">Pear</option>
          </NativeSelect>
        )}
      </For>
      <NativeSelect class="w-40" disabled>
        <option>Disabled</option>
      </NativeSelect>
    </VariantRow>
  );
}

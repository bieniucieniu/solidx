import { Switch, SwitchLabel } from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";
import { VariantRow } from "~/components/preview";

const sizes = ["sm", "default"] as const;

export function SwitchDemo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <VariantRow label="Sizes" class="gap-6">
      <For each={sizes}>
        {(size) => (
          <SwitchLabel>
            <Switch size={size} checked={checked()} onCheckedChange={(next) => setChecked(next)} />
            Airplane mode ({size})
          </SwitchLabel>
        )}
      </For>
      <SwitchLabel>
        <Switch disabled />
        Disabled
      </SwitchLabel>
    </VariantRow>
  );
}

import { Toggle, type ToggleSize, type ToggleVariant } from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const variants: ToggleVariant[] = ["default", "outline"];
const sizes: ToggleSize[] = ["sm", "default", "lg"];

export function ToggleDemo() {
  const [pressed, setPressed] = createSignal(false);

  return (
    <VariantStack>
      <VariantRow label="Variants">
        <For each={variants}>
          {(variant) => (
            <Toggle
              variant={variant}
              pressed={pressed()}
              onPressedChange={(next) => setPressed(next)}
            >
              Bold
            </Toggle>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Sizes">
        <For each={sizes}>
          {(size) => (
            <Toggle variant="outline" size={size}>
              {size}
            </Toggle>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Disabled">
        <Toggle disabled>Italic</Toggle>
      </VariantRow>
    </VariantStack>
  );
}

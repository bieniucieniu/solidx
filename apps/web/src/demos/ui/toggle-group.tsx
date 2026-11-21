import { ToggleGroup, ToggleGroupItem, type ToggleSize, type ToggleVariant } from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const variants: ToggleVariant[] = ["default", "outline"];
const sizes: ToggleSize[] = ["sm", "default", "lg"];

function Items() {
  return (
    <>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </>
  );
}

export function ToggleGroupDemo() {
  const [value, setValue] = createSignal<string[]>(["left"]);

  return (
    <VariantStack>
      <VariantRow label="Variants">
        <For each={variants}>
          {(variant) => (
            <ToggleGroup
              variant={variant}
              value={value()}
              onValueChange={(next) => setValue(next as string[])}
            >
              <Items />
            </ToggleGroup>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Sizes">
        <For each={sizes}>
          {(size) => (
            <ToggleGroup variant="outline" size={size} defaultValue={["center"]}>
              <Items />
            </ToggleGroup>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Spacing 0 (joined)">
        <ToggleGroup variant="outline" spacing={0} defaultValue={["left"]}>
          <Items />
        </ToggleGroup>
      </VariantRow>
      <VariantRow label="Vertical">
        <ToggleGroup variant="outline" orientation="vertical" spacing={0} defaultValue={["left"]}>
          <Items />
        </ToggleGroup>
      </VariantRow>
      <VariantRow label="Multiple">
        <ToggleGroup variant="outline" multiple defaultValue={["left", "right"]}>
          <Items />
        </ToggleGroup>
      </VariantRow>
    </VariantStack>
  );
}

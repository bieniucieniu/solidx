import { ExtendedFab, Fab, type FabSize, type FabVariant } from "@solidx/kit-1.9/m3";
import { For } from "solid-js";
import { DemoRow, DemoStack, EditIcon } from "./shared";

const variants: FabVariant[] = [
  "tonal-primary",
  "tonal-secondary",
  "tonal-tertiary",
  "primary",
  "secondary",
  "tertiary",
];
const sizes: FabSize[] = ["default", "md", "lg"];

export function FabDemo() {
  return (
    <DemoStack>
      <DemoRow label="Colors">
        <For each={variants}>
          {(variant) => (
            <Fab variant={variant} aria-label={`Compose (${variant})`}>
              <EditIcon />
            </Fab>
          )}
        </For>
      </DemoRow>
      <DemoRow label="Sizes">
        <For each={sizes}>
          {(size) => (
            <Fab size={size} aria-label={`Compose (${size})`}>
              <EditIcon />
            </Fab>
          )}
        </For>
      </DemoRow>
      <DemoRow label="Extended">
        <For each={sizes}>
          {(size) => (
            <ExtendedFab size={size}>
              <EditIcon />
              Compose
            </ExtendedFab>
          )}
        </For>
      </DemoRow>
    </DemoStack>
  );
}

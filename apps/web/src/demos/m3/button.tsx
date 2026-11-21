import {
  Button,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
  ToggleButton,
  type ToggleButtonVariant,
} from "@solidx/kit/m3";
import { For } from "solid-js";
import { AddIcon, DemoRow, DemoStack, EditIcon, FavoriteIcon } from "./shared";

const variants: ButtonVariant[] = ["elevated", "filled", "tonal", "outlined", "text"];
const toggleVariants: ToggleButtonVariant[] = ["elevated", "filled", "tonal", "outlined"];
const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: ButtonShape[] = ["round", "square"];

export function ButtonDemo() {
  return (
    <DemoStack>
      <DemoRow label="Variants">
        <For each={variants}>{(variant) => <Button variant={variant}>{variant}</Button>}</For>
      </DemoRow>
      <DemoRow label="With icon">
        <Button>
          <AddIcon />
          Create
        </Button>
        <Button variant="tonal">
          <EditIcon />
          Edit
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
      </DemoRow>
      <For each={shapes}>
        {(shape) => (
          <DemoRow label={`Sizes, ${shape}`}>
            <For each={sizes}>
              {(size) => (
                <Button size={size} shape={shape}>
                  {size.toUpperCase()}
                </Button>
              )}
            </For>
          </DemoRow>
        )}
      </For>
      <DemoRow label="Toggle (selected shape flips)">
        <For each={toggleVariants}>
          {(variant) => (
            <ToggleButton variant={variant} defaultPressed={variant === "filled"}>
              <FavoriteIcon />
              {variant}
            </ToggleButton>
          )}
        </For>
      </DemoRow>
    </DemoStack>
  );
}

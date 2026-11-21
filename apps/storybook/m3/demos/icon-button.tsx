import {
  IconButton,
  type IconButtonVariant,
  type IconButtonWidth,
  ToggleIconButton,
  type ButtonSize,
} from "@solidx/kit-1.9/m3";
import { For } from "solid-js";
import { DemoRow, DemoStack, FavoriteIcon, SettingsIcon, StarIcon } from "./shared";

const variants: IconButtonVariant[] = ["standard", "filled", "tonal", "outlined"];
const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const widths: IconButtonWidth[] = ["narrow", "default", "wide"];

export function IconButtonDemo() {
  return (
    <DemoStack>
      <DemoRow label="Variants">
        <For each={variants}>
          {(variant) => (
            <IconButton variant={variant} aria-label={`${variant} settings`}>
              <SettingsIcon />
            </IconButton>
          )}
        </For>
        <IconButton variant="filled" disabled aria-label="Disabled">
          <SettingsIcon />
        </IconButton>
      </DemoRow>
      <DemoRow label="Toggle">
        <For each={variants}>
          {(variant) => (
            <ToggleIconButton variant={variant} aria-label={`Favorite (${variant})`}>
              <FavoriteIcon />
            </ToggleIconButton>
          )}
        </For>
      </DemoRow>
      <DemoRow label="Sizes">
        <For each={sizes}>
          {(size) => (
            <IconButton variant="tonal" size={size} aria-label={`Star ${size}`}>
              <StarIcon />
            </IconButton>
          )}
        </For>
      </DemoRow>
      <DemoRow label="Widths and square shape">
        <For each={widths}>
          {(width) => (
            <IconButton variant="filled" size="md" width={width} aria-label={`Star ${width}`}>
              <StarIcon />
            </IconButton>
          )}
        </For>
        <IconButton variant="filled" size="md" shape="square" aria-label="Star square">
          <StarIcon />
        </IconButton>
      </DemoRow>
    </DemoStack>
  );
}

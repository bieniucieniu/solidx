import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@solidx/kit/ui";
import { For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const variants = ["default", "outline", "muted"] as const;
const sizes = ["default", "sm", "xs"] as const;

export function ItemDemo() {
  return (
    <VariantStack class="max-w-md">
      <For each={variants}>
        {(variant) => (
          <VariantRow label={`Variant: ${variant}`}>
            <Item variant={variant} class="w-full">
              <ItemMedia>AL</ItemMedia>
              <ItemContent>
                <ItemTitle>Ada Lovelace</ItemTitle>
                <ItemDescription>Editor</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </ItemActions>
            </Item>
          </VariantRow>
        )}
      </For>
      <For each={sizes}>
        {(size) => (
          <VariantRow label={`Size: ${size}`}>
            <Item variant="outline" size={size} class="w-full">
              <ItemMedia variant="image">
                <img src="https://github.com/solidjs.png" alt="Solid" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>solidx</ItemTitle>
              </ItemContent>
            </Item>
          </VariantRow>
        )}
      </For>
      <VariantRow label="Media: icon">
        <Item variant="muted" class="w-full">
          <ItemMedia variant="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Security alert</ItemTitle>
            <ItemDescription>New sign-in from an unknown device.</ItemDescription>
          </ItemContent>
        </Item>
      </VariantRow>
    </VariantStack>
  );
}

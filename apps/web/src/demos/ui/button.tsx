import { Button, type ButtonSize, type ButtonVariant } from "@solidx/kit/ui";
import { type JSX } from "@solidjs/web";
import { For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const variants: ButtonVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
];
const sizes: ButtonSize[] = ["xs", "sm", "default", "lg"];
const iconSizes: ButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"];

function PlusIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function ButtonDemo() {
  return (
    <VariantStack>
      <VariantRow label="Variants">
        <For each={variants}>{(variant) => <Button variant={variant}>{variant}</Button>}</For>
      </VariantRow>
      <VariantRow label="Sizes">
        <For each={sizes}>{(size) => <Button size={size}>{size}</Button>}</For>
      </VariantRow>
      <VariantRow label="Icon sizes">
        <For each={iconSizes}>
          {(size) => (
            <Button variant="outline" size={size} aria-label={`Add (${size})`}>
              <PlusIcon />
            </Button>
          )}
        </For>
      </VariantRow>
      <VariantRow label="With icon / disabled">
        <Button>
          <PlusIcon data-icon="inline-start" />
          New
        </Button>
        <Button disabled>Disabled</Button>
      </VariantRow>
    </VariantStack>
  );
}

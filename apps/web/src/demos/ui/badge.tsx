import { Badge, type BadgeVariant } from "@solidx/kit/ui";
import { For } from "solid-js";

const variants: BadgeVariant[] = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
];

export function BadgeDemo() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <For each={variants}>{(variant) => <Badge variant={variant}>{variant}</Badge>}</For>
    </div>
  );
}

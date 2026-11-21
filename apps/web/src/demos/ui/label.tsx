import { Label } from "@solidx/kit/ui";

export function LabelDemo() {
  return (
    <div class="flex max-w-xs flex-col gap-2">
      <Label for="name">Name</Label>
      <input
        id="name"
        class="h-7 w-full rounded-md border border-input bg-input/20 px-2 text-xs/relaxed text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30"
      />
    </div>
  );
}

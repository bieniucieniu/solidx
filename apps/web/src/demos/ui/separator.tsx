import { Separator } from "@solidx/kit/ui";

export function SeparatorDemo() {
  return (
    <div class="flex max-w-xs flex-col gap-3 text-sm text-foreground">
      <span>Horizontal</span>
      <Separator />
      <div class="flex h-5 items-center gap-3">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}

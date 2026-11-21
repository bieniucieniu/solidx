import { AspectRatio } from "@solidx/kit/ui";

export function AspectRatioDemo() {
  return (
    <AspectRatio
      ratio="16 / 9"
      class="flex items-center justify-center bg-muted text-sm text-muted-foreground"
    >
      16 / 9
    </AspectRatio>
  );
}

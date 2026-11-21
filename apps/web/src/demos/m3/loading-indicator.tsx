import { LoadingIndicator } from "@solidx/kit/m3";
import { DemoRow } from "./shared";

export function LoadingIndicatorDemo() {
  return (
    <DemoRow label="Default and contained" class="gap-6">
      <LoadingIndicator aria-label="Loading" />
      <LoadingIndicator contained aria-label="Loading" />
    </DemoRow>
  );
}

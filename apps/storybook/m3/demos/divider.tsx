import { Divider } from "@solidx/kit-1.9/m3";
import { DemoRow, DemoStack } from "./shared";

export function DividerDemo() {
  return (
    <DemoStack class="max-w-md">
      <DemoRow label="Full width" class="block">
        <Divider />
      </DemoRow>
      <DemoRow label="Inset start" class="block">
        <Divider inset="start" />
      </DemoRow>
      <DemoRow label="Inset middle" class="block">
        <Divider inset="middle" />
      </DemoRow>
      <DemoRow label="Vertical" class="h-12">
        <span class="typescale-body-medium">Left</span>
        <Divider orientation="vertical" />
        <span class="typescale-body-medium">Right</span>
      </DemoRow>
    </DemoStack>
  );
}

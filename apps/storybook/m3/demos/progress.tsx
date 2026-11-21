import {
  CircularProgress,
  Progress,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  ProgressValueLabel,
} from "@solidx/kit-1.9/m3";
import { createSignal, onCleanup, onMount } from "solid-js";
import { DemoRow, DemoStack } from "./shared";

export function ProgressDemo() {
  const [value, setValue] = createSignal(30);
  onMount(() => {
    const timer = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 1200);
    onCleanup(() => clearInterval(timer));
  });
  return (
    <DemoStack class="max-w-md">
      <Progress value={value()}>
        <div class="flex justify-between">
          <ProgressLabel>Uploading</ProgressLabel>
          <ProgressValueLabel />
        </div>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>
      </Progress>
      <Progress value={value()}>
        <ProgressLabel>Wavy</ProgressLabel>
        <ProgressTrack>
          <ProgressFill wavy />
        </ProgressTrack>
      </Progress>
      <Progress indeterminate>
        <ProgressLabel>Indeterminate</ProgressLabel>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>
      </Progress>
      <DemoRow label="Circular">
        <CircularProgress value={value()} aria-label="Upload progress" />
        <CircularProgress indeterminate aria-label="Loading" />
        <CircularProgress value={75} size={48} aria-label="Storage used" />
      </DemoRow>
    </DemoStack>
  );
}

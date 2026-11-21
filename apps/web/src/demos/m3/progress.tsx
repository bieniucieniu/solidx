import {
  CircularProgress,
  Progress,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  ProgressValueLabel,
} from "@solidx/kit/m3";
import { createSignal, onSettled } from "solid-js";
import { DemoRow, DemoStack } from "./shared";

export function ProgressDemo() {
  const [value, setValue] = createSignal(30);
  onSettled(() => {
    const timer = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 1200);
    return () => clearInterval(timer);
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
      <Progress value={null}>
        <ProgressLabel>Indeterminate</ProgressLabel>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>
      </Progress>
      <DemoRow label="Circular">
        <CircularProgress value={value()} aria-label="Upload progress" />
        <CircularProgress value={null} aria-label="Loading" />
        <CircularProgress value={75} size={48} aria-label="Storage used" />
      </DemoRow>
    </DemoStack>
  );
}

import {
  Progress,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  ProgressValueLabel,
} from "@solidx/kit/ui";

export function ProgressDemo() {
  return (
    <Progress value={64} class="max-w-xs">
      <ProgressLabel>Upload</ProgressLabel>
      <ProgressValueLabel />
      <ProgressTrack>
        <ProgressFill />
      </ProgressTrack>
    </Progress>
  );
}

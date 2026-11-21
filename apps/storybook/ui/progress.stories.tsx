import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Progress,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  ProgressValueLabel,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Progress",
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ProgressDemo />,
};

function ProgressDemo() {
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

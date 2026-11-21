import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Textarea, TextareaControl, TextareaDescription, TextareaLabel } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TextareaDemo />,
};

function TextareaDemo() {
  const [value, setValue] = createSignal("");

  return (
    <Textarea class="max-w-xs" value={value()} onChange={setValue}>
      <TextareaLabel>Bio</TextareaLabel>
      <TextareaControl placeholder="A short note" />
      <TextareaDescription>Shown on your profile.</TextareaDescription>
    </Textarea>
  );
}

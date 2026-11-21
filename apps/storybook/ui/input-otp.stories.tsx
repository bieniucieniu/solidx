import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPInput,
  InputOTPSeparator,
  InputOTPSlot,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Input OTP",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InputOTPDemo />,
};

function InputOTPDemo() {
  const [value, setValue] = createSignal("");
  const [completed, setCompleted] = createSignal("");

  return (
    <div class="flex flex-col gap-2">
      <InputOTP maxLength={6} value={value()} onValueChange={setValue} onComplete={setCompleted}>
        <InputOTPInput />
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p class="text-xs text-muted-foreground">
        {completed() ? `Completed: ${completed()}` : "Enter the 6-digit code."}
      </p>
    </div>
  );
}

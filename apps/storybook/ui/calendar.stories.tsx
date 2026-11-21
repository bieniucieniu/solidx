import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Calendar } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Calendar",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => <SingleDemo />,
};

export const Range: Story = {
  render: () => <RangeDemo />,
};

export const DisabledWeekends: Story = {
  render: () => <DisabledWeekendsDemo />,
};

function SingleDemo() {
  const [value, setValue] = createSignal<Date | null>(new Date());

  return (
    <Calendar
      mode="single"
      value={value()}
      onValueChange={setValue}
      class="rounded-lg border border-border"
    />
  );
}

function RangeDemo() {
  const today = new Date();
  const [value, setValue] = createSignal<{ from: Date | null; to: Date | null }>({
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
  });

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      value={value()}
      onValueChange={setValue}
      class="rounded-lg border border-border"
    />
  );
}

function DisabledWeekendsDemo() {
  return (
    <Calendar
      mode="single"
      disabled={(day) => day.getDay() === 0 || day.getDay() === 6}
      class="rounded-lg border border-border"
    />
  );
}

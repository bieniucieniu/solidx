import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Field, FieldDescription, FieldLabel } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Field",
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FieldDemo />,
};

function FieldDemo() {
  return (
    <Field class="max-w-xs">
      <FieldLabel for="city">City</FieldLabel>
      <input
        id="city"
        class="h-7 w-full rounded-md border border-input bg-input/20 px-2 text-xs/relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30"
        placeholder="Paris"
      />
      <FieldDescription>Where you work.</FieldDescription>
    </Field>
  );
}

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ButtonDemo />,
};

export const Variants: Story = {
  render: () => (
    <div class="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class="flex flex-wrap items-center gap-2">
      <Button size="xs" variant="outline">
        Extra small
      </Button>
      <Button size="sm" variant="outline">
        Small
      </Button>
      <Button variant="outline">Default</Button>
      <Button size="lg" variant="outline">
        Large
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Button>
    </div>
  ),
};

function ButtonDemo() {
  const [count, setCount] = createSignal(0);

  return (
    <Button type="button" onClick={() => setCount((value) => value + 1)}>
      Clicked {count()}
    </Button>
  );
}

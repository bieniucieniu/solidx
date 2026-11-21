import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CollapsibleDemo />,
};

function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show notes</CollapsibleTrigger>
      <CollapsibleContent>Notes stay hidden until you open them.</CollapsibleContent>
    </Collapsible>
  );
}

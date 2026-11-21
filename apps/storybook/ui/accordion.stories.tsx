import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AccordionDemo />,
};

function AccordionDemo() {
  return (
    <Accordion initialValue="one" class="max-w-md">
      <AccordionItem value="one">
        <AccordionHeader>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Yes. It uses a disclosure pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionHeader>
          <AccordionTrigger>Can I close it?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Yes. This accordion is collapsible.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

import { DocsPage } from "~/components/preview";
import { AccordionDemo } from "~/demos/ui/accordion";
import source from "~/demos/ui/accordion.tsx?raw";

const snippet = `import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@solidx/kit/ui";

// The value is an array of open items. Pass \`multiple\` to open several at once.
<Accordion defaultValue={["one"]}>
  <AccordionItem value="one">
    <AccordionHeader>
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Yes.</AccordionContent>
  </AccordionItem>
</Accordion>`;

export default function AccordionPage() {
  return (
    <DocsPage
      title="Accordion"
      description="Expand and collapse stacked sections."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/accordion.tsx"
    >
      <AccordionDemo />
    </DocsPage>
  );
}

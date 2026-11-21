import { DocsPage } from "~/components/preview";
import { PopoverDemo } from "~/demos/ui/popover";
import source from "~/demos/ui/popover.tsx?raw";

const snippet = `import {
  buttonVariants,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverLabel,
  PopoverTrigger,
} from "@solidx/kit/ui";

<Popover>
  <PopoverTrigger class={buttonVariants()}>Open</PopoverTrigger>
  <PopoverContent>
    <PopoverLabel>Dimensions</PopoverLabel>
    <PopoverDescription>Set the size of the frame.</PopoverDescription>
    <PopoverClose>Close</PopoverClose>
  </PopoverContent>
</Popover>`;

export default function PopoverPage() {
  return (
    <DocsPage
      title="Popover"
      description="A panel anchored to a trigger."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/popover.tsx"
    >
      <PopoverDemo />
    </DocsPage>
  );
}

import { DocsPage } from "~/components/preview";
import { InputGroupDemo } from "~/demos/ui/input-group";
import source from "~/demos/ui/input-group.tsx?raw";

const snippet = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@solidx/kit/ui";

<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="sm">Go</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupTextarea placeholder="Message" />
  <InputGroupAddon align="block-end">
    <InputGroupButton variant="default">Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

export default function InputGroupPage() {
  return (
    <DocsPage
      title="Input group"
      description="An input with extra content beside it."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/input-group.tsx"
    >
      <InputGroupDemo />
    </DocsPage>
  );
}

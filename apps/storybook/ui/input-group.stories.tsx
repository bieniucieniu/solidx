import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/InputGroup",
  component: InputGroup,
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InputGroupDemo />,
};

function InputGroupDemo() {
  const [value, setValue] = createSignal("");

  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder="example.com"
          value={value()}
          onInput={(event) => setValue(event.currentTarget.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Go</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="block-start" class="border-b">
          <InputGroupText>script.ts</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="console.log('hi')" />
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Message" />
        <InputGroupAddon align="block-end" class="border-t">
          <InputGroupButton variant="default" class="ml-auto">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

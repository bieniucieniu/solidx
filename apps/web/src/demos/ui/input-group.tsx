import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Kbd,
} from "@solidx/kit/ui";
import { createSignal } from "solid-js";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function InputGroupDemo() {
  const [url, setUrl] = createSignal("");
  const [message, setMessage] = createSignal("");

  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder="example.com"
          value={url()}
          onInput={(event) => setUrl(event.currentTarget.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Invite by email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Search">
            <SearchIcon />
          </InputGroupButton>
          <InputGroupButton variant="secondary" size="sm">
            Invite
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="block-start" class="border-b">
          <InputGroupText class="font-medium text-foreground">script.ts</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="console.log('hi')" />
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea
          placeholder="Ask, search or chat..."
          value={message()}
          onInput={(event) => setMessage(event.currentTarget.value)}
        />
        <InputGroupAddon align="block-end" class="border-t">
          <InputGroupText>{message().length} / 280</InputGroupText>
          <InputGroupButton variant="default" size="xs" class="ml-auto">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

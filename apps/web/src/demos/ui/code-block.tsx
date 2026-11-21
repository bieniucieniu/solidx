import {
  Button,
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  createHighlightedCode,
} from "@solidx/kit/ui";
import { createSignal, For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const component = `import { createSignal } from "solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
}`;

const buildOutput = `$ pnpm build
vite v8.3.5 building for production...
✓ 412 modules transformed.
dist/index.html                  0.46 kB
dist/assets/index-4f8a1c.css    18.20 kB
dist/assets/index-b72e9d.js    142.71 kB
✓ built in 1.84s`;

const longLine = `const message = "This line is long enough to scroll sideways unless wrapping is turned on, which keeps the whole thing visible.";`;

const logs = Array.from(
  { length: 24 },
  (_, index) => `[12:00:${String(index).padStart(2, "0")}] request ${index + 1} ok`,
).join("\n");

function TerminalIcon() {
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
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  );
}

function WrapIcon() {
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
      <path d="M3 6h18" />
      <path d="M3 12h15a3 3 0 1 1 0 6h-4" />
      <path d="m16 16-2 2 2 2" />
      <path d="M3 18h7" />
    </svg>
  );
}

export function CodeBlockDemo() {
  const highlighted = createHighlightedCode(
    () => component,
    () => "tsx",
  );
  const [wrap, setWrap] = createSignal(false);
  const [expanded, setExpanded] = createSignal(false);

  return (
    <VariantStack class="max-w-xl">
      <VariantRow class="flex-col flex-nowrap items-stretch" label="Header, title and copy">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <TerminalIcon />
              Terminal
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={buildOutput} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent>{buildOutput}</CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow
        class="flex-col flex-nowrap items-stretch"
        label="Syntax highlighting, line numbers, floating actions"
      >
        <CodeBlock>
          <CodeBlockActions>
            <CodeBlockCopyButton value={component} />
          </CodeBlockActions>
          <CodeBlockContent lineNumbers>
            <For each={highlighted()}>{(line) => <CodeBlockLine>{line}</CodeBlockLine>}</For>
          </CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow
        class="flex-col flex-nowrap items-stretch"
        label="Highlighted lines, start line 12"
      >
        <CodeBlock>
          <CodeBlockContent lineNumbers startLine={12}>
            <CodeBlockLine>{"export function Counter() {"}</CodeBlockLine>
            <CodeBlockLine variant="highlighted">
              {"  const [count, setCount] = createSignal(0);"}
            </CodeBlockLine>
            <CodeBlockLine>{"  return <button>{count()}</button>;"}</CodeBlockLine>
            <CodeBlockLine>{"}"}</CodeBlockLine>
          </CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow class="flex-col flex-nowrap items-stretch" label="Diff">
        <CodeBlock>
          <CodeBlockContent>
            <CodeBlockLine>{"const [count, setCount] = createSignal(0);"}</CodeBlockLine>
            <CodeBlockLine variant="removed">
              {"useEffect(() => log(count), [count]);"}
            </CodeBlockLine>
            <CodeBlockLine variant="added">{"createEffect(() => log(count()));"}</CodeBlockLine>
          </CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow class="flex-col flex-nowrap items-stretch" label="Wrap toggle">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>message.ts</CodeBlockTitle>
            <CodeBlockActions>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Wrap lines"
                aria-pressed={wrap() ? "true" : "false"}
                class={{ "bg-muted text-foreground": wrap() }}
                onClick={() => {
                  setWrap(!wrap());
                }}
              >
                <WrapIcon />
              </Button>
              <CodeBlockCopyButton value={longLine} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap={wrap()}>{longLine}</CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow class="flex-col flex-nowrap items-stretch" label="Show more">
        <CodeBlock>
          <CodeBlockContent
            id="code-block-logs"
            class={expanded() ? undefined : "max-h-40 overflow-y-hidden"}
          >
            {logs}
          </CodeBlockContent>
          <CodeBlockFooter class="justify-center">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              aria-expanded={expanded() ? "true" : "false"}
              aria-controls="code-block-logs"
              onClick={() => {
                setExpanded(!expanded());
              }}
            >
              {expanded() ? "Show less" : "Show more"}
            </Button>
          </CodeBlockFooter>
        </CodeBlock>
      </VariantRow>

      <VariantRow class="flex-col flex-nowrap items-stretch" label="Size sm">
        <CodeBlock size="sm">
          <CodeBlockHeader>
            <CodeBlockTitle>tool output</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent>{`{ "status": "ok", "items": 3 }`}</CodeBlockContent>
        </CodeBlock>
      </VariantRow>

      <VariantRow class="flex-col flex-nowrap items-stretch" label="Destructive">
        <CodeBlock variant="destructive">
          <CodeBlockHeader>
            <CodeBlockTitle>Error</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent>
            {
              "TypeError: Cannot read properties of undefined (reading 'map')\n    at List (list.tsx:12:18)"
            }
          </CodeBlockContent>
        </CodeBlock>
      </VariantRow>
    </VariantStack>
  );
}

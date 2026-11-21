import { DocsPage } from "~/components/preview";
import { CodeBlockDemo } from "~/demos/ui/code-block";
import source from "~/demos/ui/code-block.tsx?raw";

const snippet = `import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  createHighlightedCode,
} from "@solidx/kit/ui";
import { For } from "solid-js";

// CodeBlock variant: "default" | "destructive"   size: "default" | "sm"
// CodeBlockContent wrap, lineNumbers, startLine
// CodeBlockLine variant: "default" | "added" | "removed" | "highlighted"
const lines = createHighlightedCode(() => code, () => "tsx");

<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>counter.tsx</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={code} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent lineNumbers>
    <For each={lines()}>{(line) => <CodeBlockLine>{line}</CodeBlockLine>}</For>
  </CodeBlockContent>
</CodeBlock>

// Plain text: pass a string and it is split into lines.
<CodeBlock>
  <CodeBlockContent>{output}</CodeBlockContent>
</CodeBlock>`;

export default function CodeBlockPage() {
  return (
    <DocsPage
      title="Code block"
      description="Code with a title bar, copy button, line numbers, diffs, and Shiki syntax highlighting."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/code-block.tsx"
    >
      <CodeBlockDemo />
    </DocsPage>
  );
}

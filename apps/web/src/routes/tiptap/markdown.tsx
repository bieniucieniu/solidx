import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/tiptap/markdown.tsx?raw";

const MarkdownEditor = clientOnly(() => import("~/demos/tiptap/markdown"));

const snippet = `import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Tiptap, useEditor } from "@solidx/kit/tiptap";

const editor = useEditor(() => ({
  extensions: [StarterKit, Markdown],
  content: "# Markdown",
}));`;

export default function MarkdownPage() {
  return (
    <DocsPage
      title="Markdown"
      description="Edit rich text and read markdown output."
      snippet={snippet}
      source={source}
      sourceTitle="demos/tiptap/markdown.tsx"
    >
      <MarkdownEditor fallback={<div class="min-h-[300px]" />} />
    </DocsPage>
  );
}

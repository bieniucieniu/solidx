import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/tiptap/basic.tsx?raw";

const BasicEditor = clientOnly(() => import("~/demos/tiptap/basic"));

const snippet = `import StarterKit from "@tiptap/starter-kit";
import { Tiptap, TiptapContent, useEditor } from "@solidx/kit/tiptap";

const editor = useEditor(() => ({
  extensions: [StarterKit],
  content: "<p>Hello world</p>",
}));

<Tiptap editor={editor}>
  <TiptapContent />
</Tiptap>`;

export default function BasicPage() {
  return (
    <DocsPage
      title="Basic"
      description="Starter kit editor with a formatting toolbar."
      snippet={snippet}
      source={source}
      sourceTitle="demos/tiptap/basic.tsx"
    >
      <BasicEditor fallback={<div class="min-h-[300px]" />} />
    </DocsPage>
  );
}

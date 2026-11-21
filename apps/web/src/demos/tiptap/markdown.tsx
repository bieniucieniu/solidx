import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Tiptap, TiptapContent, useEditor, useTiptapState } from "@solidx/kit/tiptap";
import { CodeExample } from "~/components/preview";
import { MenuBar } from "./menu-bar";

export default function MarkdownEditor() {
  const editor = useEditor(() => ({
    extensions: [StarterKit, Markdown, Placeholder.configure({ placeholder: "Try markdown..." })],
    content: `
# Markdown Support
You can **copy/paste** markdown here, or export the content as markdown!
- Lists work
- *Italics* work
- [Links](https://tiptap.dev) work
    `,
  }));

  const markdown = useTiptapState({
    editor,
    selector: (snapshot) => {
      const storage = snapshot.editor?.storage as
        | { markdown?: { getMarkdown?: () => string } }
        | undefined;
      return storage?.markdown?.getMarkdown?.() ?? "";
    },
  });

  return (
    <div class="space-y-4">
      <div class="tiptap-editor">
        <Tiptap editor={editor}>
          <MenuBar />
          <TiptapContent />
        </Tiptap>
      </div>
      <CodeExample code={markdown()} language="markdown" title="Markdown output" wrap />
    </div>
  );
}

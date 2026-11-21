import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Tiptap, TiptapContent, useEditor, useTiptapState } from "@solidx/kit-1.9/tiptap";
import { MenuBar } from "./menu-bar";

const meta = {
  title: "Tiptap/Markdown",
  component: Tiptap,
} as Meta<typeof Tiptap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MarkdownEditor />,
};

function MarkdownEditor() {
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
      <div class="rounded-lg border border-dashed border-border bg-muted p-6">
        <h3 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
          Markdown Output
        </h3>
        <pre class="overflow-auto font-mono text-sm whitespace-pre-wrap text-foreground">
          {markdown()}
        </pre>
      </div>
    </div>
  );
}

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Tiptap, TiptapContent, useEditor } from "@solidx/kit/tiptap";
import { MenuBar } from "./menu-bar";

export default function BasicEditor() {
  const editor = useEditor(() => ({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "Write something..." })],
    content: `
      <h2>Basic Setup</h2>
      <p>This is a minimal Tiptap SolidJS integration.</p>
    `,
  }));

  return (
    <div class="tiptap-editor">
      <Tiptap editor={editor}>
        <MenuBar />
        <TiptapContent />
      </Tiptap>
    </div>
  );
}

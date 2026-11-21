import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Show } from "solid-js";
import { Tiptap, TiptapContent, useEditor } from "@solidx/kit/tiptap";
import { BubbleMenu, FloatingMenu } from "@solidx/kit/tiptap/menus";
import { BlockButtons, HeadingButtons, MarkButtons, useMenuState } from "./menu-bar";

const menuClass =
  "flex items-center gap-1 rounded-full bg-surface-container p-1 text-on-surface-variant shadow-level-3";

function SelectionTools() {
  const state = useMenuState();
  return <MarkButtons state={state} />;
}

function NewLineTools() {
  const state = useMenuState();
  return (
    <>
      <HeadingButtons state={state} levels={[1, 2]} />
      <BlockButtons state={state} compact />
    </>
  );
}

export default function MenusEditor() {
  const editor = useEditor(() => ({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Select text or start a new line...",
      }),
    ],
    content: `
      <p>Try selecting some text to see the <strong>Bubble Menu</strong>.</p>
      <p>Or start a new empty line to see the <strong>Floating Menu</strong>.</p>
      <p></p>
    `,
  }));

  return (
    <div class="tiptap-editor relative">
      <Tiptap editor={editor}>
        <Show when={editor()}>
          {(current) => (
            <>
              <BubbleMenu editor={current()} class={menuClass}>
                <SelectionTools />
              </BubbleMenu>
              <FloatingMenu editor={current()} class={menuClass}>
                <NewLineTools />
              </FloatingMenu>
            </>
          )}
        </Show>
        <TiptapContent />
      </Tiptap>
    </div>
  );
}

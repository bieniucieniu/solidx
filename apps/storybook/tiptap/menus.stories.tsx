import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Show } from "solid-js";
import { Tiptap, TiptapContent, useEditor } from "@solidx/kit-1.9/tiptap";
import { BubbleMenu, FloatingMenu } from "@solidx/kit-1.9/tiptap/menus";
import { BlockButtons, HeadingButtons, MarkButtons, useMenuState } from "./menu-bar";

const meta = {
  title: "Tiptap/Menus",
  component: Tiptap,
} as Meta<typeof Tiptap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MenusEditor />,
};

const menuClass =
  "flex items-center gap-1 rounded-lg border border-border bg-popover p-1 shadow-md";

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

function MenusEditor() {
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

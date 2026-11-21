import { For, type JSX, Show } from "solid-js";
import { Button, ButtonGroup, Toggle } from "@solidx/kit-1.9/ui";
import { useTiptap, useTiptapState } from "@solidx/kit-1.9/tiptap";

const inactive = {
  isBold: false,
  isItalic: false,
  isStrike: false,
  isCode: false,
  isHeading1: false,
  isHeading2: false,
  isHeading3: false,
  isBulletList: false,
  isOrderedList: false,
  isBlockquote: false,
  isCodeBlock: false,
  canUndo: false,
  canRedo: false,
};

export type MenuState = () => typeof inactive;

/** Reads the active marks and nodes once per editor transaction. */
export function useMenuState(): MenuState {
  const ctx = useTiptap();
  const states = useTiptapState({
    editor: () => ctx.editor,
    selector: (snapshot) => {
      const editor = snapshot.editor;
      if (!editor) return inactive;
      return {
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isStrike: editor.isActive("strike"),
        isCode: editor.isActive("code"),
        isHeading1: editor.isActive("heading", { level: 1 }),
        isHeading2: editor.isActive("heading", { level: 2 }),
        isHeading3: editor.isActive("heading", { level: 3 }),
        isBulletList: editor.isActive("bulletList"),
        isOrderedList: editor.isActive("orderedList"),
        isBlockquote: editor.isActive("blockquote"),
        isCodeBlock: editor.isActive("codeBlock"),
        canUndo: editor.can().chain().focus().undo().run(),
        canRedo: editor.can().chain().focus().redo().run(),
      };
    },
  });
  return () => states() ?? inactive;
}

/** Keeps the editor selection when a toolbar control is pressed. */
function keepSelection(event: MouseEvent) {
  event.preventDefault();
}

export function MenuToggle(props: {
  label: string;
  pressed: boolean;
  onToggle: () => void;
  children: JSX.Element;
}) {
  return (
    <Toggle
      variant="outline"
      aria-label={props.label}
      title={props.label}
      pressed={props.pressed}
      onChange={() => props.onToggle()}
      onMouseDown={keepSelection}
    >
      {props.children}
    </Toggle>
  );
}

function Icon(props: { children: JSX.Element }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  );
}

export function MarkButtons(props: { state: MenuState }) {
  const ctx = useTiptap();
  return (
    <ButtonGroup aria-label="Text style">
      <MenuToggle
        label="Bold"
        pressed={props.state().isBold}
        onToggle={() => ctx.editor.chain().focus().toggleBold().run()}
      >
        <span class="font-bold">B</span>
      </MenuToggle>
      <MenuToggle
        label="Italic"
        pressed={props.state().isItalic}
        onToggle={() => ctx.editor.chain().focus().toggleItalic().run()}
      >
        <span class="font-serif italic">I</span>
      </MenuToggle>
      <MenuToggle
        label="Strikethrough"
        pressed={props.state().isStrike}
        onToggle={() => ctx.editor.chain().focus().toggleStrike().run()}
      >
        <span class="line-through">S</span>
      </MenuToggle>
      <MenuToggle
        label="Inline code"
        pressed={props.state().isCode}
        onToggle={() => ctx.editor.chain().focus().toggleCode().run()}
      >
        <Icon>
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </Icon>
      </MenuToggle>
    </ButtonGroup>
  );
}

type HeadingLevel = 1 | 2 | 3;
const headingLevels: HeadingLevel[] = [1, 2, 3];

export function HeadingButtons(props: { state: MenuState; levels?: HeadingLevel[] }) {
  const ctx = useTiptap();
  const pressed = (level: HeadingLevel) =>
    level === 1
      ? props.state().isHeading1
      : level === 2
        ? props.state().isHeading2
        : props.state().isHeading3;

  return (
    <ButtonGroup aria-label="Headings">
      <For each={props.levels ?? headingLevels}>
        {(level) => (
          <MenuToggle
            label={`Heading ${level}`}
            pressed={pressed(level)}
            onToggle={() => ctx.editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </MenuToggle>
        )}
      </For>
    </ButtonGroup>
  );
}

export function BlockButtons(props: { state: MenuState; compact?: boolean }) {
  const ctx = useTiptap();
  return (
    <ButtonGroup aria-label="Blocks">
      <MenuToggle
        label="Bullet list"
        pressed={props.state().isBulletList}
        onToggle={() => ctx.editor.chain().focus().toggleBulletList().run()}
      >
        <Icon>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4 6h.01M4 12h.01M4 18h.01" />
        </Icon>
      </MenuToggle>
      <MenuToggle
        label="Ordered list"
        pressed={props.state().isOrderedList}
        onToggle={() => ctx.editor.chain().focus().toggleOrderedList().run()}
      >
        <Icon>
          <path d="M10 6h10M10 12h10M10 18h10" />
          <path d="M4 5h1v4M4 9h2M4 15h2l-2 3h2" />
        </Icon>
      </MenuToggle>
      <Show when={!props.compact}>
        <MenuToggle
          label="Quote"
          pressed={props.state().isBlockquote}
          onToggle={() => ctx.editor.chain().focus().toggleBlockquote().run()}
        >
          <Icon>
            <path d="M5 6v12" />
            <path d="M10 8h9M10 12h9M10 16h6" />
          </Icon>
        </MenuToggle>
        <MenuToggle
          label="Code block"
          pressed={props.state().isCodeBlock}
          onToggle={() => ctx.editor.chain().focus().toggleCodeBlock().run()}
        >
          <Icon>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="m10 10-2 2 2 2M14 10l2 2-2 2" />
          </Icon>
        </MenuToggle>
      </Show>
    </ButtonGroup>
  );
}

export function HistoryButtons(props: { state: MenuState }) {
  const ctx = useTiptap();
  return (
    <ButtonGroup aria-label="History">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Undo"
        title="Undo"
        disabled={!props.state().canUndo}
        onMouseDown={keepSelection}
        onClick={() => ctx.editor.chain().focus().undo().run()}
      >
        <Icon>
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
        </Icon>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Redo"
        title="Redo"
        disabled={!props.state().canRedo}
        onMouseDown={keepSelection}
        onClick={() => ctx.editor.chain().focus().redo().run()}
      >
        <Icon>
          <path d="m15 14 5-5-5-5" />
          <path d="M20 9H9a5 5 0 0 0 0 10h3" />
        </Icon>
      </Button>
    </ButtonGroup>
  );
}

export function MenuBar() {
  const state = useMenuState();
  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      class="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2"
    >
      <MarkButtons state={state} />
      <HeadingButtons state={state} />
      <BlockButtons state={state} />
      <HistoryButtons state={state} />
    </div>
  );
}

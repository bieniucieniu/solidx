import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/tiptap/menus.tsx?raw";

const MenusEditor = clientOnly(() => import("~/demos/tiptap/menus"));

const snippet = `import { BubbleMenu, FloatingMenu } from "@solidx/kit/tiptap/menus";

<BubbleMenu editor={editor()}>B</BubbleMenu>
<FloatingMenu editor={editor()}>H1</FloatingMenu>`;

export default function MenusPage() {
  return (
    <DocsPage
      title="Menus"
      description="Bubble menu on selection and floating menu on an empty line."
      snippet={snippet}
      source={source}
      sourceTitle="demos/tiptap/menus.tsx"
    >
      <MenusEditor fallback={<div class="min-h-[300px]" />} />
    </DocsPage>
  );
}

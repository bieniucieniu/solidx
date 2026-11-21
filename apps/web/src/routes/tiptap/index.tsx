import { PackageIndex } from "~/components/package-index";
import { sidebars } from "~/nav";

const pages = sidebars.tiptap.slice(1);

export default function TiptapIndex() {
  return (
    <PackageIndex
      title="Tiptap"
      description="Basic, markdown, and menu editors."
      snippet={'import { Tiptap, useEditor } from "@solidx/kit/tiptap";'}
      pages={pages}
    />
  );
}

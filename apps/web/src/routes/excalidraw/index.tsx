import { PackageIndex } from "~/components/package-index";
import { sidebars } from "~/nav";

const pages = sidebars.excalidraw.slice(1);

export default function ExcalidrawIndex() {
  return (
    <PackageIndex
      title="Excalidraw (alpha)"
      description="The Excalidraw editor ported to Solid 2.0, headless: it draws the canvas, and hooks give your UI its tools, properties, menus, and history."
      snippet={'import { Excalidraw, useTool, useProperty } from "@solidx/excalidraw";'}
      pages={pages}
    />
  );
}

import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/excalidraw/ui.tsx?raw";

const UiDemo = clientOnly(() => import("~/demos/excalidraw/ui"));

const snippet = `import { Excalidraw, useProperty, useTool } from "@solidx/excalidraw";
import { TOOL_ICONS } from "@solidx/excalidraw/icons";
import "@solidx/excalidraw/style.css";

function Toolbar() {
  const tool = useTool();
  // tool.active(), tool.set("rectangle"), tool.toggleLock()
}

function StrokeColor() {
  const stroke = useProperty("strokeColor");
  // stroke.value(), stroke.set("#1971c2"), stroke.enabled()
}

<Excalidraw>
  <Toolbar />
  <StrokeColor />
</Excalidraw>`;

export default function ExcalidrawUiDemoPage() {
  return (
    <DocsPage
      title="UI chrome"
      description="A toolbar, properties panel, menus, and controls built from @solidx/kit/ui."
      snippet={snippet}
      source={source}
      sourceTitle="demos/excalidraw/ui.tsx"
      previewClass="p-0"
    >
      <UiDemo fallback={<div class="h-[640px]" />} />
    </DocsPage>
  );
}

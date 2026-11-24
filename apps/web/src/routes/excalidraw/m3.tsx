import { clientOnly } from "@solidjs/web";
import { DocsPage } from "~/components/preview";
import source from "~/demos/excalidraw/m3.tsx?raw";

const M3Demo = clientOnly(() => import("~/demos/excalidraw/m3"));

const snippet = `import { Excalidraw, useProperty, useTool } from "@solidx/excalidraw";
import "@solidx/excalidraw/style.css";
// bring your own fonts: { Excalifont: [{ url, unicodeRange }], Nunito: … }
import { fonts } from "./fonts";

function Toolbar() {
  const tool = useTool();
  // tool.active(), tool.set("rectangle"), tool.toggleLock()
}

function StrokeColor() {
  const stroke = useProperty("strokeColor");
  // stroke.value(), stroke.set("#1971c2"), stroke.enabled()
}

<Excalidraw fonts={fonts}>
  <Toolbar />
  <StrokeColor />
</Excalidraw>`;

export default function ExcalidrawM3DemoPage() {
  // `data-m3` points the demo's primary/secondary colors at the M3 scheme
  return (
    <div data-m3>
      <DocsPage
        title="Material 3 chrome"
        description="The same editor UI built from @solidx/kit/m3."
        snippet={snippet}
        source={source}
        sourceTitle="demos/excalidraw/m3.tsx"
        previewClass="p-0"
      >
        <M3Demo fallback={<div class="h-[640px]" />} />
      </DocsPage>
    </div>
  );
}

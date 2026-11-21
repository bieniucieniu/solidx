import { DocsPage } from "~/components/preview";
import { SwitchDemo } from "~/demos/m3/switch";
import source from "~/demos/m3/switch.tsx?raw";

const snippet = `import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "@solidx/kit/m3";

// Switch is the label; the state goes on SwitchControl.
<Switch>
  <SwitchControl defaultChecked>
    <SwitchThumb icons />
  </SwitchControl>
  <SwitchLabel>Wi-Fi</SwitchLabel>
</Switch>`;

export default function SwitchPage() {
  return (
    <DocsPage
      title="Switch"
      description="Turn a single setting on or off. The handle grows when on and when pressed."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/switch.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SwitchDemo />
    </DocsPage>
  );
}

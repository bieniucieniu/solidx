import { DocsPage } from "~/components/preview";
import { NativeSelectDemo } from "~/demos/ui/native-select";
import source from "~/demos/ui/native-select.tsx?raw";

const snippet = `import { NativeSelect } from "@solidx/kit/ui";

// size: "sm" | "default"
<NativeSelect size="sm" value={fruit()} onInput={(event) => setFruit(event.currentTarget.value)}>
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
</NativeSelect>`;

export default function NativeSelectPage() {
  return (
    <DocsPage
      title="Native select"
      description="A styled native select."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/native-select.tsx"
    >
      <NativeSelectDemo />
    </DocsPage>
  );
}

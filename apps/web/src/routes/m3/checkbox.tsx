import { DocsPage } from "~/components/preview";
import { CheckboxDemo } from "~/demos/m3/checkbox";
import source from "~/demos/m3/checkbox.tsx?raw";

const snippet = `import { Checkbox, CheckboxControl, CheckboxLabel } from "@solidx/kit/m3";

// Checkbox is the label; the state goes on CheckboxControl.
// \`checked\`: true | false | "indeterminate"
<Checkbox>
  <CheckboxControl defaultChecked />
  <CheckboxLabel>Remember me</CheckboxLabel>
</Checkbox>`;

export default function CheckboxPage() {
  return (
    <DocsPage
      title="Checkbox"
      description="Select one or more items. Checked, indeterminate, error, and disabled states."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/checkbox.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <CheckboxDemo />
    </DocsPage>
  );
}

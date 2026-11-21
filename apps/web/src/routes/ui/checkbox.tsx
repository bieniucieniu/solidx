import { DocsPage } from "~/components/preview";
import { CheckboxDemo } from "~/demos/ui/checkbox";
import source from "~/demos/ui/checkbox.tsx?raw";

const snippet = `import { Checkbox, CheckboxLabel } from "@solidx/kit/ui";

// \`checked\`: true | false | "indeterminate"
<CheckboxLabel>
  <Checkbox checked={checked()} onCheckedChange={(next) => setChecked(next === true)} />
  Accept terms
</CheckboxLabel>`;

export default function CheckboxPage() {
  return (
    <DocsPage
      title="Checkbox"
      description="A labeled checkbox."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/checkbox.tsx"
    >
      <CheckboxDemo />
    </DocsPage>
  );
}

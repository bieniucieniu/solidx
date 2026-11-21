import { DocsPage } from "~/components/preview";
import { FieldDemo } from "~/demos/ui/field";
import source from "~/demos/ui/field.tsx?raw";

const snippet = `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@solidx/kit/ui";

// orientation: "vertical" | "horizontal" | "responsive"
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel for="city">City</FieldLabel>
      <input id="city" placeholder="Paris" />
      <FieldDescription>Where you work.</FieldDescription>
    </Field>
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel for="public">Public profile</FieldLabel>
        <FieldDescription>Anyone can see your name.</FieldDescription>
      </FieldContent>
      <Switch id="public">...</Switch>
    </Field>
  </FieldGroup>
</FieldSet>`;

export default function FieldPage() {
  return (
    <DocsPage
      title="Field"
      description="A label and description around a control."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/field.tsx"
    >
      <FieldDemo />
    </DocsPage>
  );
}

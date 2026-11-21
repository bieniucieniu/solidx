import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Switch,
} from "@solidx/kit/ui";

const inputClass =
  "h-7 w-full rounded-md border border-input bg-input/20 px-2 text-xs/relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30";

export function FieldDemo() {
  return (
    <FieldSet class="w-full max-w-md">
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Each field below uses a different orientation.</FieldDescription>
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel for="field-city">City (vertical)</FieldLabel>
          <input id="field-city" class={inputClass} placeholder="Paris" />
          <FieldDescription>Where you work.</FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="field-public">Public profile (horizontal)</FieldLabel>
            <FieldDescription>Anyone can see your name.</FieldDescription>
          </FieldContent>
          <Switch id="field-public" />
        </Field>
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel for="field-name">Name (responsive)</FieldLabel>
            <FieldDescription>Row on wide groups, column on narrow.</FieldDescription>
          </FieldContent>
          <input id="field-name" class={inputClass} placeholder="Ada Lovelace" />
        </Field>
        <Field orientation="vertical" data-invalid="true">
          <FieldLabel for="field-email">Email</FieldLabel>
          <input id="field-email" class={inputClass} aria-invalid="true" value="ada@" />
          <FieldError>Enter a valid email.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

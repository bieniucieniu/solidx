import { Checkbox, CheckboxControl, CheckboxLabel } from "@solidx/kit/m3";
import { DemoRow, DemoStack } from "./shared";

function Example(props: {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <Checkbox>
      <CheckboxControl
        defaultChecked={props.indeterminate ? "indeterminate" : props.checked}
        disabled={props.disabled}
        aria-invalid={props.invalid ? "true" : undefined}
      />
      <CheckboxLabel>{props.label}</CheckboxLabel>
    </Checkbox>
  );
}

export function CheckboxDemo() {
  return (
    <DemoStack>
      <DemoRow label="States" class="flex-col items-start gap-0">
        <Example label="Unchecked" />
        <Example label="Checked" checked />
        <Example label="Indeterminate" indeterminate />
        <Example label="Error" invalid checked />
        <Example label="Disabled" disabled checked />
      </DemoRow>
    </DemoStack>
  );
}

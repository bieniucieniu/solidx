import {
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
} from "@solidx/kit-1.9/m3";
import { DemoRow, DemoStack } from "./shared";

function Example(props: {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <Checkbox
      defaultChecked={props.checked}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
      validationState={props.invalid ? "invalid" : undefined}
    >
      <CheckboxInput />
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
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

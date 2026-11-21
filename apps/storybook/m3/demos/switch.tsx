import { Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb } from "@solidx/kit-1.9/m3";
import { DemoRow, DemoStack } from "./shared";

function Example(props: { label: string; checked?: boolean; icons?: boolean; disabled?: boolean }) {
  return (
    <Switch defaultChecked={props.checked} disabled={props.disabled}>
      <SwitchInput />
      <SwitchControl>
        <SwitchThumb icons={props.icons} />
      </SwitchControl>
      <SwitchLabel>{props.label}</SwitchLabel>
    </Switch>
  );
}

export function SwitchDemo() {
  return (
    <DemoStack>
      <DemoRow label="Plain" class="flex-col items-start">
        <Example label="Wi-Fi" checked />
        <Example label="Bluetooth" />
      </DemoRow>
      <DemoRow label="With icons" class="flex-col items-start">
        <Example label="Dark theme" icons checked />
        <Example label="Battery saver" icons />
      </DemoRow>
      <DemoRow label="Disabled" class="flex-col items-start">
        <Example label="Airplane mode" disabled checked />
        <Example label="Hotspot" disabled />
      </DemoRow>
    </DemoStack>
  );
}

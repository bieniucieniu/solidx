import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb } from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

const meta = {
  title: "UI/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SwitchDemo />,
};

function SwitchDemo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch checked={checked()} onChange={setChecked}>
      <SwitchInput />
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Airplane mode</SwitchLabel>
    </Switch>
  );
}

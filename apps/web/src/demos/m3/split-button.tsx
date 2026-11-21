import {
  type ButtonSize,
  Menu,
  MenuContent,
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  type SplitButtonVariant,
} from "@solidx/kit/m3";
import { For } from "solid-js";
import { DemoRow, DemoStack, SendIcon } from "./shared";

const variants: SplitButtonVariant[] = ["elevated", "filled", "tonal", "outlined"];
const sizes: ButtonSize[] = ["xs", "sm", "md", "lg"];

function Example(props: { variant?: SplitButtonVariant; size?: ButtonSize }) {
  return (
    <SplitButton variant={props.variant} size={props.size}>
      <SplitButtonAction>
        <SendIcon />
        Send
      </SplitButtonAction>
      <Menu>
        <SplitButtonTrigger aria-label="More send options" />
        <MenuContent align="end">
          <MenuItem>Schedule send</MenuItem>
          <MenuItem>Send without sound</MenuItem>
        </MenuContent>
      </Menu>
    </SplitButton>
  );
}

export function SplitButtonDemo() {
  return (
    <DemoStack>
      <DemoRow label="Colors">
        <For each={variants}>{(variant) => <Example variant={variant} />}</For>
      </DemoRow>
      <DemoRow label="Sizes">
        <For each={sizes}>{(size) => <Example variant="tonal" size={size} />}</For>
      </DemoRow>
    </DemoStack>
  );
}

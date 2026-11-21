import {
  type ButtonSize,
  Menu,
  MenuContent,
  MenuItem,
  MenuPortal,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  type SplitButtonVariant,
} from "@solidx/kit-1.9/m3";
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
      <Menu placement="bottom-end">
        <SplitButtonTrigger aria-label="More send options" />
        <MenuPortal>
          <MenuContent>
            <MenuItem>Schedule send</MenuItem>
            <MenuItem>Send without sound</MenuItem>
          </MenuContent>
        </MenuPortal>
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

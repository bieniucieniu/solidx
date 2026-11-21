import { SegmentedButton, SegmentedButtonIcon, SegmentedButtonItem } from "@solidx/kit/m3";
import { createSignal } from "solid-js";
import { DemoRow, DemoStack, HomeIcon, MailIcon, PersonIcon } from "./shared";

export function SegmentedButtonDemo() {
  const [size, setSize] = createSignal(["m"]);
  return (
    <DemoStack>
      <DemoRow label="Single select">
        <SegmentedButton
          value={size()}
          onValueChange={(value) => {
            // Single select keeps one segment pressed.
            if ((value as string[]).length) setSize(value as string[]);
          }}
          class="w-full max-w-sm"
        >
          <SegmentedButtonItem value="s">Small</SegmentedButtonItem>
          <SegmentedButtonItem value="m">Medium</SegmentedButtonItem>
          <SegmentedButtonItem value="l">Large</SegmentedButtonItem>
        </SegmentedButton>
      </DemoRow>
      <DemoRow label="Multi select, with icons">
        <SegmentedButton multiple defaultValue={["home"]} class="w-full max-w-md">
          <SegmentedButtonItem value="home">
            <SegmentedButtonIcon>
              <HomeIcon />
            </SegmentedButtonIcon>
            Home
          </SegmentedButtonItem>
          <SegmentedButtonItem value="mail">
            <SegmentedButtonIcon>
              <MailIcon />
            </SegmentedButtonIcon>
            Mail
          </SegmentedButtonItem>
          <SegmentedButtonItem value="people">
            <SegmentedButtonIcon>
              <PersonIcon />
            </SegmentedButtonIcon>
            People
          </SegmentedButtonItem>
        </SegmentedButton>
      </DemoRow>
    </DemoStack>
  );
}

import { SegmentedButton, SegmentedButtonIcon, SegmentedButtonItem } from "@solidx/kit-1.9/m3";
import { createSignal } from "solid-js";
import { DemoRow, DemoStack, HomeIcon, MailIcon, PersonIcon } from "./shared";

export function SegmentedButtonDemo() {
  const [size, setSize] = createSignal("m");
  return (
    <DemoStack>
      <DemoRow label="Single select">
        <SegmentedButton
          value={size()}
          onChange={(value) => value && setSize(value)}
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

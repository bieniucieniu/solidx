import { Badge, BadgeAnchor } from "@solidx/kit/m3";
import { DemoRow, DemoStack, MailIcon } from "./shared";

export function BadgeDemo() {
  return (
    <DemoStack>
      <DemoRow label="Standalone">
        <Badge size="small" />
        <Badge>3</Badge>
        <Badge>999+</Badge>
      </DemoRow>
      <DemoRow label="On an icon" class="gap-8">
        <BadgeAnchor>
          <MailIcon class="size-6 text-on-surface-variant" />
          <Badge size="small" />
        </BadgeAnchor>
        <BadgeAnchor>
          <MailIcon class="size-6 text-on-surface-variant" />
          <Badge>12</Badge>
        </BadgeAnchor>
      </DemoRow>
    </DemoStack>
  );
}

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImg,
} from "@solidx/kit/ui";
import { For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const sizes = ["sm", "default", "lg"] as const;

export function AvatarDemo() {
  return (
    <VariantStack>
      <VariantRow label="Sizes">
        <For each={sizes}>
          {(size) => (
            <Avatar size={size}>
              <AvatarImg src="https://github.com/solidjs.png" alt="Solid" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Fallback">
        <For each={sizes}>
          {(size) => (
            <Avatar size={size}>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          )}
        </For>
      </VariantRow>
      <VariantRow label="Badge">
        <Avatar>
          <AvatarFallback>AL</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </VariantRow>
      <VariantRow label="Group">
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>KJ</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </VariantRow>
    </VariantStack>
  );
}

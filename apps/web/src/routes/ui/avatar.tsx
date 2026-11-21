import { DocsPage } from "~/components/preview";
import { AvatarDemo } from "~/demos/ui/avatar";
import source from "~/demos/ui/avatar.tsx?raw";

const snippet = `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImg,
} from "@solidx/kit/ui";

// size: "sm" | "default" | "lg"
<Avatar size="lg">
  <AvatarImg src="https://github.com/solidjs.png" alt="Solid" />
  <AvatarFallback>SJ</AvatarFallback>
  <AvatarBadge />
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>GH</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`;

export default function AvatarPage() {
  return (
    <DocsPage
      title="Avatar"
      description="An image with a fallback."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/avatar.tsx"
    >
      <AvatarDemo />
    </DocsPage>
  );
}

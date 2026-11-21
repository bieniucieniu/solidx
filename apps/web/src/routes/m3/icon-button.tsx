import { DocsPage } from "~/components/preview";
import { IconButtonDemo } from "~/demos/m3/icon-button";
import source from "~/demos/m3/icon-button.tsx?raw";

const snippet = `import { IconButton, ToggleIconButton } from "@solidx/kit/m3";

// variant: "standard" | "filled" | "tonal" | "outlined"
// size: "xs" | "sm" | "md" | "lg" | "xl"; width: "narrow" | "default" | "wide"
<IconButton aria-label="Settings"><SettingsIcon /></IconButton>
<ToggleIconButton variant="filled" aria-label="Favorite"><FavoriteIcon /></ToggleIconButton>`;

export default function IconButtonPage() {
  return (
    <DocsPage
      title="Icon button"
      description="Single-icon actions in four colors, five sizes, and three widths."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/icon-button.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <IconButtonDemo />
    </DocsPage>
  );
}

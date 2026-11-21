import { DocsPage } from "~/components/preview";
import { FoundationsDemo } from "~/demos/m3/foundations";
import source from "~/demos/m3/foundations.tsx?raw";

const snippet = `/* app.css */
@import "@solidx/kit/m3/theme.css";

/* Color roles */
<div class="bg-primary-container text-on-primary-container" />
<div class="bg-surface-container-high text-on-surface-variant" />

/* Type scale: one class per M3 style */
<h1 class="typescale-headline-large" />

/* Shape, elevation, motion */
<div class="rounded-extra-large shadow-level-2 motion-fast" />

/* State layer and focus ring for custom controls */
<button class="relative state-layer focus-ring" />`;

export default function FoundationsPage() {
  return (
    <DocsPage
      title="Foundations"
      description="Color roles, type scale, shape, and elevation tokens as Tailwind utilities."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/foundations.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <FoundationsDemo />
    </DocsPage>
  );
}

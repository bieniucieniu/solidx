import { DocsPage } from "~/components/preview";
import { SnackbarDemo } from "~/demos/m3/snackbar";
import source from "~/demos/m3/snackbar.tsx?raw";

const snippet = `import { SnackbarRegion, snackbar } from "@solidx/kit/m3";

// Mount once. Snackbars have their own queue, apart from other toasts.
<SnackbarRegion />

snackbar("Message archived", { action: { label: "Undo", onAction: () => undo() } });`;

export default function SnackbarPage() {
  return (
    <DocsPage
      title="Snackbar"
      description="Short updates at the bottom of the screen, in their own toast region."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/snackbar.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SnackbarDemo />
    </DocsPage>
  );
}

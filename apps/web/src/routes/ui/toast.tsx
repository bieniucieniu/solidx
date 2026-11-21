import { DocsPage } from "~/components/preview";
import { ToastDemo } from "~/demos/ui/toast";
import source from "~/demos/ui/toast.tsx?raw";

const snippet = `import { ToastRegion, toast } from "@solidx/kit/ui";

// Mount once, near the app root.
<ToastRegion />

toast("Saved", {
  description: "Your changes are stored.",
  action: { label: "Undo", onAction: () => undo() },
});`;

export default function ToastPage() {
  return (
    <DocsPage
      title="Toast"
      description="A short message that appears on demand."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/toast.tsx"
    >
      <ToastDemo />
    </DocsPage>
  );
}

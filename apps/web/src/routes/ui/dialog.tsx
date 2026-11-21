import { DocsPage } from "~/components/preview";
import { DialogDemo } from "~/demos/ui/dialog";
import source from "~/demos/ui/dialog.tsx?raw";

const snippet = `import {
  buttonVariants,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogLabel,
  DialogOverlay,
  DialogTrigger,
} from "@solidx/kit/ui";

<Dialog>
  <DialogTrigger class={buttonVariants()}>Open</DialogTrigger>
  <DialogOverlay />
  <DialogContent>
    <DialogLabel>Edit profile</DialogLabel>
    <DialogDescription>Details</DialogDescription>
    <DialogClose>Close</DialogClose>
  </DialogContent>
</Dialog>`;

export default function DialogPage() {
  return (
    <DocsPage
      title="Dialog"
      description="Modal dialog with overlay, title, and close."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/dialog.tsx"
    >
      <DialogDemo />
    </DocsPage>
  );
}

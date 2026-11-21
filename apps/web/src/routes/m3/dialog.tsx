import { DocsPage } from "~/components/preview";
import { DialogDemo } from "~/demos/m3/dialog";
import source from "~/demos/m3/dialog.tsx?raw";

const snippet = `import { Dialog, DialogActions, DialogClose, DialogContent, DialogDescription, DialogHeadline, DialogOverlay, DialogTrigger, buttonVariants } from "@solidx/kit/m3";

<Dialog>
  <DialogTrigger class={buttonVariants()}>Delete</DialogTrigger>
  <DialogOverlay />
  <DialogContent>
    <DialogHeadline>Permanently delete?</DialogHeadline>
    <DialogDescription>This can't be undone.</DialogDescription>
    <DialogActions>
      <DialogClose>Cancel</DialogClose>
      <DialogClose>Delete</DialogClose>
    </DialogActions>
  </DialogContent>
</Dialog>`;

export default function DialogPage() {
  return (
    <DocsPage
      title="Dialog"
      description="Basic and full-screen dialogs."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/dialog.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <DialogDemo />
    </DocsPage>
  );
}

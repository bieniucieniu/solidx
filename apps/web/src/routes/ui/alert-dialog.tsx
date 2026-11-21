import { DocsPage } from "~/components/preview";
import { AlertDialogDemo } from "~/demos/ui/alert-dialog";
import source from "~/demos/ui/alert-dialog.tsx?raw";

const snippet = `import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogLabel,
  AlertDialogOverlay,
  AlertDialogTrigger,
  buttonVariants,
} from "@solidx/kit/ui";

// AlertDialogContent size: "default" | "sm"
<AlertDialog>
  <AlertDialogTrigger class={buttonVariants()}>Delete</AlertDialogTrigger>
  <AlertDialogOverlay />
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogLabel>Delete this file?</AlertDialogLabel>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose>Cancel</AlertDialogClose>
      <AlertDialogClose variant="destructive">Delete</AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

export default function AlertDialogPage() {
  return (
    <DocsPage
      title="Alert dialog"
      description="A modal that asks for confirmation."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/alert-dialog.tsx"
    >
      <AlertDialogDemo />
    </DocsPage>
  );
}

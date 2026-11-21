import {
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
import { For } from "solid-js";

const sizes = ["default", "sm"] as const;

export function AlertDialogDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <For each={sizes}>
        {(size) => (
          <AlertDialog>
            <AlertDialogTrigger class={buttonVariants({ variant: "outline" })}>
              Delete ({size})
            </AlertDialogTrigger>
            <AlertDialogOverlay />
            <AlertDialogContent size={size}>
              <AlertDialogHeader>
                <AlertDialogLabel>Delete this file?</AlertDialogLabel>
                <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose>Cancel</AlertDialogClose>
                <AlertDialogClose variant="destructive">Delete</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </For>
    </div>
  );
}

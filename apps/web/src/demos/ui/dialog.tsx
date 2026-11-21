import {
  buttonVariants,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogLabel,
  DialogOverlay,
  DialogTrigger,
} from "@solidx/kit/ui";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger class={buttonVariants()}>Open</DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <DialogLabel>Edit profile</DialogLabel>
        <DialogDescription>This dialog stays on the page until you close it.</DialogDescription>
        <DialogClose class="mt-4">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

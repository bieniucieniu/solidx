import {
  buttonVariants,
  Dialog,
  DialogActions,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeadline,
  DialogIcon,
  DialogOverlay,
  DialogTrigger,
  iconButtonVariants,
  TextField,
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel,
} from "@solidx/kit/m3";
import { CloseIcon, DeleteIcon } from "./shared";

export function DialogDemo() {
  return (
    <div class="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger class={buttonVariants({ variant: "tonal" })}>Basic dialog</DialogTrigger>
        <DialogOverlay />
        <DialogContent>
          <DialogIcon>
            <DeleteIcon />
          </DialogIcon>
          <DialogHeadline>Permanently delete?</DialogHeadline>
          <DialogDescription>
            Deleting the selected messages will also remove them from synced devices.
          </DialogDescription>
          <DialogActions>
            <DialogClose>Cancel</DialogClose>
            <DialogClose>Delete</DialogClose>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger class={buttonVariants({ variant: "outlined" })}>
          Full-screen dialog
        </DialogTrigger>
        <DialogContent fullScreen>
          <DialogHeader>
            <DialogCloseButton class={iconButtonVariants()} aria-label="Close">
              <CloseIcon />
            </DialogCloseButton>
            <DialogHeadline>New event</DialogHeadline>
            <DialogClose>Save</DialogClose>
          </DialogHeader>
          <div class="flex flex-col gap-4 px-6 py-4">
            <TextField>
              <TextFieldContainer>
                <TextFieldLabel>Title</TextFieldLabel>
                <TextFieldInput />
              </TextFieldContainer>
            </TextField>
            <TextField>
              <TextFieldContainer>
                <TextFieldLabel>Location</TextFieldLabel>
                <TextFieldInput />
              </TextFieldContainer>
            </TextField>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

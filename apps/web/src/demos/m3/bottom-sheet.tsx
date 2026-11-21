import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetDragHandle,
  BottomSheetOverlay,
  BottomSheetTitle,
  BottomSheetTrigger,
  buttonVariants,
  List,
  ListItem,
  ListItemContent,
  ListItemHeadline,
  ListItemLeading,
} from "@solidx/kit/m3";
import { For } from "solid-js";
import { MailIcon, PersonIcon, ShareIcon } from "./shared";

const contacts = Array.from({ length: 16 }, (_, i) => `Contact ${i + 1}`);

export function BottomSheetDemo() {
  return (
    <BottomSheet>
      <BottomSheetTrigger class={buttonVariants({ variant: "tonal" })}>
        Open bottom sheet
      </BottomSheetTrigger>
      <BottomSheetOverlay />
      <BottomSheetContent>
        <BottomSheetDragHandle />
        <BottomSheetTitle>Share</BottomSheetTitle>
        <BottomSheetDescription>Send this page to someone.</BottomSheetDescription>
        <BottomSheetBody>
          <List>
            <ListItem as="button">
              <ListItemLeading>
                <MailIcon />
              </ListItemLeading>
              <ListItemContent>
                <ListItemHeadline>Email</ListItemHeadline>
              </ListItemContent>
            </ListItem>
            <ListItem as="button">
              <ListItemLeading>
                <ShareIcon />
              </ListItemLeading>
              <ListItemContent>
                <ListItemHeadline>More options</ListItemHeadline>
              </ListItemContent>
            </ListItem>
            <For each={contacts} keyed={false}>
              {(contact) => (
                <ListItem as="button">
                  <ListItemLeading>
                    <PersonIcon />
                  </ListItemLeading>
                  <ListItemContent>
                    <ListItemHeadline>{contact()}</ListItemHeadline>
                  </ListItemContent>
                </ListItem>
              )}
            </For>
          </List>
        </BottomSheetBody>
      </BottomSheetContent>
    </BottomSheet>
  );
}

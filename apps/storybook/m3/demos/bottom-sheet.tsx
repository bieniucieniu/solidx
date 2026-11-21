import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetDragHandle,
  BottomSheetOverlay,
  BottomSheetPortal,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button,
  List,
  ListItem,
  ListItemContent,
  ListItemHeadline,
  ListItemLeading,
} from "@solidx/kit-1.9/m3";
import { Index } from "solid-js";
import { MailIcon, PersonIcon, ShareIcon } from "./shared";

const contacts = Array.from({ length: 16 }, (_, i) => `Contact ${i + 1}`);

export function BottomSheetDemo() {
  return (
    <BottomSheet>
      <BottomSheetTrigger as={Button} variant="tonal">
        Open bottom sheet
      </BottomSheetTrigger>
      <BottomSheetPortal>
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
              <Index each={contacts}>
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
              </Index>
            </List>
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheetPortal>
    </BottomSheet>
  );
}

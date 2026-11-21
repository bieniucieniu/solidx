import {
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxInput,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemHeadline,
  ListItemLeading,
  ListItemOverline,
  ListItemSupportingText,
  ListItemTrailing,
} from "@solidx/kit-1.9/m3";
import { HomeIcon, MailIcon, PersonIcon, StarIcon } from "./shared";

export function ListDemo() {
  return (
    <List class="max-w-md rounded-large bg-surface-container-low">
      <ListItem>
        <ListItemLeading>
          <HomeIcon />
        </ListItemLeading>
        <ListItemContent>
          <ListItemHeadline>One-line item</ListItemHeadline>
        </ListItemContent>
        <ListItemTrailing>100+</ListItemTrailing>
      </ListItem>
      <ListItem as="button">
        <ListItemLeading>
          <MailIcon />
        </ListItemLeading>
        <ListItemContent>
          <ListItemHeadline>Two-line item (button)</ListItemHeadline>
          <ListItemSupportingText>Supporting text</ListItemSupportingText>
        </ListItemContent>
        <ListItemTrailing>
          <StarIcon />
        </ListItemTrailing>
      </ListItem>
      <Divider inset="middle" />
      <ListItem lines={3}>
        <ListItemLeading>
          <PersonIcon />
        </ListItemLeading>
        <ListItemContent>
          <ListItemOverline>Overline</ListItemOverline>
          <ListItemHeadline>Three-line item</ListItemHeadline>
          <ListItemSupportingText>
            Supporting text that runs long enough to wrap onto a second line in the list.
          </ListItemSupportingText>
        </ListItemContent>
        <ListItemTrailing>
          <Checkbox aria-label="Select">
            <CheckboxInput />
            <CheckboxControl>
              <CheckboxIndicator />
            </CheckboxControl>
          </Checkbox>
        </ListItemTrailing>
      </ListItem>
    </List>
  );
}

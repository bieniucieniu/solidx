import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuItemIndicator,
  MenuItemLabel,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@solidx/kit-1.9/m3";
import { createSignal } from "solid-js";
import { DeleteIcon, EditIcon, ShareIcon } from "./shared";

export function MenuDemo() {
  const [wrap, setWrap] = createSignal(true);
  const [sort, setSort] = createSignal("name");
  return (
    <Menu>
      <MenuTrigger as={Button} variant="tonal">
        Open menu
      </MenuTrigger>
      <MenuPortal>
        <MenuContent>
          <MenuItem>
            <MenuItemIcon>
              <EditIcon />
            </MenuItemIcon>
            <MenuItemLabel>Edit</MenuItemLabel>
            <MenuShortcut>⌘E</MenuShortcut>
          </MenuItem>
          <MenuSub>
            <MenuSubTrigger>
              <MenuItemIcon>
                <ShareIcon />
              </MenuItemIcon>
              <span class="flex-1">Share</span>
            </MenuSubTrigger>
            <MenuPortal>
              <MenuSubContent>
                <MenuItem>Email</MenuItem>
                <MenuItem>Copy link</MenuItem>
              </MenuSubContent>
            </MenuPortal>
          </MenuSub>
          <MenuItem disabled>
            <MenuItemIcon>
              <DeleteIcon />
            </MenuItemIcon>
            <MenuItemLabel>Delete</MenuItemLabel>
          </MenuItem>
          <MenuSeparator />
          <MenuCheckboxItem checked={wrap()} onChange={setWrap}>
            <MenuItemLabel>Word wrap</MenuItemLabel>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Sort by</MenuGroupLabel>
            <MenuRadioGroup value={sort()} onChange={setSort}>
              <MenuRadioItem value="name">
                <MenuItemLabel>Name</MenuItemLabel>
                <MenuItemIndicator />
              </MenuRadioItem>
              <MenuRadioItem value="date">
                <MenuItemLabel>Date</MenuItemLabel>
                <MenuItemIndicator />
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </MenuPortal>
    </Menu>
  );
}

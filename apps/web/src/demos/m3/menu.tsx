import {
  buttonVariants,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuItemIndicator,
  MenuItemLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@solidx/kit/m3";
import { createSignal } from "solid-js";
import { DeleteIcon, EditIcon, ShareIcon } from "./shared";

export function MenuDemo() {
  const [wrap, setWrap] = createSignal(true);
  const [sort, setSort] = createSignal("name");
  return (
    <Menu>
      <MenuTrigger class={buttonVariants({ variant: "tonal" })}>Open menu</MenuTrigger>
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
          <MenuSubContent>
            <MenuItem>Email</MenuItem>
            <MenuItem>Copy link</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuItem disabled>
          <MenuItemIcon>
            <DeleteIcon />
          </MenuItemIcon>
          <MenuItemLabel>Delete</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuCheckboxItem value="wrap" checked={wrap()} onCheckedChange={(next) => setWrap(next)}>
          <MenuItemLabel>Word wrap</MenuItemLabel>
          <MenuItemIndicator />
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Sort by</MenuGroupLabel>
          <MenuRadioGroup value={sort()} onValueChange={(next) => setSort(next)}>
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
    </Menu>
  );
}

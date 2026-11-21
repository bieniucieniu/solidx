import { Fab, IconButton, Toolbar, ToggleIconButton } from "@solidx/kit/m3";
import { AddIcon, DeleteIcon, DemoRow, DemoStack, EditIcon, ShareIcon, StarIcon } from "./shared";

function Actions() {
  return (
    <>
      <IconButton aria-label="Edit">
        <EditIcon />
      </IconButton>
      <ToggleIconButton aria-label="Star">
        <StarIcon />
      </ToggleIconButton>
      <IconButton aria-label="Share">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export function ToolbarDemo() {
  return (
    <DemoStack>
      <DemoRow label="Docked" class="block">
        <Toolbar class="rounded-medium">
          <Actions />
        </Toolbar>
      </DemoRow>
      <DemoRow label="Floating, standard and vibrant, with a FAB">
        <Toolbar variant="floating">
          <Actions />
        </Toolbar>
        <Toolbar variant="floating" color="vibrant">
          <Actions />
        </Toolbar>
        <Fab aria-label="Add">
          <AddIcon />
        </Fab>
      </DemoRow>
      <DemoRow label="Floating, vertical">
        <Toolbar variant="floating" orientation="vertical">
          <Actions />
        </Toolbar>
      </DemoRow>
    </DemoStack>
  );
}

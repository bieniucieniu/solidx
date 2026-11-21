import { FabMenu, FabMenuContent, FabMenuItem, FabMenuTrigger } from "@solidx/kit/m3";
import { AddIcon, EditIcon, MailIcon, PersonIcon } from "./shared";

export function FabMenuDemo() {
  return (
    <div class="flex h-72 items-end justify-end">
      <FabMenu>
        <FabMenuTrigger aria-label="Create">
          <AddIcon />
        </FabMenuTrigger>
        <FabMenuContent>
          <FabMenuItem>
            <MailIcon />
            Message
          </FabMenuItem>
          <FabMenuItem>
            <PersonIcon />
            Contact
          </FabMenuItem>
          <FabMenuItem>
            <EditIcon />
            Note
          </FabMenuItem>
        </FabMenuContent>
      </FabMenu>
    </div>
  );
}

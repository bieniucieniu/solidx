import {
  FabMenu,
  FabMenuContent,
  FabMenuItem,
  FabMenuPortal,
  FabMenuTrigger,
} from "@solidx/kit-1.9/m3";
import { AddIcon, EditIcon, MailIcon, PersonIcon } from "./shared";

export function FabMenuDemo() {
  return (
    <div class="flex h-72 items-end justify-end">
      <FabMenu>
        <FabMenuTrigger aria-label="Create">
          <AddIcon />
        </FabMenuTrigger>
        <FabMenuPortal>
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
        </FabMenuPortal>
      </FabMenu>
    </div>
  );
}

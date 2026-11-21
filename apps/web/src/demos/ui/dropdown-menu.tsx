import {
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function DropdownMenuDemo() {
  const [action, setAction] = createSignal("None");

  return (
    <div class="flex flex-col items-start gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants()}>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setAction("Edit")}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAction("Duplicate")}>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setAction("Delete")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p class="text-sm text-muted-foreground">Action: {action()}</p>
    </div>
  );
}

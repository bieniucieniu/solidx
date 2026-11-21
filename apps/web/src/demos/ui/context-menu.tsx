import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function ContextMenuDemo() {
  const [action, setAction] = createSignal("None");

  return (
    <div class="flex flex-col items-start gap-3">
      <ContextMenu>
        <ContextMenuTrigger class="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
          Right click
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => setAction("Back")}>Back</ContextMenuItem>
          <ContextMenuItem onSelect={() => setAction("Forward")}>Forward</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive" onSelect={() => setAction("Delete")}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p class="text-xs text-muted-foreground">Action: {action()}</p>
    </div>
  );
}

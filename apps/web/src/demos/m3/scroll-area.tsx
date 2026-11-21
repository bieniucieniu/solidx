import { List, ListItem, ListItemContent, ListItemHeadline, ScrollArea } from "@solidx/kit/m3";
import { For } from "solid-js";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export function ScrollAreaDemo() {
  return (
    <ScrollArea class="h-72 w-full max-w-xs rounded-medium bg-surface-container-low">
      <List>
        <For each={items} keyed={false}>
          {(item) => (
            <ListItem>
              <ListItemContent>
                <ListItemHeadline>{item()}</ListItemHeadline>
              </ListItemContent>
            </ListItem>
          )}
        </For>
      </List>
    </ScrollArea>
  );
}

import {
  IconButton,
  Search,
  SearchContent,
  SearchControl,
  SearchInput,
  SearchItem,
  SearchItemDescription,
  SearchItemLabel,
  SearchLeading,
  SearchListbox,
  SearchNoResult,
  SearchTrailing,
} from "@solidx/kit/m3";
import { For } from "solid-js";
import { MenuIcon, PersonIcon, SearchIcon } from "./shared";

const colors: Record<string, string> = {
  Apple: "Red or green",
  Banana: "Yellow",
  Blueberry: "Blue",
  Cherry: "Red",
  Grape: "Purple or green",
  Lemon: "Yellow",
  Mango: "Orange",
};
const all = Object.keys(colors);

export function SearchDemo() {
  // The combobox filters the items by their label as you type.
  return (
    <div class="h-96 max-w-xl">
      <Search>
        <SearchControl>
          <SearchLeading>
            <IconButton aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </SearchLeading>
          <SearchInput placeholder="Search fruit" aria-label="Search fruit" />
          <SearchTrailing>
            <PersonIcon />
          </SearchTrailing>
        </SearchControl>
        <SearchContent>
          <SearchListbox>
            <For each={all}>
              {(fruit) => (
                <SearchItem value={fruit} label={fruit}>
                  <SearchIcon />
                  <span>
                    <SearchItemLabel>{fruit}</SearchItemLabel>
                    <SearchItemDescription>{colors[fruit]}</SearchItemDescription>
                  </span>
                </SearchItem>
              )}
            </For>
          </SearchListbox>
          <SearchNoResult>No fruit found</SearchNoResult>
        </SearchContent>
      </Search>
    </div>
  );
}

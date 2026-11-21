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
  SearchPortal,
  SearchTrailing,
} from "@solidx/kit-1.9/m3";
import { createSignal } from "solid-js";
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
  const [options, setOptions] = createSignal<string[]>([]);
  return (
    <div class="h-96 max-w-xl">
      <Search
        options={options()}
        placeholder="Search fruit"
        triggerMode="focus"
        onInputChange={(query) =>
          setOptions(
            query ? all.filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase())) : all,
          )
        }
        itemComponent={(props) => (
          <SearchItem item={props.item}>
            <SearchIcon />
            <span>
              <SearchItemLabel>{String(props.item.rawValue)}</SearchItemLabel>
              <SearchItemDescription>{colors[String(props.item.rawValue)]}</SearchItemDescription>
            </span>
          </SearchItem>
        )}
      >
        <SearchControl>
          <SearchLeading>
            <IconButton aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </SearchLeading>
          <SearchInput />
          <SearchTrailing>
            <PersonIcon />
          </SearchTrailing>
        </SearchControl>
        <SearchPortal>
          <SearchContent>
            <SearchListbox />
            <SearchNoResult>No fruit found</SearchNoResult>
          </SearchContent>
        </SearchPortal>
      </Search>
    </div>
  );
}

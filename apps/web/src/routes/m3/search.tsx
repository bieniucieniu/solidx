import { DocsPage } from "~/components/preview";
import { SearchDemo } from "~/demos/m3/search";
import source from "~/demos/m3/search.tsx?raw";

const snippet = `import {
  Search,
  SearchContent,
  SearchControl,
  SearchInput,
  SearchItem,
  SearchListbox,
  SearchNoResult,
} from "@solidx/kit/m3";

// Search is ui-sdk's Combobox: it filters the items by their label as you type.
<Search>
  <SearchControl>
    <SearchInput placeholder="Search fruit" aria-label="Search fruit" />
  </SearchControl>
  <SearchContent>
    <SearchListbox>
      <SearchItem value="Apple">Apple</SearchItem>
      <SearchItem value="Banana">Banana</SearchItem>
    </SearchListbox>
    <SearchNoResult>No fruit found</SearchNoResult>
  </SearchContent>
</Search>`;

export default function SearchPage() {
  return (
    <DocsPage
      title="Search"
      description="A search bar with a docked results view."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/search.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SearchDemo />
    </DocsPage>
  );
}

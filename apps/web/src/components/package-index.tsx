import { buttonVariants } from "@solidx/kit/m3";
import { For } from "solid-js";
import { DocsPage } from "~/components/preview";
import type { NavItem } from "~/nav";

/** A package's overview: its import line and an M3 button for each page. */
export function PackageIndex(props: {
  title: string;
  description: string;
  snippet: string;
  pages: NavItem[];
  previewClass?: string;
}) {
  return (
    <DocsPage
      title={props.title}
      description={props.description}
      snippet={props.snippet}
      previewClass={props.previewClass}
    >
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <For each={props.pages}>
          {(item) => (
            <li>
              <a href={item.href} class={buttonVariants({ variant: "elevated", class: "w-full" })}>
                {item.title}
              </a>
            </li>
          )}
        </For>
      </ul>
    </DocsPage>
  );
}

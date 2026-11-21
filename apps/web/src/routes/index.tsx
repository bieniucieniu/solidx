import { For } from "solid-js";
import { PackageIcon } from "~/components/package-icon";
import { packages } from "~/nav";

export default function Home() {
  return (
    <main class="mx-auto max-w-6xl px-4 pt-6 pb-8 medium:px-6 medium:pt-10">
      <h1 class="typescale-headline-large text-on-surface medium:typescale-display-small">
        solidx
      </h1>
      <p class="mt-3 max-w-[60ch] typescale-body-large text-on-surface-variant">
        Solid 2.0 components on ui-sdk, Material 3, motion, node graphs, and a Tiptap editor.
      </p>
      <ul class="mt-8 grid gap-4 medium:grid-cols-2 medium:gap-6 large:grid-cols-3">
        <For each={packages}>
          {(item) => (
            <li class="flex">
              {/* An elevated card that acts as a link. */}
              <a
                href={item.href}
                class="relative flex w-full flex-col gap-3 rounded-medium bg-surface-container-low p-4 text-on-surface shadow-level-1 state-layer [--state-layer-color:var(--md-sys-color-on-surface)] focus-ring motion-fast hover:shadow-level-2"
              >
                <span class="flex size-10 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container [&_svg]:size-6">
                  <PackageIcon id={item.id} />
                </span>
                <h2 class="typescale-title-large">{item.title}</h2>
                <p class="typescale-body-medium text-on-surface-variant">{item.description}</p>
              </a>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
}

import { buttonVariants } from "@solidx/kit/m3";
import { For } from "solid-js";
import { packages } from "~/nav";

export default function Home() {
  return (
    <main class="mx-auto max-w-6xl px-6 py-16">
      <h1 class="typescale-display-small text-on-surface">solidx</h1>
      <p class="mt-3 max-w-xl typescale-body-large text-on-surface-variant">
        Solid 2.0 components on ui-sdk, Material 3, motion, node graphs, and a Tiptap editor.
      </p>
      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <For each={packages}>
          {(item) => (
            <a
              href={item.href}
              class="rounded-extra-large bg-surface-container-low p-6 state-layer motion-fast hover:shadow-level-1 focus-ring"
            >
              <h2 class="typescale-title-large text-on-surface">{item.title}</h2>
              <p class="mt-2 typescale-body-medium text-on-surface-variant">{item.description}</p>
              <span class={buttonVariants({ variant: "text", size: "xs", class: "mt-4 -ml-3" })}>
                Open
              </span>
            </a>
          )}
        </For>
      </div>
    </main>
  );
}

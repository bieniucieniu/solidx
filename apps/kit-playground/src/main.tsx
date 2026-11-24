import { render } from "@solidjs/web";
import { For, Match, Switch, createSignal, onSettled } from "solid-js";
import "./app.css";
import { ExcalidrawPage } from "./pages/excalidraw";
import { M3Page } from "./pages/m3";
import { MotionPage, TiptapPage, XyflowPage } from "./pages/others";
import { UiPage } from "./pages/ui";

const pages = ["ui", "m3", "motion", "xyflow", "tiptap", "excalidraw"] as const;
type Page = (typeof pages)[number];

function readHash(): Page {
  const hash = location.hash.slice(1);
  return (pages as readonly string[]).includes(hash) ? (hash as Page) : "ui";
}

function App() {
  const [page, setPage] = createSignal<Page>(readHash());
  const [dark, setDark] = createSignal(matchMedia("(prefers-color-scheme: dark)").matches);

  onSettled(() => {
    const sync = () => setPage(readHash());
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  });

  return (
    <div class={{ dark: dark() }}>
      <div class="min-h-screen bg-background text-foreground">
        <header class="sticky top-0 z-40 flex items-center gap-1 border-b bg-background/90 px-4 py-2 backdrop-blur">
          <strong class="mr-4 text-sm">solidx · Solid 2.0</strong>
          <nav class="flex gap-1" aria-label="Areas">
            <For each={pages}>
              {(name) => (
                <a
                  href={`#${name}`}
                  aria-current={page() === name ? "page" : undefined}
                  class="rounded-md px-2 py-1 text-xs hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:font-medium"
                >
                  {name}
                </a>
              )}
            </For>
          </nav>
          <button
            type="button"
            class="ml-auto rounded-md border px-2 py-1 text-xs hover:bg-muted"
            onClick={() => setDark((value) => !value)}
          >
            {dark() ? "Light" : "Dark"}
          </button>
        </header>
        <main class="mx-auto max-w-6xl p-6">
          <Switch>
            <Match when={page() === "ui"}>
              <UiPage />
            </Match>
            <Match when={page() === "excalidraw"}>
              <ExcalidrawPage />
            </Match>
            <Match when={page() === "m3"}>
              <M3Page />
            </Match>
            <Match when={page() === "motion"}>
              <MotionPage />
            </Match>
            <Match when={page() === "xyflow"}>
              <XyflowPage />
            </Match>
            <Match when={page() === "tiptap"}>
              <TiptapPage />
            </Match>
          </Switch>
        </main>
      </div>
    </div>
  );
}

render(() => <App />, document.getElementById("root")!);

import { type ComponentProps, type JSX } from "@solidjs/web";
import { Show, createEffect, createSignal, omit } from "solid-js";
import { loadLanguage } from "#ex/core";
import type { ExcalidrawProps } from "#ex/core";
import { createExcalidraw } from "#ex/solid/createExcalidraw";
import { ExcalidrawContext } from "#ex/solid/context";

export interface ExcalidrawRootProps
  extends ExcalidrawProps, Pick<ComponentProps<"div">, "class" | "style"> {
  /** headless UI rendered over the canvas (in `.excalidraw__ui`); read the editor with the `use*` hooks */
  children?: JSX.Element;
}

const OWN_KEYS = ["children", "class", "style"] as const;

/**
 * The editor: the `.excalidraw` container with its canvas layers, plus
 * `children` (your UI) on top. Unstyled apart from `@solidx/excalidraw/style.css`.
 */
export function Excalidraw(props: ExcalidrawRootProps) {
  const editorProps = omit(props, ...OWN_KEYS);
  const excalidraw = createExcalidraw(() => ({ ...editorProps }) as ExcalidrawProps);

  // upstream `InitializeApp`: the editor renders once its language is loaded
  const [ready, setReady] = createSignal(false);
  void loadLanguage(props.langCode).then(() => setReady(true));

  let container: HTMLDivElement | undefined;
  let canvasHost: HTMLDivElement | undefined;

  // Compute reads readiness; the apply phase runs after the <Show> content
  // (and its refs) mounted, and returns the unmount.
  createEffect(
    () => ready(),
    (isReady) => {
      if (!isReady || !container || !canvasHost) return;
      return excalidraw.editor.mount(container, canvasHost);
    },
  );

  return (
    <div
      ref={(el) => (container = el)}
      class={props.class}
      style={props.style}
      data-slot="excalidraw"
    >
      <Show when={ready()}>
        <ExcalidrawContext value={excalidraw}>
          <div ref={(el) => (canvasHost = el)} class="excalidraw__canvases" />
          <div class="excalidraw__ui">{props.children}</div>
        </ExcalidrawContext>
      </Show>
    </div>
  );
}

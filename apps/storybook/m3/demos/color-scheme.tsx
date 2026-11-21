import { applyScheme, Button, type SchemeVariant } from "@solidx/kit-1.9/m3";
import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import { ButtonDemo } from "./button";
import { DemoRow, DemoStack } from "./shared";

const seeds = ["#6750A4", "#006A6A", "#B3261E", "#7D5260", "#3A6A1E", "#0061A4"];
const variants: SchemeVariant[] = ["tonal-spot", "vibrant", "expressive", "neutral", "fidelity"];

/** Generates a scheme from a seed with material-color-utilities and applies it to the preview. */
export function ColorSchemeDemo() {
  let target: HTMLDivElement | undefined;
  const [seed, setSeed] = createSignal(seeds[1]);
  const [variant, setVariant] = createSignal<SchemeVariant>("tonal-spot");
  const [dark, setDark] = createSignal(false);

  onMount(() => {
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => setDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    onCleanup(() => observer.disconnect());
  });

  createEffect(() => {
    const element = target;
    if (!element) return;
    const options = { seed: seed(), variant: variant(), dark: dark() };
    let remove: (() => void) | undefined;
    let stale = false;
    void applyScheme(element, options).then((cleanup) => {
      if (stale) cleanup();
      else remove = cleanup;
    });
    onCleanup(() => {
      stale = true;
      remove?.();
    });
  });

  return (
    <DemoStack>
      <DemoRow label="Seed">
        <For each={seeds}>
          {(color) => (
            <button
              type="button"
              aria-label={color}
              aria-pressed={seed() === color}
              class="size-10 cursor-pointer rounded-full ring-offset-2 ring-offset-surface aria-pressed:ring-3 aria-pressed:ring-on-surface"
              style={{ background: color }}
              onClick={() => setSeed(color)}
            />
          )}
        </For>
        <input
          type="color"
          aria-label="Custom seed"
          value={seed()}
          onInput={(event) => setSeed(event.currentTarget.value)}
          class="size-10 cursor-pointer rounded-full"
        />
      </DemoRow>
      <DemoRow label="Variant">
        <For each={variants}>
          {(name) => (
            <Button
              size="xs"
              variant={variant() === name ? "filled" : "outlined"}
              onClick={() => setVariant(name)}
            >
              {name}
            </Button>
          )}
        </For>
      </DemoRow>
      <div
        ref={(el) => {
          target = el;
        }}
        data-m3
        class="rounded-large bg-surface p-6 text-on-surface [--primary:var(--md-sys-color-primary)] [--secondary:var(--md-sys-color-secondary)]"
      >
        <ButtonDemo />
      </div>
    </DemoStack>
  );
}

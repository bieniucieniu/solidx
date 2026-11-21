import { buttonVariants } from "@solidx/kit/m3";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";

// The catch-all route. httpStatus() sets the response status during SSR (a no-op in the browser);
// it runs in preload so the status is set before the response head flushes.
export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main class="mx-auto max-w-6xl px-6 py-16">
      <h1 class="typescale-headline-medium text-on-surface">Page not found</h1>
      <p class="mt-3 typescale-body-large text-on-surface-variant">
        Nothing lives at this address.
      </p>
      <a href="/" class={buttonVariants({ variant: "tonal", class: "mt-6" })}>
        Back to the start
      </a>
    </main>
  );
}

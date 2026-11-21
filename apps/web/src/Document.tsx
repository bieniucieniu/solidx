import { HydrationScript } from "@solidjs/web";
import type { ParentProps } from "solid-js";
import { themeInitScript } from "~/components/theme-toggle";

// The document shell, picked up by the src/Document.* convention of start mode. It ships no
// client JS of its own.
export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>solidx</title>
        {/* Before paint, so the first frame already has the right theme. */}
        <script innerHTML={themeInitScript} />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}

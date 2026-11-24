import { Excalidraw } from "@solidx/excalidraw";
import "@solidx/excalidraw/style.css";

/** the bare editor: canvas layers only, no chrome */
export function ExcalidrawPage() {
  return (
    <div class="h-[70vh] overflow-hidden rounded-lg border">
      <Excalidraw />
    </div>
  );
}

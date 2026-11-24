import { createContext, useContext } from "solid-js";
import type { Excalidraw } from "./createExcalidraw";

// Optional context defaults to null: Solid 2 throws on a read with no provider and no default.
export const ExcalidrawContext = createContext<Excalidraw | null>(null);

export function useExcalidraw(): Excalidraw {
  const excalidraw = useContext(ExcalidrawContext);
  if (!excalidraw) throw new Error("useExcalidraw must be used inside <Excalidraw>.");
  return excalidraw;
}

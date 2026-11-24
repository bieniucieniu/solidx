// Replaces upstream's `subset/` (harfbuzz + woff2 wasm, bundled): font
// subsetting for SVG export is the host's opt-in. Without a subsetter, the
// export embeds each used font file whole.

/**
 * Subsets a woff2 font to the given codepoints, returning woff2. For example
 * with `harfbuzzjs` (`hb-subset`) plus a woff2 encoder, in a worker.
 */
export type FontSubsetter = (
  woff2: ArrayBuffer,
  codePoints: readonly number[],
) => Promise<ArrayBuffer>;

let subsetter: FontSubsetter | null = null;

/** sets (or with `null`, clears) the subsetter SVG export uses for fonts */
export const setFontSubsetter = (next: FontSubsetter | null) => {
  subsetter = next;
};

const toBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  // chunked, since spreading a large array overflows the call stack
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
};

/** the font (subset if a subsetter is set; whole otherwise) as a data url */
export const toFontDataURL = async (
  woff2: ArrayBuffer,
  codePoints: readonly number[],
): Promise<string> => {
  let data = woff2;
  if (subsetter) {
    try {
      data = await subsetter(woff2, codePoints);
    } catch (error) {
      console.error("Excalidraw: font subsetting failed, embedding the whole font", error);
    }
  }
  return `data:font/woff2;base64,${toBase64(data)}`;
};

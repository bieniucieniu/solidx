// The demos' fonts for <Excalidraw fonts={…}>: @solidx/excalidraw bundles none.
// Nunito, Lilita One and Cascadia come from Fontsource; Excalifont, Virgil,
// Comic Shanns, Liberation Sans and Xiaolai (the CJK fallback) aren't on
// Fontsource, so their files (from excalidraw/excalidraw) live here.
import type { ExcalidrawFonts, FontSource } from "@solidx/excalidraw/core";
import cascadiaRanges from "@fontsource/cascadia-code/unicode.json";
import cascadiaCyrillic from "@fontsource/cascadia-code/files/cascadia-code-cyrillic-400-normal.woff2?url";
import cascadiaCyrillicExt from "@fontsource/cascadia-code/files/cascadia-code-cyrillic-ext-400-normal.woff2?url";
import cascadiaGreek from "@fontsource/cascadia-code/files/cascadia-code-greek-400-normal.woff2?url";
import cascadiaLatin from "@fontsource/cascadia-code/files/cascadia-code-latin-400-normal.woff2?url";
import cascadiaLatinExt from "@fontsource/cascadia-code/files/cascadia-code-latin-ext-400-normal.woff2?url";
import cascadiaVietnamese from "@fontsource/cascadia-code/files/cascadia-code-vietnamese-400-normal.woff2?url";
import lilitaRanges from "@fontsource/lilita-one/unicode.json";
import lilitaLatin from "@fontsource/lilita-one/files/lilita-one-latin-400-normal.woff2?url";
import lilitaLatinExt from "@fontsource/lilita-one/files/lilita-one-latin-ext-400-normal.woff2?url";
import nunitoRanges from "@fontsource/nunito/unicode.json";
import nunitoCyrillic from "@fontsource/nunito/files/nunito-cyrillic-500-normal.woff2?url";
import nunitoCyrillicExt from "@fontsource/nunito/files/nunito-cyrillic-ext-500-normal.woff2?url";
import nunitoLatin from "@fontsource/nunito/files/nunito-latin-500-normal.woff2?url";
import nunitoLatinExt from "@fontsource/nunito/files/nunito-latin-ext-500-normal.woff2?url";
import nunitoVietnamese from "@fontsource/nunito/files/nunito-vietnamese-500-normal.woff2?url";
import { ComicShannsFontFaces } from "./ComicShanns";
import { ExcalifontFontFaces } from "./Excalifont";
import { LiberationFontFaces } from "./Liberation";
import { VirgilFontFaces } from "./Virgil";
import { XiaolaiFontFaces } from "./Xiaolai";

/** a Fontsource package's subset files, with the ranges from its `unicode.json` */
const fontsource = (
  ranges: Record<string, string>,
  files: Record<string, string>,
  weight?: string,
): FontSource[] =>
  Object.entries(files).map(([subset, url]) => ({ url, unicodeRange: ranges[subset], weight }));

export const fonts: ExcalidrawFonts = {
  Excalifont: ExcalifontFontFaces,
  Virgil: VirgilFontFaces,
  "Comic Shanns": ComicShannsFontFaces,
  "Liberation Sans": LiberationFontFaces,
  Xiaolai: XiaolaiFontFaces,
  // upstream uses Nunito at weight 500
  Nunito: fontsource(
    nunitoRanges,
    {
      "cyrillic-ext": nunitoCyrillicExt,
      cyrillic: nunitoCyrillic,
      vietnamese: nunitoVietnamese,
      "latin-ext": nunitoLatinExt,
      latin: nunitoLatin,
    },
    "500",
  ),
  "Lilita One": fontsource(lilitaRanges, { "latin-ext": lilitaLatinExt, latin: lilitaLatin }),
  Cascadia: fontsource(cascadiaRanges, {
    "cyrillic-ext": cascadiaCyrillicExt,
    cyrillic: cascadiaCyrillic,
    greek: cascadiaGreek,
    vietnamese: cascadiaVietnamese,
    "latin-ext": cascadiaLatinExt,
    latin: cascadiaLatin,
  }),
};

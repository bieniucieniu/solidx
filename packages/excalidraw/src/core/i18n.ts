import { isDevEnv } from "@excalidraw/common";

import type { NestedKeyOf } from "@excalidraw/common/utility-types";

import { editorJotaiStore, atom } from "./editor-jotai";
import fallbackLangData from "./locales/en.json";

export interface Language {
  code: string;
  label: string;
  rtl?: boolean;
}

export type TranslationKeys = NestedKeyOf<typeof fallbackLangData>;

/** a language's translations, in the shape of upstream's `locales/*.json` */
export type LocaleData = Record<string, unknown>;

/**
 * Loads a language's translations, e.g. `() => import("./locales/de-DE.json")`.
 * Only English is bundled; the host brings the others.
 */
export type LocaleLoader = () => Promise<LocaleData | { default: LocaleData }>;

/** the host's languages, by code (`"de-DE"`, …) */
export type ExcalidrawLocales = Record<string, LocaleLoader>;

export const defaultLang = { code: "en", label: "English" };

const TEST_LANG_CODE = "__test__";

const RTL_LANGUAGES = ["ar", "ckb", "dv", "fa", "he", "ps", "ur", "yi"];

/** the `Language` for a code (upstream kept a table; only `rtl` matters) */
export const resolveLanguage = (code: string = defaultLang.code): Language =>
  code === defaultLang.code
    ? defaultLang
    : {
        code,
        label: code,
        rtl:
          code === `${TEST_LANG_CODE}.rtl` ||
          RTL_LANGUAGES.includes(code.split("-")[0]),
      };

let currentLang: Language = defaultLang;
let currentLangData: LocaleData = {};

export const setLanguage = async (lang: Language, load?: LocaleLoader) => {
  currentLang = lang;
  document.documentElement.dir = currentLang.rtl ? "rtl" : "ltr";
  document.documentElement.lang = currentLang.code;

  if (lang.code.startsWith(TEST_LANG_CODE)) {
    currentLangData = {};
  } else if (lang.code === defaultLang.code) {
    currentLangData = fallbackLangData;
  } else if (!load) {
    console.warn(
      `Excalidraw: no locale for "${lang.code}" (the \`locales\` prop); using English`,
    );
    currentLangData = fallbackLangData;
  } else {
    try {
      const data = await load();
      currentLangData = (
        "default" in data ? data.default : data
      ) as LocaleData;
    } catch (error: any) {
      console.error(`Failed to load language ${lang.code}:`, error.message);
      currentLangData = fallbackLangData;
    }
  }

  editorJotaiStore.set(editorLangCodeAtom, lang.code);
};

export const getLanguage = () => currentLang;

const findPartsForData = (data: any, parts: string[]) => {
  for (let index = 0; index < parts.length; ++index) {
    const part = parts[index];
    if (data[part] === undefined) {
      return undefined;
    }
    data = data[part];
  }
  if (typeof data !== "string") {
    return undefined;
  }
  return data;
};

export const t = (
  path: NestedKeyOf<typeof fallbackLangData>,
  replacement?: { [key: string]: string | number } | null,
  fallback?: string,
) => {
  if (currentLang.code.startsWith(TEST_LANG_CODE)) {
    const name = replacement
      ? `${path}(${JSON.stringify(replacement).slice(1, -1)})`
      : path;
    return `\u{202a}[[${name}]]\u{202c}`;
  }

  const parts = path.split(".");
  let translation =
    findPartsForData(currentLangData, parts) ||
    findPartsForData(fallbackLangData, parts) ||
    fallback;
  if (translation === undefined) {
    const errorMessage = `Can't find translation for ${path}`;
    // in production, don't blow up the app on a missing translation key
    if (import.meta.env.PROD) {
      console.warn(errorMessage);
      return "";
    }
    throw new Error(errorMessage);
  }

  if (replacement) {
    for (const key in replacement) {
      translation = translation.replace(`{{${key}}}`, String(replacement[key]));
    }
  }
  return translation;
};

/** @private atom used solely to rerender components using `useI18n` hook */
const editorLangCodeAtom = atom(defaultLang.code);

/** current language code, for UI layers to subscribe to (replaces `useI18n`) */
export const getLangCode = () => editorJotaiStore.get(editorLangCodeAtom);

export const subscribeLangCode = (listener: () => void) =>
  editorJotaiStore.sub(editorLangCodeAtom, listener);

import {
  Menu,
  MenuContent,
  MenuItemIndicator,
  MenuItemLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  iconButtonVariants,
} from "@solidx/kit/m3";
import { For, createSignal } from "solid-js";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

export const THEME_STORAGE_KEY = "solidx-theme";

// Runs in <head> before paint, so the first frame already has the right theme.
// Anything other than "light" / "dark" (missing, "system") follows the OS setting.
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

const options: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function parsePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

function readStoredPreference(): ThemePreference {
  try {
    return parsePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // Storage blocked: keep following the OS.
    return "system";
  }
}

const isBrowser = typeof document !== "undefined";

// The current theme lives in plain variables too: Solid 2 applies signal writes on the next
// microtask, and the <html> class must change in the same task as the choice.
let preferenceValue: ThemePreference = isBrowser ? readStoredPreference() : "system";
let systemValue: Theme =
  isBrowser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const [preference, setPreference] = createSignal<ThemePreference>(preferenceValue);

function applyTheme() {
  const theme = preferenceValue === "system" ? systemValue : preferenceValue;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function setThemePreference(next: ThemePreference) {
  preferenceValue = next;
  setPreference(next);
  applyTheme();
  try {
    if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}

if (isBrowser) {
  // In "system" mode, follow the OS theme live, not only on load.
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    systemValue = event.matches ? "dark" : "light";
    applyTheme();
  });

  // Keep other open tabs in step when the choice changes in one of them.
  window.addEventListener("storage", (event) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    preferenceValue = parsePreference(event.newValue);
    setPreference(preferenceValue);
    applyTheme();
  });
}

export function ThemeToggle(props: { class?: string }) {
  // The server can't know the theme, so the markup must not depend on it (hydration would
  // fail). Both icons render and the `.dark` class on <html> picks one, from the first paint.
  return (
    <Menu>
      <MenuTrigger
        aria-label="Change theme"
        class={iconButtonVariants({ size: "sm", class: props.class })}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            class="dark:hidden"
            d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2Zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2ZM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0Zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0ZM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58Zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06Zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06ZM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06Z"
          />
          <path
            class="hidden dark:inline"
            d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z"
          />
        </svg>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuRadioGroup
          value={preference()}
          onValueChange={(value) => setThemePreference(parsePreference(value))}
        >
          <For each={options}>
            {(option) => (
              <MenuRadioItem value={option.value}>
                <MenuItemLabel>{option.label}</MenuItemLabel>
                <MenuItemIndicator />
              </MenuRadioItem>
            )}
          </For>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}

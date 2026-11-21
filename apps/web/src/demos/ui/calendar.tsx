import { Calendar } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

/** Today as an ISO date (`2026-11-20`), the form ui-sdk's calendar reads and writes. */
function isoDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function CalendarDemo() {
  const [value, setValue] = createSignal<string | null>(isoDate(new Date()));

  return (
    <Calendar
      mode="single"
      value={value()}
      onValueChange={(next) => setValue(next as string | null)}
      class="rounded-lg border border-border"
    />
  );
}

export function CalendarRangeDemo() {
  const today = new Date();
  const [value, setValue] = createSignal<[string, string] | null>([
    isoDate(today),
    isoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9)),
  ]);

  return (
    <Calendar
      mode="range"
      months={2}
      value={value()}
      onValueChange={(next) => setValue(next as [string, string] | null)}
      class="rounded-lg border border-border"
    />
  );
}

import { DocsPage, VariantRow, VariantStack } from "~/components/preview";
import { CalendarDemo, CalendarRangeDemo } from "~/demos/ui/calendar";
import source from "~/demos/ui/calendar.tsx?raw";

const snippet = `import { Calendar } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

// Values are ISO dates. mode: "single" | "multiple" | "range"
const [date, setDate] = createSignal<string | null>("2026-11-20");

<Calendar mode="single" value={date()} onValueChange={(next) => setDate(next)} />

<Calendar mode="range" months={2} defaultValue={["2026-11-20", "2026-11-29"]} />`;

export default function CalendarPage() {
  return (
    <DocsPage
      title="Calendar"
      description="A date grid with single, multiple, and range selection."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/calendar.tsx"
    >
      <VariantStack>
        <VariantRow label="Single">
          <CalendarDemo />
        </VariantRow>
        <VariantRow label="Range">
          <CalendarRangeDemo />
        </VariantRow>
      </VariantStack>
    </DocsPage>
  );
}

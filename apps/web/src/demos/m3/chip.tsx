import {
  AssistChip,
  ChipSet,
  FilterChip,
  InputChip,
  InputChipRemove,
  SuggestionChip,
} from "@solidx/kit/m3";
import { createSignal, For } from "solid-js";
import { DemoRow, DemoStack, PersonIcon, StarIcon } from "./shared";

export function ChipDemo() {
  const [people, setPeople] = createSignal(["Ada", "Grace", "Linus"]);
  return (
    <DemoStack>
      <DemoRow label="Assist">
        <ChipSet>
          <AssistChip>
            <StarIcon />
            Add to favorites
          </AssistChip>
          <AssistChip elevated>
            <StarIcon />
            Elevated
          </AssistChip>
          <AssistChip disabled>Disabled</AssistChip>
        </ChipSet>
      </DemoRow>
      <DemoRow label="Filter">
        <ChipSet>
          <FilterChip defaultPressed>Vegetarian</FilterChip>
          <FilterChip>Gluten free</FilterChip>
          <FilterChip elevated>Spicy</FilterChip>
        </ChipSet>
      </DemoRow>
      <DemoRow label="Input">
        <ChipSet>
          <For each={people()}>
            {(name) => (
              <InputChip>
                <PersonIcon />
                {name}
                <InputChipRemove
                  aria-label={`Remove ${name}`}
                  onClick={() => setPeople((list) => list.filter((item) => item !== name))}
                />
              </InputChip>
            )}
          </For>
        </ChipSet>
      </DemoRow>
      <DemoRow label="Suggestion">
        <ChipSet>
          <SuggestionChip>Sounds good</SuggestionChip>
          <SuggestionChip>On my way</SuggestionChip>
        </ChipSet>
      </DemoRow>
    </DemoStack>
  );
}

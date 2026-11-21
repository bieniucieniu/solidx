import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@solidx/kit/ui";

export function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show notes</CollapsibleTrigger>
      <CollapsibleContent>Notes stay hidden until you open them.</CollapsibleContent>
    </Collapsible>
  );
}

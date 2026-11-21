import {
  Button,
  buttonVariants,
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetOverlay,
  SideSheetTitle,
  SideSheetTrigger,
} from "@solidx/kit/m3";
import { For } from "solid-js";

const filters = ["In stock", "Free shipping", "On sale", "New arrivals"];

export function SideSheetDemo() {
  return (
    <SideSheet>
      <SideSheetTrigger class={buttonVariants({ variant: "tonal" })}>Filters</SideSheetTrigger>
      <SideSheetOverlay />
      <SideSheetContent>
        <SideSheetHeader>
          <SideSheetTitle>Filters</SideSheetTitle>
          <SideSheetClose />
        </SideSheetHeader>
        <SideSheetBody>
          <For each={filters}>
            {(filter) => (
              <Checkbox>
                <CheckboxControl>
                  <CheckboxIndicator />
                </CheckboxControl>
                <CheckboxLabel>{filter}</CheckboxLabel>
              </Checkbox>
            )}
          </For>
        </SideSheetBody>
        <SideSheetActions>
          <Button>Apply</Button>
          <Button variant="outlined">Reset</Button>
        </SideSheetActions>
      </SideSheetContent>
    </SideSheet>
  );
}

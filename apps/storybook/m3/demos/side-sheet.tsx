import {
  Button,
  Checkbox,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
  SideSheet,
  SideSheetActions,
  SideSheetBody,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetOverlay,
  SideSheetPortal,
  SideSheetTitle,
  SideSheetTrigger,
} from "@solidx/kit-1.9/m3";
import { For } from "solid-js";

const filters = ["In stock", "Free shipping", "On sale", "New arrivals"];

export function SideSheetDemo() {
  return (
    <SideSheet>
      <SideSheetTrigger as={Button} variant="tonal">
        Filters
      </SideSheetTrigger>
      <SideSheetPortal>
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
                  <CheckboxInput />
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
      </SideSheetPortal>
    </SideSheet>
  );
}

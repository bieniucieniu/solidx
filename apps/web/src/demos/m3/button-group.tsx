import {
  Button,
  ButtonGroup,
  IconButton,
  ToggleButton,
  ToggleIconButton,
  type ButtonSize,
} from "@solidx/kit/m3";
import { createSignal, For } from "solid-js";
import { DemoRow, DemoStack, FavoriteIcon, ShareIcon, StarIcon } from "./shared";

const sizes: ButtonSize[] = ["xs", "sm", "md"];
const views = ["Day", "Week", "Month"];

export function ButtonGroupDemo() {
  const [view, setView] = createSignal("Week");
  return (
    <DemoStack>
      <DemoRow label="Standard">
        <ButtonGroup>
          <Button variant="tonal">Reply</Button>
          <Button variant="tonal">Forward</Button>
          <IconButton variant="tonal" aria-label="Share">
            <ShareIcon />
          </IconButton>
        </ButtonGroup>
      </DemoRow>
      <For each={sizes}>
        {(size) => (
          <DemoRow label={`Connected, ${size}`}>
            <ButtonGroup variant="connected" size={size}>
              <For each={views}>
                {(item) => (
                  <ToggleButton
                    variant="tonal"
                    pressed={view() === item}
                    onPressedChange={() => setView(item)}
                  >
                    {item}
                  </ToggleButton>
                )}
              </For>
            </ButtonGroup>
          </DemoRow>
        )}
      </For>
      <DemoRow label="Connected icon toggles">
        <ButtonGroup variant="connected" size="md">
          <ToggleIconButton variant="filled" aria-label="Favorite">
            <FavoriteIcon />
          </ToggleIconButton>
          <ToggleIconButton variant="filled" aria-label="Star" defaultPressed>
            <StarIcon />
          </ToggleIconButton>
          <ToggleIconButton variant="filled" aria-label="Share">
            <ShareIcon />
          </ToggleIconButton>
        </ButtonGroup>
      </DemoRow>
    </DemoStack>
  );
}

import {
  AppBar,
  AppBarHeadline,
  AppBarLeading,
  AppBarSubtitle,
  AppBarTitle,
  AppBarTrailing,
  type AppBarVariant,
  IconButton,
} from "@solidx/kit-1.9/m3";
import { For } from "solid-js";
import { ArrowBackIcon, DemoRow, DemoStack, MoreVertIcon, StarIcon } from "./shared";

const variants: AppBarVariant[] = ["small", "medium", "large"];

export function AppBarDemo() {
  return (
    <DemoStack>
      <For each={variants}>
        {(variant) => (
          <DemoRow label={variant} class="block">
            <AppBar variant={variant} class="rounded-medium">
              <AppBarLeading>
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </AppBarLeading>
              <AppBarHeadline>
                <AppBarTitle>Title</AppBarTitle>
                <AppBarSubtitle>Subtitle</AppBarSubtitle>
              </AppBarHeadline>
              <AppBarTrailing>
                <IconButton aria-label="Favorite">
                  <StarIcon />
                </IconButton>
                <IconButton aria-label="More">
                  <MoreVertIcon />
                </IconButton>
              </AppBarTrailing>
            </AppBar>
          </DemoRow>
        )}
      </For>
      <DemoRow label="Small, centered, scrolled" class="block">
        <AppBar centered scrolled class="rounded-medium">
          <AppBarLeading>
            <IconButton aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          </AppBarLeading>
          <AppBarHeadline>
            <AppBarTitle>Centered</AppBarTitle>
          </AppBarHeadline>
          <AppBarTrailing>
            <IconButton aria-label="More">
              <MoreVertIcon />
            </IconButton>
          </AppBarTrailing>
        </AppBar>
      </DemoRow>
    </DemoStack>
  );
}

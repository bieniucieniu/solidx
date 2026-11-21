import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  type CardVariant,
  IconButton,
} from "@solidx/kit-1.9/m3";
import { For } from "solid-js";
import { MoreVertIcon } from "./shared";

const variants: CardVariant[] = ["elevated", "filled", "outlined"];

export function CardDemo() {
  return (
    <div class="grid gap-4 expanded:grid-cols-3">
      <For each={variants}>
        {(variant) => (
          <Card variant={variant}>
            <CardMedia>
              <div class="h-32 bg-linear-to-br from-primary-container to-tertiary-container" />
            </CardMedia>
            <CardHeader>
              <CardTitle class="capitalize">{variant}</CardTitle>
              <CardDescription>Card subhead</CardDescription>
              <CardAction>
                <IconButton aria-label="More">
                  <MoreVertIcon />
                </IconButton>
              </CardAction>
            </CardHeader>
            <CardContent>Supporting text for the card, a sentence or two long.</CardContent>
            <CardFooter>
              <Button variant="outlined">Later</Button>
              <Button>Open</Button>
            </CardFooter>
          </Card>
        )}
      </For>
      <Card variant="filled" interactive tabIndex={0} class="expanded:col-span-3">
        <CardHeader>
          <CardTitle>Interactive card</CardTitle>
          <CardDescription>Hover, focus, or press to see the state layer.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

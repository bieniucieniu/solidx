import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@solidx/kit/ui";
import { For } from "solid-js";

const sizes = ["default", "sm"] as const;

export function CardDemo() {
  return (
    <div class="grid w-full gap-4 sm:grid-cols-2">
      <For each={sizes}>
        {(size) => (
          <Card size={size}>
            <CardHeader>
              <CardTitle>Project ({size})</CardTitle>
              <CardDescription>A short summary of the work.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>Three open tasks.</CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        )}
      </For>
    </div>
  );
}

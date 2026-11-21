import { DocsPage } from "~/components/preview";
import { CardDemo } from "~/demos/ui/card";
import source from "~/demos/ui/card.tsx?raw";

const snippet = `import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@solidx/kit/ui";

// size: "default" | "sm"
<Card size="sm">
  <CardHeader>
    <CardTitle>Project</CardTitle>
    <CardDescription>A short summary of the work.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">Edit</Button>
    </CardAction>
  </CardHeader>
  <CardContent>Three open tasks.</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`;

export default function CardPage() {
  return (
    <DocsPage
      title="Card"
      description="A bordered block with a header and footer."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/card.tsx"
    >
      <CardDemo />
    </DocsPage>
  );
}

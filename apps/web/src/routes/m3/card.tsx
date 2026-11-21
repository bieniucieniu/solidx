import { DocsPage } from "~/components/preview";
import { CardDemo } from "~/demos/m3/card";
import source from "~/demos/m3/card.tsx?raw";

const snippet = `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@solidx/kit/m3";

// variant: "elevated" | "filled" | "outlined"
<Card variant="outlined">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subhead</CardDescription>
  </CardHeader>
  <CardContent>Supporting text</CardContent>
  <CardFooter><Button>Open</Button></CardFooter>
</Card>`;

export default function CardPage() {
  return (
    <DocsPage
      title="Card"
      description="Elevated, filled, and outlined containers for one subject."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/card.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <CardDemo />
    </DocsPage>
  );
}

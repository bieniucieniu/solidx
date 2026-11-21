import { DocsPage } from "~/components/preview";
import { AlertDemo } from "~/demos/ui/alert";
import source from "~/demos/ui/alert.tsx?raw";

const snippet = `import { Alert, AlertDescription, AlertTitle } from "@solidx/kit/ui";

// variant: "default" | "destructive"
<Alert variant="destructive">
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Check your card details and try again.</AlertDescription>
</Alert>`;

export default function AlertPage() {
  return (
    <DocsPage
      title="Alert"
      description="A short status message."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/alert.tsx"
    >
      <AlertDemo />
    </DocsPage>
  );
}

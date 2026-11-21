import { DocsPage } from "~/components/preview";
import { SpinnerDemo } from "~/demos/ui/spinner";
import source from "~/demos/ui/spinner.tsx?raw";

const snippet = `import { Spinner } from "@solidx/kit/ui";

<Spinner />`;

export default function SpinnerPage() {
  return (
    <DocsPage
      title="Spinner"
      description="An indicator that something is loading."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/spinner.tsx"
    >
      <SpinnerDemo />
    </DocsPage>
  );
}

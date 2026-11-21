import { DocsPage } from "~/components/preview";
import { ProgressDemo } from "~/demos/ui/progress";
import source from "~/demos/ui/progress.tsx?raw";

const snippet = `import {
  Progress,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  ProgressValueLabel,
} from "@solidx/kit/ui";

<Progress value={64}>
  <ProgressLabel>Upload</ProgressLabel>
  <ProgressValueLabel />
  <ProgressTrack>
    <ProgressFill />
  </ProgressTrack>
</Progress>`;

export default function ProgressPage() {
  return (
    <DocsPage
      title="Progress"
      description="A bar that shows completion."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/progress.tsx"
    >
      <ProgressDemo />
    </DocsPage>
  );
}

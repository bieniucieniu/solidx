import { DocsPage } from "~/components/preview";
import { BreadcrumbDemo } from "~/demos/ui/breadcrumb";
import source from "~/demos/ui/breadcrumb.tsx?raw";

const snippet = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@solidx/kit/ui";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/ui">UI</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/ui/breadcrumb" current>
        Breadcrumb
      </BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

export default function BreadcrumbPage() {
  return (
    <DocsPage
      title="Breadcrumb"
      description="The path back to parent pages."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/breadcrumb.tsx"
    >
      <BreadcrumbDemo />
    </DocsPage>
  );
}

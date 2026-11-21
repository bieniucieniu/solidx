import { DocsPage } from "~/components/preview";
import { PaginationDemo } from "~/demos/ui/pagination";
import source from "~/demos/ui/pagination.tsx?raw";

const snippet = `import { Pagination, PaginationItems } from "@solidx/kit/ui";

<Pagination pageCount={10} page={page()} onPageChange={(next) => setPage(next)}>
  <PaginationItems />
</Pagination>`;

export default function PaginationPage() {
  return (
    <DocsPage
      title="Pagination"
      description="Controls for moving between pages."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/pagination.tsx"
    >
      <PaginationDemo />
    </DocsPage>
  );
}

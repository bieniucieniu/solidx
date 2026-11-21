import { Pagination, PaginationItems } from "@solidx/kit/ui";
import { createSignal } from "solid-js";

export function PaginationDemo() {
  const [page, setPage] = createSignal(1);

  return (
    <div class="flex flex-col gap-3">
      <Pagination pageCount={10} page={page()} onPageChange={(next) => setPage(next)}>
        <PaginationItems />
      </Pagination>
      <p class="text-sm text-muted-foreground">Page {page()}</p>
    </div>
  );
}

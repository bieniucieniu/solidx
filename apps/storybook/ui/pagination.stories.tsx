import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "@solidx/kit-1.9/ui";
import { createSignal } from "solid-js";

// Render-only stories: the demo owns the component's required props, so no `component`/args.
const meta = {
  title: "UI/Pagination",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PaginationDemo />,
};

function PaginationDemo() {
  const [page, setPage] = createSignal(1);

  return (
    <div class="flex flex-col gap-3">
      <Pagination
        count={10}
        page={page()}
        onPageChange={setPage}
        itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
        ellipsisComponent={() => <PaginationEllipsis />}
      >
        <PaginationPrevious />
        <PaginationItems />
        <PaginationNext />
      </Pagination>
      <p class="text-sm text-muted-foreground">Page {page()}</p>
    </div>
  );
}

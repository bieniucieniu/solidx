import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@solidx/kit/ui";

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No files</EmptyTitle>
        <EmptyDescription>Upload one to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button">Upload</Button>
      </EmptyContent>
    </Empty>
  );
}

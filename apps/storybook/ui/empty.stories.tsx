import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Button,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Empty",
  component: Empty,
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmptyDemo />,
};

function EmptyDemo() {
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

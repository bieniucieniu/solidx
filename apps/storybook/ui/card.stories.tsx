import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardDemo />,
};

function CardDemo() {
  return (
    <Card class="max-w-sm">
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>A short summary of the work.</CardDescription>
      </CardHeader>
      <CardContent>Three open tasks.</CardContent>
      <CardFooter>
        <Button type="button">Save</Button>
      </CardFooter>
    </Card>
  );
}

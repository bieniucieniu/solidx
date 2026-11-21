import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TabsDemo />,
};

function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings.</TabsContent>
      <TabsContent value="password">Password settings.</TabsContent>
    </Tabs>
  );
}

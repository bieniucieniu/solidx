import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Avatar, AvatarFallback, AvatarImg } from "@solidx/kit-1.9/ui";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AvatarDemo />,
};

function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImg alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  );
}

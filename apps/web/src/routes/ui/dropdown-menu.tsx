import { DocsPage } from "~/components/preview";
import { DropdownMenuDemo } from "~/demos/ui/dropdown-menu";
import source from "~/demos/ui/dropdown-menu.tsx?raw";

const snippet = `import {
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@solidx/kit/ui";

<DropdownMenu>
  <DropdownMenuTrigger class={buttonVariants()}>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

export default function DropdownMenuPage() {
  return (
    <DocsPage
      title="Dropdown menu"
      description="A menu opened from a button."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/dropdown-menu.tsx"
    >
      <DropdownMenuDemo />
    </DocsPage>
  );
}

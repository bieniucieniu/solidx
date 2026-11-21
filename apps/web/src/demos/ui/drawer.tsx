import {
  buttonVariants,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel,
  DrawerOverlay,
  DrawerTrigger,
} from "@solidx/kit/ui";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger class={buttonVariants({ variant: "outline" })}>Open</DrawerTrigger>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerLabel>Filters</DrawerLabel>
          <DrawerDescription>Narrow the list.</DrawerDescription>
        </DrawerHeader>
        <p class="text-muted-foreground">Content placed directly in the drawer is padded.</p>
        <DrawerFooter>
          <DrawerClose variant="default">Apply</DrawerClose>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

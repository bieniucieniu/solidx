import {
  buttonVariants,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverLabel,
  PopoverTrigger,
} from "@solidx/kit/ui";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger class={buttonVariants()}>Open</PopoverTrigger>
      <PopoverContent>
        <PopoverLabel>Dimensions</PopoverLabel>
        <PopoverDescription>Set the size of the frame.</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

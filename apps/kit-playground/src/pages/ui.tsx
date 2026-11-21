import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxLabel,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxListbox,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputControl,
  InputLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Kbd,
  Pagination,
  PaginationItems,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  ProgressIndicator,
  ProgressTrack,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  Spinner,
  Switch,
  SwitchLabel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastRegion,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  buttonVariants,
  toast,
} from "@solidx/kit/ui";
import type { JSX } from "@solidjs/web";

function Section(props: { title: string; children: JSX.Element }) {
  return (
    <section class="flex flex-col gap-3" data-testid={`section-${props.title.toLowerCase()}`}>
      <h2 class="text-sm font-semibold">{props.title}</h2>
      <div class="flex flex-wrap items-start gap-3">{props.children}</div>
    </section>
  );
}

export function UiPage() {
  return (
    <div class="grid gap-8 md:grid-cols-2">
      <Section title="Buttons">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Badge>Badge</Badge>
        <Kbd>⌘K</Kbd>
        <Spinner />
      </Section>

      <Section title="Overlays">
        <Dialog>
          <DialogTrigger class={buttonVariants({ variant: "outline" })}>Dialog</DialogTrigger>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile.</DialogDescription>
            </DialogHeader>
            <Input>
              <InputLabel>Name</InputLabel>
              <InputControl defaultValue="Ada" />
            </Input>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <DialogClose variant="default">Save</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger class={buttonVariants({ variant: "destructive" })}>
            Delete
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete the project?</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose>Cancel</AlertDialogClose>
              <AlertDialogClose value="confirm" variant="destructive">
                Delete
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Popover>
          <PopoverTrigger class={buttonVariants({ variant: "outline" })}>Popover</PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the layer size.</PopoverDescription>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger class={buttonVariants({ variant: "outline" })}>Tooltip</TooltipTrigger>
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
        <HoverCard>
          <HoverCardTrigger href="#ui" class="text-xs underline">
            @solidx
          </HoverCardTrigger>
          <HoverCardContent>Solid components on ui-sdk.</HoverCardContent>
        </HoverCard>
        <Sheet>
          <SheetTrigger class={buttonVariants({ variant: "outline" })}>Sheet</SheetTrigger>
          <SheetOverlay />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Swipe or press Escape to close.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Drawer>
          <DrawerTrigger class={buttonVariants({ variant: "outline" })}>Drawer</DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>Drag down to dismiss.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        <Button
          variant="outline"
          onClick={() => toast("Event created", { description: "Friday at 10:00" })}
        >
          Toast
        </Button>
      </Section>

      <Section title="Menus">
        <DropdownMenu>
          <DropdownMenuTrigger class={buttonVariants({ variant: "outline" })}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem value="profile">
              Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem value="settings">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem value="logout" variant="destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Select placeholder="Pick a fruit">
          <SelectTrigger class="w-40" aria-label="Fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
        <Combobox>
          <ComboboxControl class="w-48">
            <ComboboxInput placeholder="Framework" aria-label="Framework" />
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxContent>
            <ComboboxListbox>
              <ComboboxItem value="solid">Solid</ComboboxItem>
              <ComboboxItem value="svelte">Svelte</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </Section>

      <Section title="Forms">
        <CheckboxLabel>
          <Checkbox defaultChecked />
          Accept terms
        </CheckboxLabel>
        <SwitchLabel>
          <Switch />
          Airplane mode
        </SwitchLabel>
        <RadioGroup aria-label="Plan" defaultValue="pro" class="w-auto">
          <RadioGroupItemLabel>
            <RadioGroupItem value="free" /> Free
          </RadioGroupItemLabel>
          <RadioGroupItemLabel>
            <RadioGroupItem value="pro" /> Pro
          </RadioGroupItemLabel>
        </RadioGroup>
        <Slider defaultValue={40} class="w-48">
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Volume" />
            </SliderTrack>
          </SliderControl>
        </Slider>
        <Progress value={60} class="w-48" aria-label="Upload">
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Toggle aria-label="Bold">B</Toggle>
        <ToggleGroup variant="outline" spacing={0} aria-label="Align">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Section>

      <Section title="Disclosure">
        <Tabs defaultValue="account" class="w-72">
          <TabsList aria-label="Settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Manage your account.</TabsContent>
          <TabsContent value="password">Change your password.</TabsContent>
        </Tabs>
        <Accordion class="w-72">
          <AccordionItem value="a">
            <AccordionHeader>
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionHeader>
              <AccordionTrigger>Is it animated?</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Yes, with CSS transitions on the panel height.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Display">
        <Card class="w-64">
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Plain elements, no primitive.</CardDescription>
          </CardHeader>
          <CardContent>
            <Avatar>
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
        <Alert class="w-64">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Solid 2.0 and ui-sdk.</AlertDescription>
        </Alert>
        <Skeleton class="h-10 w-40" />
        <Separator />
        <Pagination pageCount={10}>
          <PaginationItems />
        </Pagination>
        <Calendar defaultValue="2026-11-20" />
      </Section>
      <ToastRegion />
    </div>
  );
}

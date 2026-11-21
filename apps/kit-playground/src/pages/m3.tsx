import {
  Button,
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeadline,
  DialogOverlay,
  DialogTrigger,
  FilterChip,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuTrigger,
  Progress,
  ProgressFill,
  ProgressTrack,
  SegmentedButton,
  SegmentedButtonItem,
  Slider,
  SliderControl,
  SliderFill,
  SliderThumb,
  SliderTrack,
  SnackbarRegion,
  Switch,
  SwitchControl,
  SwitchLabel,
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
  TextField,
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  buttonVariants,
  snackbar,
} from "@solidx/kit/m3";

export function M3Page() {
  return (
    <div data-m3 class="flex flex-col gap-8 rounded-xl bg-surface p-6 text-on-surface">
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <ToggleButton variant="outlined" aria-label="Favorite">
          Favorite
        </ToggleButton>
        <FilterChip>Vegan</FilterChip>
        <Button variant="tonal" onClick={() => snackbar("Photo saved")}>
          Snackbar
        </Button>
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <Checkbox>
          <CheckboxControl defaultChecked />
          <CheckboxLabel>Remember me</CheckboxLabel>
        </Checkbox>
        <Switch>
          <SwitchControl defaultChecked />
          <SwitchLabel>Wi-Fi</SwitchLabel>
        </Switch>
        <SegmentedButton aria-label="View" defaultValue={["day"]}>
          <SegmentedButtonItem value="day">Day</SegmentedButtonItem>
          <SegmentedButtonItem value="week">Week</SegmentedButtonItem>
          <SegmentedButtonItem value="month">Month</SegmentedButtonItem>
        </SegmentedButton>
        <CircularProgress value={70} aria-label="Loading" />
      </div>

      <div class="flex flex-wrap items-start gap-6">
        <TextField class="w-64">
          <TextFieldContainer>
            <TextFieldLabel>Email</TextFieldLabel>
            <TextFieldInput />
          </TextFieldContainer>
        </TextField>
        <TextField variant="outlined" class="w-64">
          <TextFieldContainer>
            <TextFieldLabel>Name</TextFieldLabel>
            <TextFieldInput />
          </TextFieldContainer>
        </TextField>
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <Slider defaultValue={30} class="w-64">
          <SliderControl>
            <SliderTrack>
              <SliderFill />
              <SliderThumb aria-label="Brightness" />
            </SliderTrack>
          </SliderControl>
        </Slider>
        <Progress value={45} class="w-64" aria-label="Upload">
          <ProgressTrack>
            <ProgressFill />
          </ProgressTrack>
        </Progress>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Menu>
          <MenuTrigger class={buttonVariants({ variant: "outlined" })}>Menu</MenuTrigger>
          <MenuContent>
            <MenuItem value="cut">
              <MenuItemLabel>Cut</MenuItemLabel>
            </MenuItem>
            <MenuItem value="copy">
              <MenuItemLabel>Copy</MenuItemLabel>
            </MenuItem>
          </MenuContent>
        </Menu>
        <Dialog>
          <DialogTrigger class={buttonVariants({ variant: "tonal" })}>Dialog</DialogTrigger>
          <DialogOverlay />
          <DialogContent>
            <DialogHeadline>Reset settings?</DialogHeadline>
            <DialogDescription>This resets your app preferences.</DialogDescription>
            <DialogActions>
              <DialogClose>Cancel</DialogClose>
              <DialogClose>Accept</DialogClose>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Tooltip>
          <TooltipTrigger class={buttonVariants({ variant: "text" })}>Tooltip</TooltipTrigger>
          <TooltipContent>Save to favorites</TooltipContent>
        </Tooltip>
      </div>

      <Tabs defaultValue="photos" class="max-w-md">
        <TabsList aria-label="Media">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="photos">All photos</TabsContent>
        <TabsContent value="videos">All videos</TabsContent>
      </Tabs>
      <SnackbarRegion />
    </div>
  );
}

import { Button, ToastRegion, toast } from "@solidx/kit/ui";

export function ToastDemo() {
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          toast("Saved", {
            description: "Your changes are stored.",
            action: { label: "Undo", onAction: () => toast("Change undone") },
          });
        }}
      >
        Show toast
      </Button>
      <ToastRegion />
    </>
  );
}

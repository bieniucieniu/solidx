import { Button, SnackbarRegion, snackbar } from "@solidx/kit/m3";

let count = 0;

export function SnackbarDemo() {
  const showSimple = () => {
    count += 1;
    snackbar(`Message ${count} archived`);
  };
  const showWithAction = () => {
    snackbar("Connection lost. Changes are saved locally.", {
      // Stays until it's dismissed: the action or the close button.
      duration: Infinity,
      action: { label: "Retry" },
    });
  };
  return (
    <div class="flex flex-wrap gap-3">
      <Button variant="tonal" onClick={showSimple}>
        Show snackbar
      </Button>
      <Button variant="outlined" onClick={showWithAction}>
        With action and close
      </Button>
      <SnackbarRegion />
    </div>
  );
}

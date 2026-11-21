import {
  Button,
  Snackbar,
  SnackbarAction,
  SnackbarClose,
  SnackbarList,
  SnackbarMessage,
  SnackbarRegion,
  snackbar,
} from "@solidx/kit-1.9/m3";
import { Portal } from "solid-js/web";

let count = 0;

export function SnackbarDemo() {
  const showSimple = () => {
    count += 1;
    snackbar.show((props) => (
      <Snackbar toastId={props.toastId}>
        <SnackbarMessage>Message {count} archived</SnackbarMessage>
      </Snackbar>
    ));
  };
  const showWithAction = () => {
    snackbar.show((props) => (
      <Snackbar toastId={props.toastId} persistent>
        <SnackbarMessage>Connection lost. Changes are saved locally.</SnackbarMessage>
        <SnackbarAction onClick={() => snackbar.dismiss(props.toastId)}>Retry</SnackbarAction>
        <SnackbarClose />
      </Snackbar>
    ));
  };
  return (
    <div class="flex flex-wrap gap-3">
      <Button variant="tonal" onClick={showSimple}>
        Show snackbar
      </Button>
      <Button variant="outlined" onClick={showWithAction}>
        With action and close
      </Button>
      <Portal>
        <SnackbarRegion>
          <SnackbarList />
        </SnackbarRegion>
      </Portal>
    </div>
  );
}

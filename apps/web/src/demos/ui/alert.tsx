import { Alert, AlertDescription, AlertTitle } from "@solidx/kit/ui";

export function AlertDemo() {
  return (
    <div class="grid w-full max-w-md gap-4">
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can change this later.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check your card details and try again.</AlertDescription>
      </Alert>
    </div>
  );
}

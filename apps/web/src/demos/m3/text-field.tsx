import {
  IconButton,
  TextField,
  TextFieldContainer,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLeading,
  TextFieldTextArea,
  TextFieldTrailing,
  type TextFieldVariant,
} from "@solidx/kit/m3";
import { For } from "solid-js";
import { CloseIcon, DemoRow, DemoStack, SearchIcon } from "./shared";

const variants: TextFieldVariant[] = ["filled", "outlined"];

export function TextFieldDemo() {
  return (
    <DemoStack>
      <For each={variants}>
        {(variant) => (
          <DemoRow label={variant} class="grid items-start gap-6 medium:grid-cols-2">
            <TextField variant={variant}>
              <TextFieldContainer>
                <TextFieldLabel>Name</TextFieldLabel>
                <TextFieldInput />
              </TextFieldContainer>
              <TextFieldDescription>As it appears on your ID</TextFieldDescription>
            </TextField>
            <TextField variant={variant}>
              <TextFieldContainer>
                <TextFieldLeading>
                  <SearchIcon />
                </TextFieldLeading>
                <TextFieldLabel>Search</TextFieldLabel>
                <TextFieldInput defaultValue="Material" />
                <TextFieldTrailing>
                  <IconButton aria-label="Clear">
                    <CloseIcon />
                  </IconButton>
                </TextFieldTrailing>
              </TextFieldContainer>
            </TextField>
            <TextField variant={variant} invalid>
              <TextFieldContainer>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput type="email" defaultValue="not-an-email" />
              </TextFieldContainer>
              <TextFieldErrorMessage>Enter a valid email address</TextFieldErrorMessage>
            </TextField>
            <TextField variant={variant} disabled>
              <TextFieldContainer>
                <TextFieldLabel>Disabled</TextFieldLabel>
                <TextFieldInput defaultValue="Read only" />
              </TextFieldContainer>
            </TextField>
            <TextField variant={variant} class="medium:col-span-2">
              <TextFieldContainer>
                <TextFieldLabel>Message</TextFieldLabel>
                <TextFieldTextArea placeholder="Say hello" />
              </TextFieldContainer>
            </TextField>
          </DemoRow>
        )}
      </For>
    </DemoStack>
  );
}

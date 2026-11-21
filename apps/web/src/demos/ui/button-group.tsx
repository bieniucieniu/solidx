import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@solidx/kit/ui";
import { VariantRow, VariantStack } from "~/components/preview";

export function ButtonGroupDemo() {
  return (
    <VariantStack>
      <VariantRow label="Horizontal">
        <ButtonGroup>
          <Button variant="outline">Cut</Button>
          <Button variant="outline">Copy</Button>
          <Button variant="outline">Paste</Button>
        </ButtonGroup>
      </VariantRow>
      <VariantRow label="Vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </VariantRow>
      <VariantRow label="With text and separator">
        <ButtonGroup>
          <ButtonGroupText>Zoom</ButtonGroupText>
          <Button variant="secondary">-</Button>
          <ButtonGroupSeparator />
          <Button variant="secondary">+</Button>
        </ButtonGroup>
      </VariantRow>
    </VariantStack>
  );
}

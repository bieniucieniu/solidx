import { Tabs, TabsContent, TabsList, TabsTrigger } from "@solidx/kit/ui";
import { For } from "solid-js";
import { VariantRow, VariantStack } from "~/components/preview";

const variants = ["default", "line"] as const;

export function TabsDemo() {
  return (
    <VariantStack>
      <For each={variants}>
        {(variant) => (
          <VariantRow label={variant}>
            <Tabs defaultValue="account">
              <TabsList variant={variant}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings.</TabsContent>
              <TabsContent value="password">Password settings.</TabsContent>
              <TabsContent value="team">Team settings.</TabsContent>
            </Tabs>
          </VariantRow>
        )}
      </For>
      <VariantRow label="Vertical">
        <Tabs defaultValue="account" orientation="vertical">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings.</TabsContent>
          <TabsContent value="password">Password settings.</TabsContent>
        </Tabs>
      </VariantRow>
    </VariantStack>
  );
}

import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@solidx/kit-1.9/m3";
import { DemoRow, DemoStack, HomeIcon, MailIcon, PersonIcon } from "./shared";

export function TabsDemo() {
  return (
    <DemoStack>
      <DemoRow label="Primary, with icons" class="block">
        <Tabs defaultValue="mail">
          <TabsList>
            <TabsTrigger value="home">
              <HomeIcon />
              Home
            </TabsTrigger>
            <TabsTrigger value="mail">
              <MailIcon />
              Mail
            </TabsTrigger>
            <TabsTrigger value="people">
              <PersonIcon />
              People
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="home" class="typescale-body-medium">
            Home view
          </TabsContent>
          <TabsContent value="mail" class="typescale-body-medium">
            Mail view
          </TabsContent>
          <TabsContent value="people" class="typescale-body-medium">
            People view
          </TabsContent>
        </Tabs>
      </DemoRow>
      <DemoRow label="Secondary" class="block">
        <Tabs variant="secondary" defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </DemoRow>
    </DemoStack>
  );
}

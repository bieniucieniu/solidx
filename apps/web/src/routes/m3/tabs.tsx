import { DocsPage } from "~/components/preview";
import { TabsDemo } from "~/demos/m3/tabs";
import source from "~/demos/m3/tabs.tsx?raw";

const snippet = `import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@solidx/kit/m3";

// variant: "primary" | "secondary"
<Tabs defaultValue="mail">
  <TabsList>
    <TabsTrigger value="home"><HomeIcon />Home</TabsTrigger>
    <TabsTrigger value="mail"><MailIcon />Mail</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="home">...</TabsContent>
  <TabsContent value="mail">...</TabsContent>
</Tabs>`;

export default function TabsPage() {
  return (
    <DocsPage
      title="Tabs"
      description="Primary and secondary tabs."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/tabs.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <TabsDemo />
    </DocsPage>
  );
}

import { PackageIndex } from "~/components/package-index";
import { sidebars } from "~/nav";

const pages = sidebars.ui.slice(1);

export default function UIIndex() {
  return (
    <PackageIndex
      title="UI"
      description="Buttons, form controls, overlays, and layout."
      snippet={'import { Button, Dialog, Input, Select, Tabs } from "@solidx/kit/ui";'}
      pages={pages}
    />
  );
}

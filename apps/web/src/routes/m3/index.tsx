import { PackageIndex } from "~/components/package-index-m3";
import { sidebars } from "~/nav";

const pages = sidebars.m3.slice(1);

export default function M3Index() {
  return (
    <PackageIndex
      title="Material 3"
      description="Material 3 Expressive components on the same API as UI."
      snippet={'import { Button, Dialog, TextField, NavigationBar } from "@solidx/kit/m3";'}
      pages={pages}
    />
  );
}

import type { JSX } from "@solidjs/web";
import { type PackageId, packages, sidebars } from "~/nav";
import { SidebarNav } from "./nav";

/**
 * M3 fixed-and-flexible layout: from the expanded breakpoint the package's pages sit in a fixed
 * pane beside the rail, and the page fills the flexible pane. Below it they move to the modal
 * drawer behind the app bar's menu button.
 */
export function DocsLayout(props: { pkg: PackageId; children: JSX.Element }) {
  const title = () => packages.find((item) => item.id === props.pkg)?.title;
  return (
    <>
      <aside class="m3-chrome fixed top-0 bottom-0 left-24 z-20 hidden w-70 overflow-y-auto bg-surface [scrollbar-width:thin] expanded:block large:w-90">
        <SidebarNav
          items={sidebars[props.pkg]}
          //  title={title()}
        />
      </aside>
      <div class="expanded:pl-70 large:pl-90">
        <div class="mx-auto w-full max-w-5xl min-w-0 px-4 pt-2 pb-8 medium:px-6">
          {props.children}
        </div>
      </div>
    </>
  );
}

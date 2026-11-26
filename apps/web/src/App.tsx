import { Loading } from "solid-js";
import { Header, PackageNavigationBar, PackageNavigationRail } from "~/components/nav";
import { Router } from "./router";
import "./app.css";
// The build-time M3 scheme from the m3Scheme plugin (vite.config.ts) over the tokens.css defaults.
import "virtual:m3-scheme.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Header />
          <PackageNavigationRail class="fixed top-0 bottom-0 left-0 z-30 hidden medium:flex" />
          <PackageNavigationBar class="pb-[env(safe-area-inset-bottom)] medium:hidden fixed bottom-0 z-30 h-auto min-h-16" />
          {/* Room for the navigation bar (compact) or the rail (medium up). */}
          <div class="pb-[calc(4rem+env(safe-area-inset-bottom))] medium:pb-0 medium:pl-24">
            <Loading>{props.children}</Loading>
          </div>
        </>
      )}
    </Router>
  );
}

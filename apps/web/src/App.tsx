import { Loading } from "solid-js";
import { Header } from "~/components/header";
import { PackageNavigation } from "~/components/package-nav";
import { Router } from "./router";
import "./app.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Header />
          <PackageNavigation />
          {/* Room for the navigation bar (compact) or the rail (medium up). */}
          <div class="pb-[calc(4rem+env(safe-area-inset-bottom))] medium:pb-0 medium:pl-24">
            <Loading>{props.children}</Loading>
          </div>
        </>
      )}
    </Router>
  );
}

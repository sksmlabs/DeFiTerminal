import { Outlet } from "react-router-dom";
import { SiteHeader } from "./components/site-header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader enableSidebar={false} title="DeFi Terminal" />
      <main className="flex-1">
        <Outlet /> {/* all pages render here */}
      </main>
    </div>
  );
}

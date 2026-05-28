import { headers } from "next/headers";
import { notFound } from "next/navigation";
import AdminCommandTable from "@/components/AdminCommandTable";
import AdminGate from "@/components/AdminGate";
import EntryGate from "@/components/EntryGate";
import HorseHero from "@/components/HorseHero";
import PageRail from "@/components/PageRail";
import SiteHeader from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "admin",
  robots: {
    index: false,
    follow: false
  }
};

function isAdminHost(host) {
  const hostname = host.split(":")[0];
  return (
    hostname === "admin.zest.horse" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

export default async function AdminPage() {
  const requestHeaders = await headers();

  if (!isAdminHost(requestHeaders.get("host") || "")) {
    notFound();
  }

  return (
    <EntryGate>
      <div className="home-shell">
        <SiteHeader />
        <main className="terminal-home" id="main">
          <h1 className="sr-only">horsepower admin terminal</h1>
          <HorseHero />
          <AdminGate />
          <AdminCommandTable />
          <PageRail />
        </main>
      </div>
    </EntryGate>
  );
}

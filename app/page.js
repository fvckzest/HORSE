import CommandConsole from "@/components/CommandConsole";
import EntryGate from "@/components/EntryGate";
import HorseHero from "@/components/HorseHero";
import PageRail from "@/components/PageRail";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "terminal",
  description:
    "A bare terminal entry into horse mode, the hidden backend layer of zest.art."
};

export default function HomePage() {
  return (
    <EntryGate>
      <div className="home-shell">
        <SiteHeader />
        <main className="terminal-home" id="main">
          <h1 className="sr-only">horsepower terminal</h1>
          <HorseHero />
          <CommandConsole />
          <PageRail />
        </main>
      </div>
    </EntryGate>
  );
}

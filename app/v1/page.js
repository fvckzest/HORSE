import AppShell from "@/components/AppShell";
import BootSequence from "@/components/BootSequence";
import CommandConsole from "@/components/CommandConsole";
import CommandDock from "@/components/CommandDock";
import ExitPortal from "@/components/ExitPortal";
import FilePreviewGrid from "@/components/FilePreviewGrid";
import StatusPanel from "@/components/StatusPanel";
import { commandShortcuts } from "@/data/commands";
import { fileFragments } from "@/data/files";

export const metadata = {
  title: "v1",
  description:
    "The first-pass horsepower command center with status panels, file previews, and exit portals."
};

export default function V1Page() {
  return (
    <AppShell>
      <section className="hero-grid" aria-labelledby="home-title">
        <div className="terminal-panel hero-panel">
          <BootSequence />
          <div className="hero-copy">
            <p className="eyebrow">zest.art backend connection detected</p>
            <h1 id="home-title">horse mode initialized.</h1>
            <p>
              This is the hidden layer behind zest.art: a terminal-shaped
              playground for fragments, files, transmissions, and things that
              do not belong on the front page.
            </p>
          </div>
        </div>
        <StatusPanel />
      </section>

      <CommandConsole />
      <CommandDock commands={commandShortcuts} />
      <FilePreviewGrid files={fileFragments.slice(0, 4)} />
      <ExitPortal />
    </AppShell>
  );
}

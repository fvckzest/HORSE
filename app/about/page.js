import AppShell from "@/components/AppShell";
import ExitPortal from "@/components/ExitPortal";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "about",
  description:
    "What horsepower is, why it feels like a backend, and how it connects to zest.art."
};

export default function AboutPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="/about"
        title="what is this?"
        description="A little orientation without turning the lights all the way on."
      />
      <section className="terminal-panel readable-panel">
        <h2>the clean site has a basement.</h2>
        <p>
          horsepower is the playful, hidden counterpart to zest.art. The front
          site can hold the official archive and public-facing surface. This is
          where the wires live: casual art scraps, backend jokes, unfinished
          rooms, strange little files, and experimental doors.
        </p>
        <p>
          Nothing here is meant to feel like a normal portfolio. It should feel
          intentional, usable, and slightly like you clicked something you were
          not supposed to click.
        </p>
        <div className="terminal-note">
          <span>operator</span>
          <strong>dj horsepower</strong>
          <a href="mailto:fvck@zest.art">fvck@zest.art</a>
        </div>
      </section>
      <ExitPortal />
    </AppShell>
  );
}

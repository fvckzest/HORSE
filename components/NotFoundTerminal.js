import Link from "next/link";
import HomeLink from "@/components/HomeLink";

export default function NotFoundTerminal() {
  return (
    <section className="terminal-panel not-found-terminal" aria-labelledby="missing-title">
      <div className="panel-titlebar">
        <h1 id="missing-title">404 / lost terminal state</h1>
        <span>no route mounted</span>
      </div>
      <div className="terminal-output">
        <p className="output-label">fatal-ish exception</p>
        <h2>you found a door with no room behind it.</h2>
        <ul>
          <li>the file may not exist yet.</li>
          <li>the route may be sealed for phase 2.</li>
          <li>the backend may be pretending it never saw you.</li>
        </ul>
      </div>
      <div className="console-toolbar">
        <HomeLink>/home</HomeLink>
        <Link href="/music">/music</Link>
        <Link href="/links">/links</Link>
      </div>
    </section>
  );
}

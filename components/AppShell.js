import PageRail from "@/components/PageRail";
import SiteHeader from "@/components/SiteHeader";

export default function AppShell({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        skip to terminal
      </a>
      <SiteHeader />
      <main id="main" className="site-main">
        {children}
      </main>
      <PageRail />
      <footer className="site-footer">
        <span>mode: horse</span>
        <span>nothing is broken. probably.</span>
        <span>© {new Date().getFullYear()} horsepower</span>
      </footer>
    </div>
  );
}

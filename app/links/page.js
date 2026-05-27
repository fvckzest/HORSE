import AppShell from "@/components/AppShell";
import ExitPortal from "@/components/ExitPortal";
import PageHeader from "@/components/PageHeader";
import { portalLinks } from "@/data/links";

export const metadata = {
  title: "links",
  description:
    "Exit portals from horsepower to zest.art, Instagram, email, and nearby horse rooms."
};

export default function LinksPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="/links"
        title="exit portals"
        description="Public doors, nearby rooms, and ways back to the official surface."
      />
      <section className="link-grid" aria-label="horsepower links">
        {portalLinks.map((link) => (
          <a className="link-card" href={link.href} key={link.href}>
            <span>{link.label}</span>
            <strong>{link.title}</strong>
            <p>{link.description}</p>
          </a>
        ))}
      </section>
      <ExitPortal />
    </AppShell>
  );
}

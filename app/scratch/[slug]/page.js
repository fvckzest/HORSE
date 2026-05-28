import Link from "next/link";
import { notFound } from "next/navigation";
import HomeLink from "@/components/HomeLink";
import ScratchMedia from "@/components/ScratchMedia";
import SiteHeader from "@/components/SiteHeader";
import { getScratchEntries, getScratchEntry, isMusicEntry } from "@/data/scratch";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const entries = (await getScratchEntries()).filter((entry) => !isMusicEntry(entry));

  return entries.map((entry) => ({
    slug: entry.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await getScratchEntry(slug);

  if (!entry || isMusicEntry(entry)) {
    return {
      title: "scratch entry missing"
    };
  }

  return {
    title: entry.title,
    description: entry.excerpt
  };
}

export default async function ScratchEntryPage({ params }) {
  const { slug } = await params;
  const entry = await getScratchEntry(slug);

  if (!entry || isMusicEntry(entry)) {
    notFound();
  }

  return (
    <main className="scratch-note-shell">
      <div className="scratch-float-frame">
        <SiteHeader />
      </div>
      <nav className="scratch-float-nav" aria-label="scratch navigation">
        <Link href="/scratch">scratch</Link>
        <span>{entry.medium}</span>
        <HomeLink aria-label="home">
          h
        </HomeLink>
      </nav>

      <article className="scratch-note">
        <header className="scratch-note-header">
          <p>{entry.status}</p>
          <h1>{entry.title}</h1>
          <time dateTime={entry.date}>{entry.date}</time>
        </header>

        <div className="scratch-note-image">
          <ScratchMedia entry={entry} width={1100} height={760} priority />
        </div>

        <section className="scratch-note-copy" aria-label="entry note">
          <p>{entry.excerpt}</p>
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <div className="scratch-note-tags" aria-label="tags">
          {entry.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <footer className="scratch-note-actions">
          {entry.asset?.type && entry.asset.type !== "image" ? (
            <a href={entry.asset.url} download>
              download file
            </a>
          ) : null}
          {entry.href ? <Link href={entry.href}>connected room</Link> : null}
          <Link href="/scratch">back</Link>
        </footer>
      </article>
    </main>
  );
}

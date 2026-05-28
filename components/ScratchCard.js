import Link from "next/link";
import ScratchMedia from "@/components/ScratchMedia";

export default function ScratchCard({ entry, index }) {
  const sizeClass = index % 5 === 0 ? "scratch-card-wide" : "";

  return (
    <article className={`scratch-card ${sizeClass}`}>
      <Link href={`/scratch/${entry.slug}`} aria-label={`open ${entry.title}`}>
        <div className="scratch-image">
          <ScratchMedia entry={entry} width={640} height={460} />
        </div>
        <div className="scratch-card-copy">
          <span className="file-meta">
            {entry.medium} / {entry.status}
          </span>
          <h2>{entry.title}</h2>
          <p>{entry.excerpt}</p>
          <small>
            {entry.date} / {entry.mood}
          </small>
        </div>
      </Link>
    </article>
  );
}

import ScratchCard from "@/components/ScratchCard";

export default function ScratchGrid({ entries }) {
  return (
    <section className="scratch-section" aria-labelledby="scratch-title">
      <div className="section-heading">
        <p className="eyebrow">playground archive</p>
        <h2 id="scratch-title">scratch entries</h2>
      </div>
      <div className="scratch-grid">
        {entries.map((entry, index) => (
          <ScratchCard entry={entry} index={index} key={entry.slug} />
        ))}
      </div>
    </section>
  );
}

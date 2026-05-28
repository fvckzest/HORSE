export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="page-header">
      <span className="eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </header>
  );
}

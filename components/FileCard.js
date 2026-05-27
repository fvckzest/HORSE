export default function FileCard({ file }) {
  return (
    <a className="file-card" href={file.href}>
      <span className="file-meta">
        {file.label} / {file.status}
      </span>
      <strong>{file.filename}</strong>
      <p>{file.excerpt}</p>
      <small>{file.type}</small>
    </a>
  );
}

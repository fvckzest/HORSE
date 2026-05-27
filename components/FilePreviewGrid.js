import FileCard from "@/components/FileCard";

export default function FilePreviewGrid({ files }) {
  return (
    <section className="file-section" aria-labelledby="files-title">
      <div className="section-heading">
        <p className="eyebrow">artifact preview</p>
        <h2 id="files-title">local files</h2>
      </div>
      <div className="file-grid">
        {files.map((file) => (
          <FileCard file={file} key={file.filename} />
        ))}
      </div>
    </section>
  );
}

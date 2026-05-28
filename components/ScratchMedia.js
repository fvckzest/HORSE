import Image from "next/image";

function getAsset(entry) {
  if (entry.asset) return entry.asset;

  return {
    url: entry.image,
    type: "image",
    name: entry.title
  };
}

export default function ScratchMedia({
  entry,
  width = 980,
  height = 720,
  priority = false
}) {
  const asset = getAsset(entry);

  if (asset.type === "video") {
    return (
      <video
        aria-label={entry.title}
        controls
        loop
        muted
        playsInline
        preload="metadata"
        src={asset.url}
      />
    );
  }

  if (asset.type === "image") {
    return (
      <Image
        src={asset.url}
        alt=""
        width={width}
        height={height}
        priority={priority}
        unoptimized={asset.url.endsWith(".gif") || asset.url.startsWith("http")}
      />
    );
  }

  return (
    <div className="scratch-file-object">
      <span>{asset.type}</span>
      <strong>{asset.name || entry.title}</strong>
    </div>
  );
}

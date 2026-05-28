import MusicPlayer from "@/components/MusicPlayer";

export default function MusicTrackList({ tracks }) {
  return (
    <section className="music-section" aria-labelledby="music-title">
      <h2 className="sr-only" id="music-title">music tracks</h2>

      {tracks.length > 0 ? (
        <div className="music-grid">
          {tracks.map((track) => (
            <article className="music-track" key={track.slug}>
              <div className="music-track-copy">
                <strong>{track.title}</strong>
                {track.mood ? <em>{track.mood}</em> : null}
              </div>
              <MusicPlayer src={track.asset?.url || track.image} title={track.title} />
            </article>
          ))}
        </div>
      ) : (
        <div className="music-empty">
          <p>no tracks staged yet.</p>
          <small>drop an .mp3 or .wav through /add and it will appear here.</small>
        </div>
      )}
    </section>
  );
}

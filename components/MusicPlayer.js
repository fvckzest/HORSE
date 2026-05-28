"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function MusicPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    function syncTime() {
      setCurrentTime(audio.currentTime);
    }

    function syncDuration() {
      setDuration(audio.duration || 0);
    }

    function syncEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
    }

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("ended", syncEnded);

    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("ended", syncEnded);
    };
  }, [src]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function handleSeek(event) {
    const nextTime = Number(event.target.value);
    const audio = audioRef.current;

    setCurrentTime(nextTime);
    if (audio) audio.currentTime = nextTime;
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} preload="metadata" src={src}>
        <a href={src}>download audio</a>
      </audio>

      <button
        className="music-play-button"
        type="button"
        aria-label={isPlaying ? `pause ${title}` : `play ${title}`}
        onClick={togglePlayback}
      >
        {isPlaying ? (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="music-progress-shell">
        <input
          aria-label={`seek ${title}`}
          className="music-progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeek}
          style={{
            "--progress": `${duration ? (currentTime / duration) * 100 : 0}%`
          }}
        />
      </div>

      <span className="music-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}

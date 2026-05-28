"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { commandResponses } from "@/data/commands";
import { skipHomeIntroOnce } from "@/lib/homeIntro";

const phases = {
  idle: "type /add, /list, /delete slug, /refresh, or /clear",
  file: "drag a scratch or music file into the bar, then press enter",
  title: "title",
  artist: "artist",
  date: "date mm/dd/yyyy"
};

function isAudioFile(file) {
  return Boolean(
    file &&
      (file.type.startsWith("audio/") || /\.(mp3|wav)$/i.test(file.name))
  );
}

export default function AdminConsole({
  accessToken,
  initialEntries,
  onSignOut
}) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [phase, setPhase] = useState("idle");
  const [input, setInput] = useState("");
  const [draft, setDraft] = useState({ file: null, title: "", artist: "" });
  const [log, setLog] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const prompt = phases[phase];
  const fileLabel = useMemo(() => {
    if (!draft.file) return "";
    return `${draft.file.name} (${Math.ceil(draft.file.size / 1024)}kb)`;
  }, [draft.file]);

  function getHeaders() {
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  function writeLine(line) {
    setLog((current) => [...current.slice(-40), line]);
  }

  function resetDraft() {
    setDraft({ file: null, title: "", artist: "" });
    setInput("");
    setPhase("idle");
  }

  async function refreshEntries() {
    const response = await fetch("/api/admin/scratch", {
      cache: "no-store",
      headers: getHeaders()
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Could not load entries.");
    setEntries(data.entries);
  }

  useEffect(() => {
    if (!accessToken) return;

    const timer = window.setTimeout(() => {
      fetch("/api/admin/scratch", {
        cache: "no-store",
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Could not load entries.");
          setEntries(data.entries);
        })
        .catch((error) => writeLine(error.message));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [accessToken]);

  async function addEntry(date) {
    const formData = new FormData();
    formData.append("file", draft.file);
    formData.append("title", draft.title);
    formData.append("artist", draft.artist);
    formData.append("date", date);
    setIsBusy(true);

    try {
      const response = await fetch("/api/admin/scratch", {
        method: "POST",
        headers: getHeaders(),
        body: formData
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Could not add entry.");

      setEntries((current) => [data.entry, ...current]);
      writeLine(`added ${data.entry.slug}.`);
      resetDraft();
    } catch (error) {
      writeLine(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteEntry(slug) {
    if (!slug) {
      writeLine("usage: /delete slug");
      return;
    }

    setIsBusy(true);

    try {
      const response = await fetch(`/api/admin/scratch/${slug}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Could not delete entry.");

      setEntries((current) => current.filter((entry) => entry.slug !== slug));
      writeLine(`deleted ${slug}.`);
    } catch (error) {
      writeLine(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  function runIdleCommand(command) {
    const [name, value] = command.trim().split(/\s+/, 2);

    if (name === "/add") {
      writeLine("/add");
      setPhase("file");
      setInput("");
      return;
    }

    if (name === "/list") {
      entries.forEach((entry) => writeLine(`${entry.slug} / ${entry.date}`));
      setInput("");
      return;
    }

    if (name === "/delete") {
      setInput("");
      deleteEntry(value);
      return;
    }

    if (name === "/refresh") {
      setInput("");
      refreshEntries()
        .then(() => writeLine("entries refreshed."))
        .catch((error) => writeLine(error.message));
      return;
    }

    if (name === "/clear") {
      setLog([]);
      setInput("");
      return;
    }

    if (name === "/logout") {
      setInput("");
      onSignOut?.();
      return;
    }

    if (name === "/home") {
      setInput("");
      skipHomeIntroOnce();
      router.push("/");
      return;
    }

    const response = commandResponses[name];

    if (response) {
      setInput("");

      if (response.href) {
        if (response.href.startsWith("http")) {
          window.location.assign(response.href);
          return;
        }

        router.push(response.href);
        return;
      }

      writeLine(response.title);
      response.lines.forEach((line) => writeLine(line));
      return;
    }

    writeLine(`${command || "empty"} is not an admin command.`);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isBusy) return;

    if (phase === "idle") {
      runIdleCommand(input);
      return;
    }

    if (phase === "file") {
      if (!draft.file) {
        writeLine("drop a file into the command bar first.");
        return;
      }

      writeLine(`file staged: ${draft.file.name}`);
      setPhase("title");
      setInput("");
      return;
    }

    if (phase === "title") {
      const title = input.trim();
      if (!title) {
        writeLine("title cannot be blank.");
        return;
      }

      setDraft((current) => ({ ...current, title }));
      writeLine(`title: ${title}`);
      setPhase(isAudioFile(draft.file) ? "artist" : "date");
      setInput("");
      return;
    }

    if (phase === "artist") {
      const artist = input.trim();
      if (!artist) {
        writeLine("artist cannot be blank.");
        return;
      }

      setDraft((current) => ({ ...current, artist }));
      writeLine(`artist: ${artist}`);
      setPhase("date");
      setInput("");
      return;
    }

    if (phase === "date") {
      addEntry(input.trim());
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    setDraft((current) => ({ ...current, file }));
    setInput(file.name);
    writeLine(`staged ${file.name}. press enter.`);
  }

  return (
    <section
      className="terminal-panel command-console admin-console"
      aria-label="scratch and music admin console"
    >
      {log.length > 0 ? (
        <div className="admin-output terminal-output" aria-live="polite">
          {log.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
      ) : null}

      <form className="command-form" onSubmit={handleSubmit}>
        <label htmlFor="admin-command">enter command</label>
        <div
          className={`prompt-row admin-prompt ${isDragging ? "is-dragging" : ""}`}
          onDragEnter={() => setIsDragging(true)}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <span aria-hidden="true">horse@zest:~$</span>
          <input
            id="admin-command"
            name="command"
            value={phase === "file" && fileLabel ? fileLabel : input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={phase === "idle" ? "/help" : prompt}
            autoComplete="off"
            readOnly={phase === "file"}
          />
          <button type="submit" disabled={isBusy}>
            {isBusy ? "wait" : "run"}
          </button>
        </div>
      </form>
    </section>
  );
}

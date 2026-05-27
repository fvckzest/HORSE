"use client";

import { useMemo, useState } from "react";
import { commandResponses } from "@/data/commands";
import TerminalOutput from "@/components/TerminalOutput";

export default function CommandConsole() {
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState([]);

  const commandNames = useMemo(() => Object.keys(commandResponses), []);

  function runCommand(rawCommand) {
    const normalized = rawCommand.trim().toLowerCase();
    if (!normalized) return;

    const response =
      commandResponses[normalized] || {
        title: "unknown command",
        lines: [
          `${normalized} is not in the local command map.`,
          "try /help, or enjoy the feeling of touching a locked door."
        ]
      };

    setTranscript((current) => [
      ...current.slice(-24),
      {
        command: normalized,
        response
      }
    ]);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <section className="terminal-panel command-console" aria-label="command console">

      {transcript.length > 0 ? <TerminalOutput entries={transcript} /> : null}

      <form className="command-form" onSubmit={handleSubmit}>
        <label htmlFor="command-input">enter command</label>
        <div className="prompt-row">
          <span aria-hidden="true">horse@zest:~$</span>
          <input
            id="command-input"
            name="command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="/help"
            autoComplete="off"
          />
          <button type="submit">run</button>
        </div>
      </form>

      <div
        className="console-toolbar"
        aria-label="clickable command shortcuts"
        data-home-hidden
      >
        {commandNames.map((command) => (
          <button key={command} type="button" onClick={() => runCommand(command)}>
            {command}
          </button>
        ))}
      </div>
    </section>
  );
}

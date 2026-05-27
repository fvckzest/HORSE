"use client";

import { useEffect, useRef } from "react";

export default function TerminalOutput({ output, entries }) {
  const outputRef = useRef(null);
  const outputEntries = entries || [
    {
      command: "response",
      response: output
    }
  ];

  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [outputEntries.length]);

  return (
    <div className="terminal-output" role="status" aria-live="polite" ref={outputRef}>
      {outputEntries.map((entry, index) => (
        <article className="terminal-entry" key={`${entry.command}-${index}`}>
          <p className="output-label">{entry.command}</p>
          <h3>{entry.response.title}</h3>
          <ul>
            {entry.response.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {entry.response.href ? (
            <a className="terminal-link" href={entry.response.href}>
              {entry.response.cta}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

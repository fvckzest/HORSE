"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { commandResponses } from "@/data/commands";

const commandOptions = [
  {
    command: "/home",
    description: "bare terminal",
    href: "/"
  },
  {
    command: "/v1",
    description: "full first-pass layout",
    href: "/v1"
  },
  {
    command: "/about",
    description: "what this is",
    href: "/about"
  },
  {
    command: "/files",
    description: "artifact directory",
    href: "/files"
  },
  {
    command: "/links",
    description: "exit portals",
    href: "/links"
  },
  {
    command: "/help",
    description: "show command map"
  },
  {
    command: "/random",
    description: "stray transmission"
  },
  {
    command: "/exit",
    description: "open zest.art"
  }
];

export default function HeaderTerminal() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("listening");
  const [isFocused, setIsFocused] = useState(false);

  const matchingOptions = commandOptions.filter((option) =>
    option.command.startsWith(value.trim().toLowerCase())
  );
  const showSuggestions =
    isFocused && value.trim().startsWith("/") && matchingOptions.length > 0;

  function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    const option = commandOptions.find((item) => item.command === command);

    if (option?.href) {
      setStatus(`${command} mounted`);
      setValue("");
      setIsFocused(false);
      router.push(option.href);
      return;
    }

    if (command === "/exit") {
      setStatus("opening frontsite");
      window.location.assign("https://zest.art");
      return;
    }

    if (commandResponses[command]) {
      setStatus(commandResponses[command].title);
      setValue("");
      setIsFocused(false);
      return;
    }

    setStatus("unknown command");
    setValue("");
    setIsFocused(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCommand(value);
  }

  return (
    <form className="header-terminal" onSubmit={handleSubmit}>
      <label htmlFor="header-command">persistent command line</label>
      <div className="header-prompt">
        <span aria-hidden="true">horse@zest:~$</span>
        <input
          id="header-command"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          placeholder="/help"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="header-command-suggestions"
        />
        <button type="submit">run</button>
      </div>
      {showSuggestions ? (
        <div
          className="header-command-menu"
          id="header-command-suggestions"
          role="listbox"
          aria-label="available commands"
        >
          {matchingOptions.map((option) => (
            <button
              key={option.command}
              type="button"
              role="option"
              aria-selected={false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(option.command)}
            >
              <span>{option.command}</span>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
      ) : null}
      <output aria-live="polite">{status}</output>
    </form>
  );
}

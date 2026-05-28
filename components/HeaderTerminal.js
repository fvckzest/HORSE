"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { commandResponses } from "@/data/commands";
import { skipHomeIntroOnce } from "@/lib/homeIntro";

const commandOptions = [
  {
    command: "/home",
    description: "bare terminal",
    href: "/"
  },
  {
    command: "/about",
    description: "what this is",
    href: "/about"
  },
  {
    command: "/scratch",
    description: "playground archive",
    href: "/scratch"
  },
  {
    command: "/music",
    description: "audio directory",
    href: "/music"
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const matchingOptions = commandOptions.filter((option) =>
    option.command.startsWith(value.trim().toLowerCase())
  );
  const showSuggestions =
    isFocused && value.trim().startsWith("/") && matchingOptions.length > 0;

  function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase() || "/home";

    const option = commandOptions.find((item) => item.command === command);

    if (option?.href) {
      setStatus(`${command} mounted`);
      setValue("");
      setIsFocused(false);
      setHighlightedIndex(0);
      if (option.href === "/") {
        skipHomeIntroOnce();
      }
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
      setHighlightedIndex(0);
      return;
    }

    setStatus("unknown command");
    setValue("");
    setIsFocused(false);
    setHighlightedIndex(0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (showSuggestions && matchingOptions[highlightedIndex]) {
      runCommand(matchingOptions[highlightedIndex].command);
      return;
    }
    runCommand(value);
  }

  function handleKeyDown(event) {
    if (!showSuggestions) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) => (current + 1) % matchingOptions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex(
        (current) =>
          (current - 1 + matchingOptions.length) % matchingOptions.length
      );
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsFocused(false);
      setHighlightedIndex(0);
    }
  }

  return (
    <form className="header-terminal" onSubmit={handleSubmit}>
      <label htmlFor="header-command">persistent command line</label>
      <div className="header-prompt">
        <span aria-hidden="true">horse@zest:~$</span>
        <input
          id="header-command"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setHighlightedIndex(0);
          }}
          onFocus={() => {
            setIsFocused(true);
            setHighlightedIndex(0);
          }}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          onKeyDown={handleKeyDown}
          placeholder="/home"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="header-command-suggestions"
          aria-activedescendant={
            showSuggestions
              ? `header-command-option-${highlightedIndex}`
              : undefined
          }
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
          {matchingOptions.map((option, index) => (
            <button
              key={option.command}
              id={`header-command-option-${index}`}
              className={index === highlightedIndex ? "is-active" : undefined}
              type="button"
              role="option"
              aria-selected={index === highlightedIndex}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setHighlightedIndex(index)}
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

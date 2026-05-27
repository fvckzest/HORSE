export const commandShortcuts = [
  {
    command: "/help",
    label: "help",
    description: "List the usable commands and visible doors."
  },
  {
    command: "/about",
    label: "about",
    description: "Explain the backend without sanding off the mystery."
  },
  {
    command: "/files",
    label: "files",
    description: "Open the current artifact directory."
  },
  {
    command: "/links",
    label: "links",
    description: "Exit portals to zest.art, Instagram, and adjacent rooms."
  },
  {
    command: "/random",
    label: "random",
    description: "Pull a stray transmission from the local junk drawer."
  },
  {
    command: "/exit",
    label: "exit",
    description: "Return to the polished frontsite."
  }
];

export const commandResponses = {
  "/help": {
    title: "available commands",
    lines: [
      "/about - what this place is",
      "/files - artifact directory",
      "/links - exits and social portals",
      "/random - stray local transmission",
      "/exit - return to zest.art"
    ]
  },
  "/about": {
    title: "horsepower",
    lines: [
      "the unofficial backend of zest.art.",
      "a control room for fragments, side quests, unfinished files, and suspiciously specific buttons.",
      "nothing is broken. probably."
    ],
    href: "/about",
    cta: "open /about"
  },
  "/files": {
    title: "artifact directory mounted",
    lines: [
      "4 visible files, several sealed drawers, one suspicious placeholder.",
      "open the directory for field notes, symbols, logs, and backend thoughts."
    ],
    href: "/files",
    cta: "open /files"
  },
  "/links": {
    title: "portal list",
    lines: [
      "frontsite: zest.art",
      "signal: instagram.com/5horsepowers",
      "local rooms: diet coke, tape archive, void"
    ],
    href: "/links",
    cta: "open /links"
  },
  "/random": {
    title: "random transmission",
    lines: [
      "horse as a representation of playful freedom in expression.",
      "the frontsite is clean. this is where the wires live.",
      "current mood: queasy. current mode: maximum."
    ]
  },
  "/exit": {
    title: "exit portal armed",
    lines: ["returning to the official surface."],
    href: "https://zest.art",
    cta: "open zest.art"
  }
};

export const defaultConsoleOutput = {
  title: "system ready",
  lines: [
    "type /help or choose a command below.",
    "keyboard optional. curiosity required."
  ]
};

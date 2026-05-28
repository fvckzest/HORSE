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
    command: "/music",
    label: "music",
    description: "Open the uploaded audio directory."
  },
  {
    command: "/scratch",
    label: "scratch",
    description: "Browse the playground archive."
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
      "/scratch - playground archive",
      "/music - uploaded audio directory",
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
  "/music": {
    title: "music directory mounted",
    lines: [
      "uploaded .mp3 and .wav files collect here.",
      "audio added through /add is routed away from scratch and into music."
    ],
    href: "/music",
    cta: "open /music"
  },
  "/scratch": {
    title: "playground archive mounted",
    lines: [
      "sketches, image scraps, interface relics, and half-systems are visible.",
      "entries can be tiny notes, connected rooms, or larger process pages."
    ],
    href: "/scratch",
    cta: "open /scratch"
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

# context.md

## project overview

### client/business name
horsepower

### contact
dj horsepower  
email: fvck@zest.art  
location: online  
current website: https://zest.horse  
social: https://instagram.com/5horsepowers

### business summary
horsepower is an experimental web extension of the zest art universe. it functions as the playful, hidden, backend-feeling counterpart to the more polished main website at zest.art. where zest.art presents the official front-facing archive, store, and artist identity, horsepower should feel like a secret layer: a terminal, basement, control room, junk drawer, dev console, and easter egg playground all at once.

### primary website goal
rebuild and restructure zest.horse into a more intentional exploratory web experience that feels like entering the backend of zest.art through “horse mode.”

### secondary goals
- create a place for casual art sharing, experiments, hidden files, fragments, and playful interactions
- make the site feel deeper and more explorable than a normal portfolio page
- use the existing site concept and content as a foundation, not a total conceptual replacement
- establish a flexible structure that can later support slash commands, hidden areas, backend/database features, and supabase-powered content
- make the site memorable enough that visitors want to poke around

### target audience
people who are already interested in zest, zest.art, lmnl, underground art, internet weirdness, easter eggs, personal mythology, and deeper exploration of the artist’s world.

### key conversion actions
- explore the interface
- use slash commands or terminal-like navigation
- discover hidden pages/fragments
- click through to zest.art when needed
- follow the instagram account
- return later because the site feels alive

### timeline constraints
6–8 weeks. version 1 should be a polished, working, structurally improved first pass, not the full mythological operating system.

### budget constraints
budget range is approximately $2,300. this supports a distinctive frontend experience and practical structure, but not a large custom backend, full cms, auth system, game engine, or complex database-driven app in version 1.

---

## strategic interpretation

this site is not trying to behave like a normal artist portfolio. it is trying to create the feeling that the visitor found the unofficial backend of the artist’s world.

the visitor should quickly understand:
- this is connected to zest.art, but it is not the same kind of website
- this is a hidden/experimental mode, not a broken site
- exploration is the main action
- the interface has secrets, commands, and strange rooms
- the roughness is intentional, but the system itself still has taste and structure

the visitor should feel:
- like they clicked something they maybe were not supposed to click
- like they are inside a strange terminal attached to an art website
- like there are hidden files, commands, and backdoors to discover
- like the artist’s world has depth beyond the polished public-facing surface
- amused, curious, slightly disoriented, but not lost

likely objections/questions the site should answer:
- “what is this?”
- “is this broken?”
- “how do i use it?”
- “is this connected to zest.art?”
- “what am i supposed to click?”
- “is there actually content here, or is it just aesthetic?”
- “how do i get back to the main site?”
- “where are the hidden things?”

what matters most for trust/conversion:
- the weirdness must feel intentional
- the interface must provide enough guidance to prevent total confusion
- the site should load quickly and work well on mobile
- navigation must be playful but still usable
- the first screen must immediately establish the “backend of zest.art” idea
- there should be at least a few real discoverable pieces of content in version 1 so the promise is not empty

what the site should avoid:
- looking like a generic terminal template
- becoming so obscure that visitors bounce immediately
- pretending to be a full operating system before the content exists
- overbuilding auth, accounts, dashboards, or databases too early
- turning into a polished agency-style website
- becoming a copy of zest.art
- relying on lorem ipsum or fake generic hacker copy
- making every interaction random without structure

---

## version 1 scope

### must build now
- a redesigned homepage/terminal interface for zest.horse
- a clear “horse mode” entry feeling
- slash-command inspired navigation
- a small set of working commands
- an explore-first layout with visible hints
- reusable terminal/window/card components
- basic pages or panels for:
  - home/start
  - about/what is this
  - files/archive/fragments
  - links
  - contact/social
- fallback handling for unknown commands
- mobile-responsive terminal experience
- seo basics
- metadata/open graph basics
- connection back to zest.art
- use existing site content/assets where available

### nice to have
- subtle command history
- fake system boot sequence
- hidden command or easter egg
- small “status” panel showing current mode
- ascii/ansi-inspired graphics
- sound toggle placeholder without actual sound implementation
- visual noise, scanlines, cursor blink, or glitch details if lightweight
- simple local data file for commands/content
- keyboard shortcuts if easy and accessible

### phase 2 / future
- supabase-backed content system
- admin-editable fragments/posts/files
- hidden entries stored in database
- guestbook
- private/unlisted rooms
- email capture
- resend notification emails
- stripe-powered drops or secret products
- login/auth for certain areas
- dynamic command registry from supabase
- richer animation/audio layer
- integration with zest.art modal or shared ecosystem state
- analytics-driven “most explored” areas

### do not build yet
- full cms
- user accounts
- complex auth
- payment system
- merch store
- multiplayer features
- real backend dashboard
- complicated game mechanics
- heavy animation libraries
- large dependency stack
- fake ai/chatbot system unless separately scoped
- anything that requires maintaining a serious backend before content and structure are proven

---

## sitemap

### required routes/pages

#### `/`
purpose: main terminal interface and primary entry point into horse mode.

#### `/about`
purpose: explain what horsepower is without killing the mystery.

#### `/files`
purpose: hold art fragments, notes, experiments, links, or “backend file” style entries.

#### `/links`
purpose: provide exits and portals to zest.art, instagram, and related public surfaces.

#### `/404`
purpose: turn broken routes into an intentional lost-terminal moment.

### optional routes/pages

#### `/commands`
purpose: list available slash commands and how to use the site.

#### `/log`
purpose: a simple changelog or transmission log for updates.

#### `/room/[slug]`
purpose: future hidden rooms or themed content pages.

### routes that can be merged

#### `/about` and `/commands`
can be merged into a single help/intro panel on the homepage if the first version needs to stay lean.

#### `/files` and `/log`
can be merged if there is not enough content yet to justify both.

### routes that should be deferred

#### `/admin`
defer until supabase/backend editing is actually scoped.

#### `/login`
defer until there is a real reason for private areas.

#### `/shop`
defer unless the client explicitly wants commerce in this phase.

#### `/api/*`
defer unless needed for forms or backend features.

---

## homepage structure

### section 1: boot / entry sequence
- purpose: establish that the visitor has entered horse mode.
- suggested content:
  - “horse mode initialized”
  - “zest.art backend connection detected”
  - “type /help or choose a door”
- visual treatment:
  - dark terminal field, blinking cursor, compact system lines, slight motion delay
  - should feel like a boot screen, not a corporate hero section
- likely component name: `BootSequence`

### section 2: command console
- purpose: provide the central interaction model.
- suggested content:
  - command input
  - command suggestions
  - command output area
  - available commands such as `/help`, `/files`, `/about`, `/links`, `/random`, `/home`
- visual treatment:
  - bordered terminal window with visible prompt
  - command output appears as system response cards or text blocks
  - must be usable with mouse/tap as well as keyboard
- likely component name: `CommandConsole`

### section 3: quick commands / visible doors
- purpose: prevent the site from being too cryptic.
- suggested content:
  - buttons or command chips:
    - `/about`
    - `/files`
    - `/links`
    - `/random`
    - `/exit`
- visual treatment:
  - command chips, small labels, hover states, weird but legible
  - “doors” can look like terminal shortcuts rather than normal buttons
- likely component name: `CommandDock`

### section 4: backend status panel
- purpose: make the world feel alive and give context.
- suggested content:
  - mode: horse
  - connection: unstable but active
  - public site: zest.art
  - current transmission: open
  - last update: placeholder date
- visual treatment:
  - small dashboard panel, status lights, system readout, faux diagnostic text
- likely component name: `StatusPanel`

### section 5: file preview / fragments
- purpose: show that exploration leads to actual content.
- suggested content:
  - 3–6 sample files/fragments
  - examples:
    - `horse_manifesto.txt`
    - `field_note_001.md`
    - `discarded_symbol.png`
    - `backend_thoughts.log`
- visual treatment:
  - file cards, directory list, tiny previews, weird filenames
  - each item should feel like a discovered artifact
- likely component name: `FilePreviewGrid`

### section 6: exit portal
- purpose: connect the experience back to the larger zest ecosystem.
- suggested content:
  - “return to frontsite”
  - “follow the horse trail”
  - links to zest.art and instagram
- visual treatment:
  - small footer-like portal, not a big polished cta block
  - should feel like a system exit or trapdoor
- likely component name: `ExitPortal`

---

## visual direction

### primary design direction
underground artist backend terminal: a strange, playful, old-web-adjacent terminal interface that feels like the hidden machinery behind a polished art site.

### design rationale
horsepower should feel intentionally less polished than zest.art, but not less designed. the aesthetic should suggest that zest.art is the public gallery and zest.horse is the weird control room behind the wall. the site should feel casual, hidden, modular, and alive.

### layout approach
- terminal-first layout
- single-screen command center on desktop
- stacked panels on mobile
- modular windows/cards instead of long standard marketing sections
- visible “system” areas:
  - console
  - status
  - files
  - exits
- homepage should feel like an interface, not a landing page

### typography direction
- use a strong monospace as the primary interface typeface
- optionally pair with a rougher display accent for labels or horse-themed moments
- keep body text highly legible
- avoid overly cute retro fonts that make the site feel like a costume
- suggested font direction:
  - primary: monospace/system terminal feel
  - secondary: plain sans-serif for longer explanations if needed

### color palette suggestions
- base: near-black, charcoal, dirty graphite
- text: off-white, terminal green, pale gray
- accent: electric red, warning amber, saturated blue, or acidic green
- secondary accents: muted beige/off-white to connect subtly to the computer object on zest.art
- avoid too many neon colors at once; the weirdness should come from structure and interaction, not rainbow chaos

### image/art direction
- use existing horsepower/zest assets where available
- images should appear like files, corrupted previews, scans, screenshots, scraps, or hidden artifacts
- avoid polished gallery treatment unless intentionally contrasted
- allow small rough edges:
  - pixelation
  - low-res previews
  - weird crops
  - file labels
  - metadata overlays

### spacing philosophy
- dense but controlled
- terminal panels can be tight, but the page should still breathe
- use spacing to make the system readable, not luxurious
- mobile needs more vertical breathing room so the interface does not become a tiny unreadable hacker aquarium

### shape language
- rectangular terminal windows
- thin borders
- hard corners or very subtle radius
- file cards
- command chips
- status dots
- modal/panel overlays
- avoid big rounded startup-saas blobs

### motion/interaction notes
- blinking cursor
- subtle boot text reveal
- hover states on commands/files
- optional lightweight glitch/flicker effects
- avoid heavy scroll-jacking
- avoid animations that block usability
- respect reduced motion preferences

### what the design should explicitly not resemble
- a generic saas landing page
- a normal artist portfolio
- a crypto dashboard
- a clean apple-style product page
- a fake hollywood hacker interface
- a corporate “creative agency” website
- a polished e-commerce storefront
- a template terminal with no personality

---

## content direction

### tone keywords
strange, playful, cryptic, self-aware, casual, backend, mythic, terminal-native, mischievous, artist-made.

### messaging approach
copy should explain just enough to help the visitor explore while preserving mystery. the site can be weird, but it should not be meaningless. use short system-like phrases, file names, warnings, commands, and fragments. avoid long paragraphs unless they appear inside an intentional file or note.

### headline style
- short
- command-like
- system-message-like
- slightly funny without becoming meme sludge
- poetic only when it feels like a discovered artifact

### sample homepage headlines
- “horse mode initialized.”
- “you are now behind the glass.”
- “welcome to the unofficial backend of zest.art.”
- “nothing is broken. probably.”
- “type `/help` if you still believe in instructions.”
- “the frontsite is clean. this is where the wires live.”

### sample subheadline
this is the hidden layer behind zest.art: a terminal-shaped playground for fragments, files, transmissions, and things that do not belong on the front page.

### sample cta labels
- `/help`
- `/files`
- `/about`
- `/random`
- `/exit`
- `enter directory`
- `open file`
- `return to frontsite`
- `follow @5horsepowers`

### language/jargon to avoid
- “innovative”
- “immersive experience” unless absolutely necessary
- “cutting-edge”
- “next-gen”
- “seamless”
- “solutions”
- “portfolio showcase”
- “brand ecosystem” in visible visitor copy
- excessive lore that makes the interface unusable
- generic hacker words like “cyber matrix mainframe access granted” unless used ironically and sparingly

---

## component plan

### `AppShell`
- purpose: global layout wrapper for the terminal/backend environment.
- likely props/content fields:
  - children
  - currentMode
  - showStatus
- responsive behavior:
  - desktop: centered terminal layout with side panels
  - mobile: stacked full-width panels
- implementation complexity: low

### `BootSequence`
- purpose: create the initial horse mode entry feeling.
- likely props/content fields:
  - lines
  - speed
  - finalMessage
- responsive behavior:
  - keep short on mobile
  - allow animation to be skipped or reduced
- implementation complexity: medium

### `CommandConsole`
- purpose: main slash-command interface.
- likely props/content fields:
  - commands
  - defaultOutput
  - promptLabel
  - onCommand
- responsive behavior:
  - full width on mobile
  - keyboard input plus tappable alternatives
- implementation complexity: medium

### `CommandDock`
- purpose: clickable/tappable command shortcuts.
- likely props/content fields:
  - commandItems: label, command, description
- responsive behavior:
  - wraps into multiple rows on mobile
- implementation complexity: low

### `TerminalOutput`
- purpose: render command responses consistently.
- likely props/content fields:
  - type
  - title
  - body
  - links
  - fileItems
- responsive behavior:
  - text wraps cleanly
  - avoid horizontal overflow
- implementation complexity: medium

### `StatusPanel`
- purpose: show fake backend/system status and reinforce concept.
- likely props/content fields:
  - mode
  - connection
  - lastUpdated
  - currentTransmission
  - publicSiteUrl
- responsive behavior:
  - side panel on desktop
  - compact card on mobile
- implementation complexity: low

### `FilePreviewGrid`
- purpose: preview exploratory content/fragments.
- likely props/content fields:
  - files: title, filename, type, excerpt, href
- responsive behavior:
  - grid on desktop
  - stacked cards on mobile
- implementation complexity: low

### `FileCard`
- purpose: reusable visual card for files/artifacts.
- likely props/content fields:
  - filename
  - label
  - excerpt
  - metadata
  - href
- responsive behavior:
  - card width adapts to container
- implementation complexity: low

### `ExitPortal`
- purpose: provide clean exits to zest.art and instagram.
- likely props/content fields:
  - links
  - label
  - note
- responsive behavior:
  - footer stack on mobile
- implementation complexity: low

### `PageHeader`
- purpose: reusable header for secondary pages.
- likely props/content fields:
  - eyebrow
  - title
  - description
- responsive behavior:
  - simple stacked text
- implementation complexity: low

### `NotFoundTerminal`
- purpose: make 404 feel intentional and on-theme.
- likely props/content fields:
  - missingPath
  - suggestedCommands
- responsive behavior:
  - same as command panel
- implementation complexity: low

---

## technical implementation notes

### architecture assumption
the intake explicitly requests vercel and next.js with supabase backend configured later. this differs from the default lmnl stack, so use the project-specific request as the guiding architecture unless the existing repo proves otherwise.

recommended first-pass stack:
- next.js
- react
- javascript
- tailwind css
- vercel deployment
- supabase later, not required for version 1 unless already installed/configured

do not assume typescript.

### likely routes
- `/`
- `/about`
- `/files`
- `/links`
- custom 404/not found route depending on next.js app/router structure

if using next app router:
- `app/page.jsx`
- `app/about/page.jsx`
- `app/files/page.jsx`
- `app/links/page.jsx`
- `app/not-found.jsx`

if using pages router:
- `pages/index.jsx`
- `pages/about.jsx`
- `pages/files.jsx`
- `pages/links.jsx`
- `pages/404.jsx`

inspect the repo before choosing.

### suggested folder/component structure
adapt to the existing repo, but a practical structure could be:

```txt
src/
  components/
    layout/
      AppShell.jsx
      PageHeader.jsx
    terminal/
      BootSequence.jsx
      CommandConsole.jsx
      CommandDock.jsx
      TerminalOutput.jsx
      StatusPanel.jsx
    files/
      FilePreviewGrid.jsx
      FileCard.jsx
    navigation/
      ExitPortal.jsx
  data/
    commands.js
    files.js
    links.js
  styles/
    globals.css
# LLM_CONTEXT — horse

> **Last updated:** 2026-02-22

---

## What Is This?

This is a personal website that deliberately rejects modern web aesthetics. It is not broken — it is **cooked**. Think GeoCities, Angelfire, early phpBB forums, and personal sites hand-coded in Notepad in 1997. The vibe is **deep-fried internet**: oversaturated, unapologetic, and dripping with the raw humanity of the pre-algorithm web.

This document exists so that any AI agent working on this project understands the **thesis** before touching a single line of code.

---

## The Thesis

### Anti-Sleek, Pro-Soul

Modern web design has converged on a sterile sameness — rounded corners, generous whitespace, Helvetica derivatives, muted palettes, parallax scroll. This project is a **refusal** of that convergence.

We are building something that:
- Feels like it was last updated in 2002
- Has the energy of a site you'd stumble onto from a random link on a forum
- Does **not** try to look professional, clean, or contemporary
- Embraces visual noise, clashing elements, and unpolished edges

### The Paradox

Although the **surface** of the site should feel ancient and lo-fi, the **infrastructure** underneath must be quietly modern. This means:
- **Mobile-responsive** layouts (via CSS, never via a framework)
- **Accessible** markup where possible (semantic HTML, alt text, lang attributes)
- **Modular architecture** so new pages, components, and sections can be added freely
- **No build tools, no frameworks, no npm** — just raw HTML, CSS, and vanilla JS

The site should feel like a relic. The code should be clean enough to maintain.

---

## Aesthetic Guidelines

### DO:
- Use **system fonts** or intentionally ugly/dated web fonts (Times New Roman, Comic Sans, Courier, Verdana, Papyrus, etc.)
- Use **hard borders** (1px solid, 2px solid), no box-shadows
- Use **background colors** on elements — think teal, magenta, lime, navy, silver, `#333`, `#FFFF00`
- Use **`<hr>` tags**, horizontal rules, visible separators
- Use **`<marquee>`-like effects** (via CSS animation, not the deprecated tag)
- Use **`<table>` for decorative layout** sparingly, where it adds to the vibe
- Use **GIF-era imagery**: pixel art, low-res textures, tiled backgrounds, animated GIFs, under-construction banners, visitor counters (even fake ones)
- Use **centered text**, mismatched alignment, bold/italic overuse
- Use **custom cursors** for fun
- Keep **link styling aggressive** — underlined, colored, `:visited` colors different from `:link`
- Embrace **beveled buttons**, embossed effects, chunky `<input>` fields

### DON'T:
- Use smooth gradients, glassmorphism, frosted glass, or blur effects
- Use modern icon libraries (Lucide, Heroicons, FontAwesome)
- Use CSS grid for "magazine-style" polished layouts
- Use Google Fonts (unless it's something deliberately ugly like Lobster or Bungee Shade)
- Use transitions longer than 0ms unless it's a deliberately jank animation
- Use `border-radius` above `3px`
- Use `box-shadow` for depth elevation
- Write CSS that could be mistaken for a SaaS landing page
- Use flexbox for centering hero sections with 60px padding

---

## Technical Architecture

### File Structure

```
horse/
├── index.html              ← Homepage (entry point)
├── style.css               ← Global retro design system
├── script.js               ← Component loader + retro utilities
├── pages/                  ← Additional HTML pages
│   └── (page).html
├── components/             ← Reusable HTML fragments (loaded via JS)
│   ├── header.html
│   ├── footer.html
│   ├── nav.html
│   └── (component).html
├── assets/
│   ├── images/             ← GIFs, pixel art, backgrounds, badges
│   ├── cursors/            ← Custom .cur or .png cursor files
│   └── sounds/             ← MIDI, WAV, retro sound effects
└── .agents/
    └── LLM_CONTEXT.md      ← This file
```

### Component System

HTML components are stored in `components/` and loaded at runtime via vanilla JS `fetch()`. Any element with a `data-component` attribute gets its `innerHTML` replaced with the fetched HTML fragment.

```html
<!-- In any page -->
<div data-component="header"></div>
<div data-component="footer"></div>
```

```js
// script.js handles this automatically on DOMContentLoaded
```

This allows pages to share headers, footers, navbars, and any reusable chunk without a build system.

### Adding New Pages

1. Create a new `.html` file in `pages/`
2. Copy the boilerplate `<head>` from `index.html`
3. Add `data-component` divs for shared components
4. Include `<script src="../script.js"></script>` before `</body>`
5. Link the stylesheet with `<link rel="stylesheet" href="../style.css">`

### Adding New Components

1. Create a new `.html` file in `components/`
2. Write the HTML fragment (no `<html>`, `<head>`, or `<body>` — just the content)
3. Reference it with `<div data-component="your-component-name"></div>` in any page

### CSS Philosophy

- All styles live in **one file**: `style.css`
- CSS custom properties (variables) are used for the retro palette so colors can be swapped easily
- Media queries handle mobile responsiveness at standard breakpoints
- The retro look is achieved through the CSS itself, not through images (though images enhance)
- Utility classes are provided for common retro patterns (`.blink`, `.marquee`, `.beveled`, etc.)

---

## Rules for Agents

1. **Read this document first** before making any changes to the project.
2. **Never modernize the aesthetic.** If you feel the urge to add `border-radius: 12px`, step away.
3. **Keep the infrastructure clean.** The HTML should be well-structured, the CSS should be organized, the JS should be readable. The *look* is retro, not the *code quality*.
4. **Be modular.** Every new feature should be addable without rewriting existing code.
5. **The homepage starts blank.** Content will be added incrementally by the user. Do not populate it with placeholder content unless explicitly asked.
6. **Respect the folder structure.** Assets in `assets/`, pages in `pages/`, components in `components/`.
7. **No dependencies.** No npm, no CDN libraries, no frameworks. Vanilla everything.
8. **Test on mobile.** Responsive behavior is mandatory, even if the design looks intentionally rough.

---

## Mood Board (Reference Energy)

- Space Jam original website (1996)
- Hacker News (still alive, still ugly, still perfect)
- Old DeviantArt profile pages
- Neopets circa 2003
- Personal sites on `~username` university servers
- Any site with a "Best viewed in Netscape Navigator" badge
- GeoCities archives on archive.org
- Windows 95/98 UI elements
- "Web 1.0" in its purest form

---

## Summary

**Outside:** It's 1999, you just got home from school, your dial-up connected on the first try, and you're browsing someone's weird personal site about horses or conspiracy theories or both.

**Inside:** It's 2026, the code is clean, the components are modular, and the site works on an iPhone.

That's the whole game.

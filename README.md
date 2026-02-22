# horse

A personal website that deliberately rejects modern web aesthetics. It is not slick, it is not optimized for conversions, and it does not have rounded corners. Think GeoCities, Angelfire, and personal sites hand-coded in Notepad in 1997. The vibe is **deep-fried internet**.

## The Paradox

Although the surface of the site feels ancient, the infrastructure underneath is quietly modern. 
- **Mobile-responsive layouts** (via vanilla CSS, no frameworks)
- **Modular architecture** (lightweight vanilla JS component loader)
- **Zero build system** (Runs purely on raw HTML, CSS, and JS)

## How to run locally

There is no build step. You just need a local static file server.

If you have Python installed, you can run:

```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

## Project Structure

```text
horse/
├── index.html              ← Homepage
├── style.css               ← Global retro design system
├── script.js               ← Vanilla JS Component loader + retro utilities
├── DEVELOPER_GUIDE.md      ← Manual on how to add/edit the site
├── pages/                  ← Additional HTML pages
├── components/             ← Reusable HTML fragments
│   ├── header.html
│   └── footer.html
├── assets/                 
│   ├── images/             
│   ├── cursors/            
│   └── sounds/             
└── .agents/
    └── LLM_CONTEXT.md      ← Context and thesis rulebook for AI agents
```

## Contributing / Modifying

Please read `DEVELOPER_GUIDE.md` for instructions on how to create pages, use the internal component loader, and apply the retro aesthetic utility classes. 

AI Agents contributing to this project must read `.agents/LLM_CONTEXT.md` before writing a single line of code.

## License

Do whatever you want with this.

# horsepower

The hidden, backend-feeling counterpart to `zest.art`: a terminal-shaped
playground for fragments, files, transmissions, and strange side rooms.

## Stack

- Next.js App Router
- React
- Plain JavaScript
- Global CSS in `app/globals.css`
- Local data modules in `data/`
- Static assets served from `public/assets/`

There is no Supabase, auth, CMS, payments, or backend dashboard in this first
pass. Those are intentionally deferred until the content system is actually
scoped.

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

The local app runs at `http://localhost:3000`.

## Routes

- `/` - bare horse mode terminal
- `/about` - orientation without killing the mystery
- `/music` - uploaded audio directory
- `/links` - exit portals and nearby rooms
- `/_not-found` - themed lost-terminal 404

Legacy static side rooms are preserved under `public/pages/` so old links such
as `/pages/dj-horsepower.html` can still resolve while the main site runs on
Next.

## Project Shape

```text
app/                  Next App Router routes and global CSS
components/           Reusable terminal/interface components
data/                 Local command, file, and link content
public/assets/        Images, data, cursors, and sounds served by Next
public/pages/         Preserved legacy side-room HTML
context.md            Strategic source of truth for the project
```

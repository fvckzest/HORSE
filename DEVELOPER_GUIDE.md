# Developer Guide

This project is now a Next.js App Router site. The creative source of truth is
`context.md`; read it before changing product direction, tone, routes, or
interaction patterns.

## Architecture

- `app/layout.js` defines global metadata and the shared document shell.
- `app/page.js` is the primary horse mode command center.
- `app/about/page.js`, `app/files/page.js`, and `app/links/page.js` are the
  first-pass content routes.
- `app/not-found.js` renders the lost-terminal 404.
- `components/` contains small reusable UI pieces.
- `data/` contains local command/file/link content.
- `public/assets/` contains static files served at `/assets/...`.

## Editing Rules

- Keep the interface terminal-first and backend-feeling.
- Use plain JavaScript unless the project is intentionally converted later.
- Keep content local for now; do not add Supabase until the backend content
  system is scoped.
- Avoid new dependencies unless they remove real complexity.
- Preserve the old side-room links in `public/pages/` unless replacing them
  with native Next routes.
- Run `npm run lint` and `npm run build` after meaningful changes.

## Adding Commands

Edit `data/commands.js`. Each command should have a shortcut entry and, if it
is executable in the console, a response in `commandResponses`.

## Adding Files

Edit `data/files.js`. File cards are rendered by `FilePreviewGrid` and
`FileCard`, so new entries should include `filename`, `label`, `type`, `status`,
`excerpt`, and `href`.

## Adding Routes

Create a new folder in `app/` with a `page.js` file. Use `AppShell` for the
global terminal frame and `PageHeader` for simple secondary page headers.

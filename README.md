# MO-IT161 Project

## Setup

Install the project dependencies:

```bash
npm install
```

## Commands

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Check formatting and lint rules:

```bash
npm run check
```

Automatically format files and fix lint issues:

```bash
npm run fix
```

## Simple Routing

This project uses hash routing, so navigation works without a backend server.
The URL text after `#` decides which page the router renders:

- Home: `http://localhost:5173/#/`
- Dashboard: `http://localhost:5173/#/dashboard`

The shared navigation is in `src/shared/components/nav.ts`. The route logic is
in `src/shared/router.ts`, where the current hash is checked and the matching
page is rendered.

To add another route:

1. Create a page renderer in `src/routes`, such as `settings.ts`.
2. Import the renderer in `src/shared/router.ts`.
3. Add a route condition for `/settings`.
4. Link to it with `<a href="#/settings">Settings</a>`.

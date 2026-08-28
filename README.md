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

Tailwind Setup

```bash
npx @tailwindcss/cli -i ./src/shared/styles/config.css -o ./src/shared/styles/global.css --watch
```

## Simple Routing

This project uses hash routing, so navigation works without a backend server.

- Home: `http://localhost:5173/`
- Dashboard: `http://localhost:5173/dashboard`
- Reports: `http://localhost:5173/reports`

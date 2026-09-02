# MO-IT161 Project

A small TypeScript/Vite app for managing incident reporting with role-based sign-up flows.

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

Build the Tailwind CSS output:

```bash
npm run css:build
```

## Routes

This project uses client-side hash-based routing with a lightweight router.

- Home: `#/`
- Dashboard: `#/dashboard`
- Sign up: `#/signup`
- Sign in: `#/signin`

## Authentication flow

- Users can create an account from the sign-up page.
- During sign-up, they can choose a role:
  - Researcher
  - Triage
- The selected role is stored in the session state and used for the active user session.
- Once a user is authenticated, the app redirects them to the dashboard.
- If the user is not authenticated, protected routes redirect back to the home page.

## Roles

- Researcher: users who submit and manage incident reports.
- Triage: users who review and validate submitted incidents.
- Admin: represented as a future role that can be extended for management actions.

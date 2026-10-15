# MO-IT161 Project

- A full-stack TypeScript application built with React, Vite, Hono, and Drizzle ORM for managing incident reports

- Application Development Workflow Worksheet Link: [Click This](https://docs.google.com/spreadsheets/d/1C-wW2bvE4yw-rXKVVgnWuuIV_vbb4lYJ-UH7wK0LbYA/edit?usp=sharing)

## AI Use Statement

- AI was used to assist in generating the website design concept and supporting visual mockup shown in [View Design Mockup](docs/docs-img/design.png)

## GitHub Convention

- This project also includes a convention file to standardize development practices in [View Convention File](docs/docs-github-convention/github_convention.md)

## Coding Standard

- This project follows the coding standards and conventions defined in the following guide in [View Coding Standard](https://gist.github.com/cr3wcr3w/3096f0d1aa9f7050766af4620b12887a) 

## Architecture & Conventions

- The frontend follows a **feature-based architecture**, organizing code around application features rather than purely technical concerns.
- The backend also follows a **feature-based architecture**, grouping related routes, business logic, database access, and validation by feature.
- **Functional programming principles** are used where appropriate, particularly pure functions, immutability, composition, and separation of side effects.
- The backend follows a **Functional Core**, Imperative Shell approach where practical, keeping business logic separate from HTTP and database operations.
- **Single Responsibility Principle (SRP)** is used to keep functions and modules focused on a clear responsibility.

## Database Schema Overview

The project uses PostgreSQL and Drizzle ORM, with three schemas to organize the Incident Reporting System (Incident Report System):

- **`auth`** — Manages user authentication, sessions, accounts, and role-based access control (RBAC) using Better Auth.
- **`incident`** — Handles incident reports, report statuses, and report timelines.
- **`logging`** — Separates application logs for debugging and monitoring from audit logs for tracking significant user actions and data changes.

Each schema has a distinct responsibility, improving maintainability and keeping authentication, incident management, and logging concerns organized.

## Project Structure
 - This project uses a monorepo setup managed with npm Workspaces. The frontend and backend are maintained as separate workspaces within the same repository while sharing the same root project configuration and dependency management.

```bash
    MO-IT161-project/  
    ├── irs-backend/ 
    │ ├── src/ 
    │ └── package.json 
    │ ├── irs-frontend/ 
    │ ├── src/ 
    │ └── package.json 
    │ 
    ├── .github/ 
    ├── docs/ 
    ├── .gitignore/  
    ├── docker-compose.yml 
    ├── Dockerfile 
    ├── package-lock.json 
    ├── package.json 
    ├── README.md 
    └── sample.env 
```

---

## Setup
[Watch the Setup Demo](https://drive.google.com/file/d/1Wr1D5pHAr6f2o3X1TU8Dn9IX0wzZVsDX/view?usp=sharing)

Install the dependencies from the repository root:

```bash
npm install
```

Create the environment file from the provided sample:

```bash
cp sample.env .env
```

Then edit `.env` if necessary.

Example:

```env
BACKEND_PORT=8000
FRONTEND_PORT=3000

POSTGRES_DB=mydatabase
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
BETTER_AUTH_SECRET=Z0wlLO28ImINvI1ONrWmhSp8KqGCklLu
BETTER_AUTH_URL=http://localhost:3000
VITE_API_URL=http://localhost:8000
```
> Generate a secure BETTER_AUTH_SECRET using `openssl rand -base64 32` and add the generated value to your .env file.

Environment Variables:

* **Backend** uses `DATABASE_URL`, `BACKEND_PORT`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
* **Frontend** uses `FRONTEND_PORT`, `VITE_API_URL`
* **Docker/PostgreSQL** uses `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_PORT`,.

### Start PostgreSQL

The project requires a **PostgreSQL database**, but running PostgreSQL through Docker is optional.

#### Option 1: PostgreSQL with Docker

Start the PostgreSQL Docker container:

```bash
npm run docker:start
```

This uses the PostgreSQL configuration from `.env`.

#### Option 2: Use an Existing PostgreSQL Database

If you already have a PostgreSQL server or prefer to use a hosted PostgreSQL provider, you do not need to run Docker.

Simply set `DATABASE_URL` in `.env` to your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

For example, you can use [Neon](https://neon.com/) or another PostgreSQL provider.

> **Note:** Docker is only provided as a convenient way to run PostgreSQL locally. It is not required as long as you have access to a PostgreSQL database.

### Database Migrations

This project uses Drizzle ORM to manage database schema migrations.

After configuring .env and ensuring your PostgreSQL database is running and accessible, generate migration files when your schema changes:
```bash 
npm run drizzle:generate 
```

Apply pending migrations to the database:

```bash
npm run drizzle:migrate
```

To open Drizzle Studio and inspect your database:

```bash
npm run drizzle:studio
```
  - `drizzle:generate` generates migration files from your schema changes.
  - `drizzle:migrate` applies the generated migrations to your database.
  - `drizzle:studio` opens the database browser.

These commands load the root .env through the configured Drizzle setup. You do not need a separate .env file inside irs-backend.

### Database Seeding

The project includes a database seed script to populate the database with default roles and test accounts for development and testing.

After applying the database migrations, run the following command from the repository root:

```bash
npm run drizzle:seed
```

This command seeds the database with the following roles and test users:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `12345678` |
| Triage | `triage@example.com` | `12345678` |
| Researcher | `researcher@example.com` | `12345678` |

**Note:** Run the seed command against your development database before testing authentication through the application or Postman. The seed script creates missing users and assigns their roles. Existing users are not automatically updated with a new password.

These credentials are intended for development and testing only. Do not use them in production.

### Start the Applications

In another terminal, run:

```bash
npm run dev
```

This starts both the frontend and backend concurrently.

Development URLs:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8000`
* PostgreSQL: `localhost:5432` *(only when using local PostgreSQL through Docker)*
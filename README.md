# MO-IT161 Project

- A full-stack TypeScript application built with React, Vite, Hono, and Drizzle ORM for managing incident reports

- Application Development Workflow Worksheet Link: [Click This](https://docs.google.com/spreadsheets/d/1C-wW2bvE4yw-rXKVVgnWuuIV_vbb4lYJ-UH7wK0LbYA/edit?usp=sharing)

## AI Use Statement

- AI was used to assist in generating the website design concept and supporting visual mockup shown in [View Design Mockup](docs/docs-img/design.png)

## GitHub Convention

- This project also includes a convention file to standardize development practices in [View Convention File](docs/docs-github-convention/github_convention.md)

## Coding Standard

- This project follows the coding standards and conventions defined in the following guide in [View Coding Standard](https://gist.github.com/cr3wcr3w/3096f0d1aa9f7050766af4620b12887a) 

---

## Setup

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
```

### Environment Variables

* **Backend** uses `DATABASE_URL` and `BACKEND_PORT`.
* **Frontend** uses `FRONTEND_PORT`.
* **Docker/PostgreSQL** uses `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_PORT`.

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


### Start the Applications

In another terminal, run:

```bash
npm run dev
```

This starts both the frontend and backend concurrently.

Development URLs:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8000`
* PostgreSQL: `localhost:5432`

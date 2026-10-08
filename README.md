# MO-IT161 Project

A TypeScript/Vite app for managing incident reporting with role-based sign-up flows.

Application Development Workflow Worksheet Link: [Click This](https://docs.google.com/spreadsheets/d/1C-wW2bvE4yw-rXKVVgnWuuIV_vbb4lYJ-UH7wK0LbYA/edit?usp=sharing)

## AI Use Statement

- AI was used to assist in generating the website design concept and supporting visual mockup shown in [View Design Mockup](docs/docs-img/design.png)

## GitHub Convention

This project also includes a convention file to standardize development practices in [View Convention File](docs/docs-github-convention/github_convention.md)

## Coding Standard

This project follows the coding standards and conventions defined in the following guide in [View Coding Standard](https://gist.github.com/cr3wcr3w/3096f0d1aa9f7050766af4620b12887a) 

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

Start the PostgreSQL Docker container:

```bash
npm run docker:start
```

> **Alternative:** You can use [Neon](https://neon.com/) instead of running PostgreSQL locally with Docker. Create a database on Neon and copy the provided connection string into `DATABASE_URL` in `.env`.

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

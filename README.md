# MO-IT161 Project

## Requirements

- Node.js 24.x
- npm
- Docker with Docker Compose, for development mode only

The project uses one root environment file: `.env`. If it does not exist, the setup script creates it from `sample.env`. Existing `.env` values are preserved.

## Setup

Run the setup script from the repository root:

```bash
./setup.sh --dev
```

On Windows Git Bash, use the same command. The script installs dependencies, starts PostgreSQL in detached mode, and starts the backend and frontend in development mode. Setup output is cleared before the final status summary, and application output is hidden. No log files are created.

Development URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

Press `Ctrl+C` to stop the development servers. The script automatically runs `docker compose down`, which removes the PostgreSQL container but keeps the named database volume.

## Production

```bash
./setup.sh --prod
```

Production mode installs dependencies, builds both applications, and runs the built backend and frontend preview. It does not start or use Docker/PostgreSQL. Setup output is cleared before the final status summary, and application output is hidden. No log files are created.

Production URLs:

- Frontend preview: `http://localhost:3000`
- Backend: `http://localhost:8000`

Press `Ctrl+C` to stop both production processes.

## Manual Docker Commands

Development PostgreSQL can also be managed manually:

```bash
docker compose up -d --build
docker compose down
```

`docker compose down` removes the container but does not remove the `irs-postgres-data` volume. To delete the database data as well:

```bash
docker compose down --volumes
```
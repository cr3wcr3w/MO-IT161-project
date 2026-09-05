
#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

BACKEND_PID=""
FRONTEND_PID=""

case "${1:-}" in
	--dev) RUN_MODE="dev" ;;
	--prod) RUN_MODE="prod" ;;
	*)
		echo "Usage: ./setup.sh --dev|--prod" >&2
		exit 1
		;;
esac

cleanup() {
	trap - EXIT INT TERM
	[ -z "$BACKEND_PID" ] || kill "$BACKEND_PID" 2>/dev/null || true
	[ -z "$FRONTEND_PID" ] || kill "$FRONTEND_PID" 2>/dev/null || true
	wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true

	if [ "$RUN_MODE" = "dev" ]; then
		echo "Stopping PostgreSQL..."
		docker compose down
	fi
}

trap cleanup EXIT
trap 'exit 130' INT TERM

if [ ! -f .env ]; then
	cp sample.env .env
fi

. ./.env

cd irs-backend && npm install >/dev/null
cd ../irs-frontend && npm install >/dev/null
cd ..

if [ "$RUN_MODE" = "dev" ]; then
	docker compose up --detach --build >/dev/null

	(cd irs-backend && npm run dev >/dev/null 2>&1) &
	BACKEND_PID=$!
	(cd irs-frontend && npm run dev -- --host 0.0.0.0 >/dev/null 2>&1) &
	FRONTEND_PID=$!
else
	(cd irs-backend && npm run build >/dev/null)
	(cd irs-frontend && npm run build >/dev/null)

	(cd irs-backend && npm run start >/dev/null 2>&1) &
	BACKEND_PID=$!
	(cd irs-frontend && npm run preview -- --host 0.0.0.0 >/dev/null 2>&1) &
	FRONTEND_PID=$!
fi

clear 2>/dev/null || true
echo "========================================"
echo "MO-IT161 Project: ${RUN_MODE^^} mode"
echo "========================================"
echo "Frontend:   http://localhost:${FRONTEND_PORT:-3000}"
echo "Backend:    http://localhost:${BACKEND_PORT:-8000}"
if [ "$RUN_MODE" = "dev" ]; then
	echo "PostgreSQL: localhost:${POSTGRES_PORT:-5432}"
else
	echo "Docker:     not used"
fi
echo ""
echo "Press Ctrl+C to stop."
 
wait



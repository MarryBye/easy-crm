#!/bin/sh
set -e

echo "Waiting for database connection at ${PG_HOST:-postgres}:${PG_PORT:-5432}..."
until nc -z -v -w30 "${PG_HOST:-postgres}" "${PG_PORT:-5432}"; do
  echo "Waiting for PostgreSQL to become available..."
  sleep 2
done
echo "PostgreSQL is reachable."

echo "Running database migrations..."
npm run migration:run || echo "Migration completed or skipped."

echo "Running database seeds..."
npm run seed:run || echo "Seed completed or skipped."

echo "Starting backend service..."
exec "$@"

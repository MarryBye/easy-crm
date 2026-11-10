# Taxi CRM — Backend API Service

[![Express](https://img.shields.io/badge/Express-4.17-black.svg)](https://expressjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.2-fe0979.svg)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

RESTful API service for the Taxi CRM monorepo, built with TypeScript, Express.js, TypeORM, and PostgreSQL.

## Architecture

The backend follows a strict layered architecture based on Separation of Concerns:

- **Middleware Layer:** Request validation, JWT authentication, and role authorization.
- **Controller Layer:** HTTP request parsing, response formatting, and status code assignment.
- **Service Layer:** Business domain logic, entity manipulation, and DTO transformations.
- **Data Access Layer:** TypeORM entities, migrations, and database seed scripts.

## Domain Entities

- `User`: System accounts (`ADMINISTRATOR` or `STANDARD`). One-to-one relationship with `Car`, one-to-many relationship with `RideOrder` as driver and client.
- `Car`: Fleet vehicles with class designations (`STANDARD`, `BUSINESS`, `LUX`) and operational statuses (`AVAILABLE`, `UNAVAILABLE`).
- `RideOrder`: Dispatch orders linking client, driver, schedule timestamps, payment method, and order status.

## Scripts & Operations

From the monorepo root:

```bash
# Run dev server with hot reload
pnpm --filter @taxi-crm/backend dev

# Compile TypeScript to dist/
pnpm --filter @taxi-crm/backend build

# Typecheck without emit
pnpm --filter @taxi-crm/backend check-types

# Run ESLint
pnpm --filter @taxi-crm/backend lint

# Run migrations
pnpm --filter @taxi-crm/backend run migration:run:dev

# Seed database
pnpm --filter @taxi-crm/backend run seed:run:dev
```

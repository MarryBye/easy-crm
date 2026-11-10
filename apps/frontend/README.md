# Taxi CRM — Frontend Client

[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646cff.svg)](https://vitejs.dev/)
[![TanStack](https://img.shields.io/badge/TanStack-Query_%26_Router_%26_Table-ff4154.svg)](https://tanstack.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8.svg)](https://tailwindcss.com/)

Web client for the Taxi CRM monorepo, built with React 19, Vite, TanStack Router, TanStack Query, and TanStack Table.

## Architecture

- **Routing:** TanStack Router with file-based routing in `src/routes/`.
- **Server State & Caching:** TanStack Query v5 with automatic cache invalidation and query deduplication.
- **Client State:** Zustand store with `persist` middleware for JWT management.
- **Form Management:** React Hook Form with Zod validation resolvers.
- **Styling:** Tailwind CSS with responsive design system.
- **Component Development:** Storybook 8 for component isolation and design verification.
- **Testing:** Vitest and React Testing Library for unit tests; Playwright for end-to-end tests.

## Development Scripts

From the monorepo root:

```bash
# Start Vite development server
pnpm --filter @taxi-crm/frontend dev

# Build production bundle
pnpm --filter @taxi-crm/frontend build

# Typecheck with TypeScript
pnpm --filter @taxi-crm/frontend check-types

# Lint with ESLint
pnpm --filter @taxi-crm/frontend lint

# Run unit tests with Vitest
pnpm --filter @taxi-crm/frontend test

# Launch Storybook
pnpm --filter @taxi-crm/frontend storybook

# Run Playwright E2E tests
pnpm --filter @taxi-crm/frontend test:e2e
```

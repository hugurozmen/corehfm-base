# CoreHFM Base

Base React + React Native starter for a small product team. It is intentionally more than a blank app: it carries repo structure, shared packages, quality scripts, environment rules, CI, and docs so every new project starts from the same playbook.

## Stack

- Mobile: Expo, React Native, Expo Router, TypeScript.
- Web: Vite, React, React Router, TypeScript.
- Workspace: pnpm workspaces and Turborepo.
- Server state: TanStack Query.
- Local state: Zustand.
- Forms and validation: React Hook Form and Zod.
- Shared packages: API client, env validation, UI tokens, utilities, test fixtures.

## Structure

```txt
apps/
  mobile/         Expo app with auth/tabs routes
  web/            Vite React app with auth/dashboard routes
packages/
  api/            Fetch client, auth token storage contract, QueryClient
  config/         Shared ESLint, Prettier, TypeScript config
  env/            Zod-backed environment parser
  test-utils/     Shared test fixtures/helpers
  ui/             Theme tokens
  utils/          Cross-app utilities
docs/
  decisions/      Architecture decision records
```

## Getting Started

```bash
corepack enable
corepack prepare pnpm@10.34.1 --activate
pnpm install
cp .env.example .env
pnpm dev
```

Run one app:

```bash
pnpm --filter @core/web dev
pnpm --filter @core/mobile dev
```

Quality checks:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Feature Rule

Keep code inside a feature until it is reused.

```txt
features/billing/
  api/
  components/
  hooks/
  screens or pages/
  schema.ts
  types.ts
```

Move code only when the reuse is real:

- API, generated types, and error handling go to `packages/api`.
- Theme tokens and reusable primitives go to `packages/ui`.
- Validation and env parsing go to `packages/env`.
- Cross-domain helpers go to `packages/utils`.

## Environment

The base uses `packages/env` to validate required runtime values. Keep `.env.example` current whenever a new key is introduced.

Web uses `VITE_*` variables. Mobile uses `EXPO_PUBLIC_*` variables.

## Release Notes

Mobile build profiles live in [apps/mobile/eas.json](apps/mobile/eas.json). Web build is the Vite `dist` output from `apps/web`.

Read the team docs before cloning this into a production app:

- [Onboarding](docs/onboarding.md)
- [Coding Standards](docs/coding-standards.md)
- [Mobile Release](docs/release-mobile.md)
- [Web Release](docs/release-web.md)

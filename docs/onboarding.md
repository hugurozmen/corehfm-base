# Onboarding

## First Setup

1. Install Node 20.20 or newer.
2. Enable Corepack and activate pnpm 10.34.1.
3. Run `pnpm install`.
4. Copy `.env.example` to `.env` and fill project-specific values.
5. Run `pnpm typecheck`, then start one app.

## Local Commands

```bash
pnpm --filter @core/web dev
pnpm --filter @core/mobile dev
pnpm typecheck
pnpm lint
pnpm test
```

## New Feature Checklist

- Create the feature under the app that owns the UI.
- Keep feature-only components inside that feature.
- Put shared API behavior in `packages/api`.
- Add or update env schema when a new env variable is introduced.
- Add loading, error, and empty states before review.
- Update docs when the feature changes team conventions.

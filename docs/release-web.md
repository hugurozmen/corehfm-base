# Web Release

The web app is a Vite React project in `apps/web`.

## Build

```bash
pnpm --filter @core/web build
```

The production artifact is `apps/web/dist`.

## Deployment Checklist

- `VITE_API_BASE_URL` points to the target backend.
- `pnpm typecheck`, `pnpm lint`, and `pnpm test` pass.
- Auth guard and critical user flows are tested.
- Sentry or analytics values are configured if the project uses them.

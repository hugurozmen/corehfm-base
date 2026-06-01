# Mobile Release

The mobile app is an Expo project in `apps/mobile`.

## Profiles

- `development`: internal development client.
- `preview`: internal staging build.
- `production`: store-ready build with auto-increment.

## Common Commands

```bash
pnpm --filter @core/mobile dev
pnpm --filter @core/mobile build
```

For EAS builds, authenticate with Expo and run from the workspace root:

```bash
pnpm --filter @core/mobile exec eas build --profile preview
pnpm --filter @core/mobile exec eas build --profile production
```

Keep `EXPO_PUBLIC_*` values in sync with the selected EAS profile.

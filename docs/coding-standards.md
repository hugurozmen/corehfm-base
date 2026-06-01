# Coding Standards

## TypeScript

- Keep `strict` mode on.
- Prefer explicit domain types at API boundaries.
- Validate unknown input with Zod before trusting it.
- Use type-only imports where possible.

## React

- Keep server state in TanStack Query.
- Keep small local UI/session state in Zustand or local component state.
- Avoid global state for API cache data.
- Use feature-first folders instead of broad `components` buckets.

## Pull Requests

- Keep PRs small enough to review in one sitting.
- Include screenshots or video for UI changes.
- Do not merge while typecheck, lint, test, or build are failing.
- Update `.env.example` and docs for config changes.

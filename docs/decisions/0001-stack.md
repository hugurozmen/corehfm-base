# 0001 Stack

## Decision

Use Expo + React Native + TypeScript for mobile, Vite + React + TypeScript for web, and pnpm workspaces with Turborepo for repo orchestration.

## Why

The team needs to build multiple apps quickly without re-deciding project basics each time. Expo keeps the mobile default productive, Vite keeps web lightweight, and the workspace lets API/types/env/utils be shared without forcing screen-level reuse.

## Consequences

- Mobile projects should start with Expo unless native requirements force a different path.
- Web projects start as SPA/Vite unless SEO or server rendering is required.
- Shared code belongs in packages only when reuse is real.

# 0003 Auth, API, And Env

## Decision

Use a platform-agnostic API client with a token storage interface, TanStack Query for server state, and Zod for env validation.

## Why

Web and mobile can share request/error behavior while using different secure storage mechanisms. Env parsing fails early when a required value is missing or malformed.

## Consequences

- Mobile token storage should use SecureStore or another encrypted store.
- Web token storage should prefer backend-managed HttpOnly cookies when available.
- `.env.example` is part of the contract and must stay current.

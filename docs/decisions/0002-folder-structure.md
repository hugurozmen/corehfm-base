# 0002 Folder Structure

## Decision

Use app-level feature folders and shared workspace packages.

## Rules

- Feature-only code stays in `features/<name>`.
- Code reused by two or more features can move to `shared`.
- Code reused by apps moves to `packages`.
- Screens and pages are not shared by default.

## Why

This avoids a large global components folder and keeps ownership clear for a five-person team.

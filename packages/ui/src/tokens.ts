export const colors = {
  background: "#f8fafc",
  border: "#d8dee9",
  danger: "#dc2626",
  ink: "#111827",
  muted: "#64748b",
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  surface: "#ffffff",
  success: "#16a34a",
  warning: "#d97706",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
} as const;

export const typography = {
  body: 16,
  caption: 13,
  heading: 28,
  subheading: 20,
} as const;

export const theme = {
  colors,
  radius,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;

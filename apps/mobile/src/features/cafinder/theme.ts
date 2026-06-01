export const cafinderTheme = {
  colors: {
    background: "#FFF8F5",
    backgroundAlt: "#F4E7DE",
    border: "#ECD8CB",
    chip: "#F7EAE1",
    danger: "#B24836",
    ink: "#2A1A14",
    muted: "#8B6F61",
    mutedStrong: "#6F5245",
    primary: "#5A3825",
    primarySoft: "#8C644F",
    secondary: "#D79A5D",
    success: "#3F7D55",
    surface: "#FFFFFF",
    surfaceWarm: "#FFF2EA",
    warning: "#C47A28",
  },
  radius: {
    xs: 10,
    sm: 14,
    md: 18,
    lg: 24,
    xl: 32,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
    xxl: 40,
  },
} as const;

export const shadow = {
  shadowColor: "#5A3825",
  shadowOffset: { width: 0, height: 14 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 6,
} as const;

/**
 * Design token source of truth — mirrors docs/09_DESIGN_TOKENS.md.
 * CSS variables in styles/tokens.css and Tailwind theme consume these values.
 * Do not invent parallel token tables elsewhere.
 */

export const colors = {
  brand: {
    primary: "#0F4C5C",
    primaryHover: "#0C3E4B",
    accent: "#C08A3E",
  },
  neutral: {
    light: {
      0: "#FFFFFF",
      50: "#F7F8F9",
      100: "#EEF0F2",
      200: "#E2E5E9",
      300: "#CBD0D6",
      400: "#9AA2AC",
      500: "#6B7280",
      600: "#4B5261",
      700: "#333A45",
      800: "#1E232B",
      900: "#0F1216",
    },
    dark: {
      0: "#0A0B0D",
      50: "#121417",
      100: "#181B1F",
      200: "#232629",
      300: "#2E3237",
      400: "#4A4F56",
      500: "#6B7280",
      600: "#9AA2AC",
      700: "#C6CBD1",
      800: "#E2E5E9",
      900: "#F7F8F9",
    },
  },
  semantic: {
    light: {
      info: "#2563A6",
      success: "#1E7B4D",
      warning: "#B4791B",
      danger: "#B3261E",
    },
    dark: {
      info: "#5B9BD9",
      success: "#4CAF7D",
      warning: "#D99A3D",
      danger: "#E05A52",
    },
  },
  chart: {
    light: {
      1: "#0F4C5C",
      2: "#2563A6",
      3: "#1E7B4D",
      4: "#B4791B",
      5: "#4B5261",
    },
    dark: {
      1: "#5B9BD9",
      2: "#4CAF7D",
      3: "#D99A3D",
      4: "#9AA2AC",
      5: "#C6CBD1",
    },
  },
} as const;

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
  24: "96px",
  32: "128px",
} as const;

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  full: "9999px",
} as const;

export const elevation = {
  light: {
    0: "none",
    1: "0 1px 2px rgba(15,18,22,0.06), 0 1px 1px rgba(15,18,22,0.04)",
    2: "0 4px 8px rgba(15,18,22,0.08), 0 1px 2px rgba(15,18,22,0.04)",
    3: "0 12px 24px rgba(15,18,22,0.12), 0 2px 4px rgba(15,18,22,0.06)",
  },
  dark: {
    0: "none",
    1: "0 1px 2px rgba(0,0,0,0.35), 0 0 0 1px rgba(203,208,214,0.08)",
    2: "0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(203,208,214,0.1)",
    3: "0 16px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(203,208,214,0.12)",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "1024px",
  lg: "1440px",
  xl: "1920px",
} as const;

export const layout = {
  gridColumns: 12,
  gridGutter: spacing[6],
  contentMaxWidth: "1280px",
  sidebarWidth: "280px",
} as const;

export const motion = {
  instant: 0,
  fast: 120,
  base: 200,
  moderate: 320,
  slow: 450,
  deliberateMin: 600,
  deliberateMax: 800,
  easeEnter: [0.2, 0, 0, 1] as const,
  easeExit: [0.4, 0, 1, 1] as const,
} as const;

export const iconSize = {
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
} as const;

export const table = {
  rowHeightDefault: "44px",
  rowHeightDense: "36px",
  cellPaddingX: spacing[4],
  cellPaddingYDefault: spacing[3],
  cellPaddingYDense: spacing[2],
} as const;

export const dashboard = {
  cardPadding: spacing[6],
  sectionGap: spacing[12],
  cardGap: spacing[6],
} as const;

export const typography = {
  display: { size: "2.5rem", lineHeight: "2.75rem", weight: "600", tracking: "-0.01em" },
  h1: { size: "2rem", lineHeight: "2.5rem", weight: "600", tracking: "-0.01em" },
  h2: { size: "1.5rem", lineHeight: "2rem", weight: "600", tracking: "0" },
  h3: { size: "1.125rem", lineHeight: "1.625rem", weight: "600", tracking: "0" },
  bodyLg: { size: "1rem", lineHeight: "1.5rem", weight: "400", tracking: "0" },
  body: { size: "0.875rem", lineHeight: "1.25rem", weight: "400", tracking: "0" },
  bodySm: { size: "0.8125rem", lineHeight: "1.125rem", weight: "400", tracking: "0" },
  label: { size: "0.75rem", lineHeight: "1rem", weight: "600", tracking: "0.02em" },
  numericLg: { size: "1.75rem", lineHeight: "2rem", weight: "600", tracking: "0" },
  numeric: { size: "0.875rem", lineHeight: "1.25rem", weight: "500", tracking: "0" },
} as const;

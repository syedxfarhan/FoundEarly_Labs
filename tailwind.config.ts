import type { Config } from "tailwindcss";
import {
  breakpoints,
  colors,
  dashboard,
  iconSize,
  layout,
  motion,
  radius,
  spacing,
  table,
} from "./src/config/tokens";

/**
 * Tailwind theme generated from docs/09_DESIGN_TOKENS.md via src/config/tokens.ts.
 * Prefer semantic CSS variables (background, foreground, brand, etc.) in components.
 * Arbitrary values are discouraged — see docs/07_IMPLEMENTATION_RULES.md §7.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          muted: "hsl(var(--surface-muted) / <alpha-value>)",
          elevated: "hsl(var(--surface-elevated) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          hover: "hsl(var(--brand-hover) / <alpha-value>)",
          foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
          accent: "hsl(var(--brand-accent) / <alpha-value>)",
        },
        semantic: {
          neutral: "hsl(var(--semantic-neutral) / <alpha-value>)",
          info: "hsl(var(--semantic-info) / <alpha-value>)",
          success: "hsl(var(--semantic-success) / <alpha-value>)",
          warning: "hsl(var(--semantic-warning) / <alpha-value>)",
          danger: "hsl(var(--semantic-danger) / <alpha-value>)",
        },
        focus: "hsl(var(--focus-ring) / <alpha-value>)",
        chart: {
          1: "hsl(var(--chart-1) / <alpha-value>)",
          2: "hsl(var(--chart-2) / <alpha-value>)",
          3: "hsl(var(--chart-3) / <alpha-value>)",
          4: "hsl(var(--chart-4) / <alpha-value>)",
          5: "hsl(var(--chart-5) / <alpha-value>)",
        },
        // Raw neutral scale for rare cases — prefer semantic tokens above
        neutral: colors.neutral.light,
      },
      spacing: {
        1: spacing[1],
        2: spacing[2],
        3: spacing[3],
        4: spacing[4],
        6: spacing[6],
        8: spacing[8],
        12: spacing[12],
        16: spacing[16],
        24: spacing[24],
        32: spacing[32],
        "sidebar": layout.sidebarWidth,
        "content-max": layout.contentMaxWidth,
        "dashboard-card": dashboard.cardPadding,
        "dashboard-section": dashboard.sectionGap,
        "dashboard-gap": dashboard.cardGap,
        "table-x": table.cellPaddingX,
        "table-y": table.cellPaddingYDefault,
        "table-y-dense": table.cellPaddingYDense,
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        full: radius.full,
      },
      boxShadow: {
        elevation_0: "var(--elevation-0)",
        elevation_1: "var(--elevation-1)",
        elevation_2: "var(--elevation-2)",
        elevation_3: "var(--elevation-3)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["2.5rem", { lineHeight: "2.75rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        h1: ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        h3: ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "body-lg": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        body: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.125rem", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.02em", fontWeight: "600" }],
        "numeric-lg": ["1.75rem", { lineHeight: "2rem", fontWeight: "600" }],
        numeric: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
      },
      width: {
        sidebar: layout.sidebarWidth,
        "content-max": layout.contentMaxWidth,
      },
      maxWidth: {
        content: layout.contentMaxWidth,
      },
      height: {
        "table-row": table.rowHeightDefault,
        "table-row-dense": table.rowHeightDense,
      },
      minHeight: {
        touch: "40px",
      },
      minWidth: {
        touch: "40px",
      },
      size: {
        "icon-sm": iconSize.sm,
        "icon-md": iconSize.md,
        "icon-lg": iconSize.lg,
        "icon-xl": iconSize.xl,
      },
      transitionDuration: {
        instant: `${motion.instant}ms`,
        fast: `${motion.fast}ms`,
        base: `${motion.base}ms`,
        moderate: `${motion.moderate}ms`,
        slow: `${motion.slow}ms`,
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in var(--motion-base) var(--ease-enter)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

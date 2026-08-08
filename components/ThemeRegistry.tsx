"use client";
import { ThemeProvider, createTheme, alpha as alphaFn, lighten as lightenFn, darken as darkenFn } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#0B6B3A",
      dark: "#084C2E",
    },
    secondary: {
      main: "#D4AF37",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), var(--font-poppins), sans-serif",
    h1: {
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-poppins), sans-serif",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});

type ColorFns = {
  alpha: typeof alphaFn;
  lighten: typeof lightenFn;
  darken: typeof darkenFn;
};

const theme = {
  ...baseTheme,
  alpha: alphaFn,
  lighten: lightenFn,
  darken: darkenFn,
} as typeof baseTheme & ColorFns;

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

import { createTheme, alpha } from "@mui/material/styles";

const focusRing = (color: string) => ({
  outline: `3px solid ${alpha(color, 0.55)}`,
  outlineOffset: "2px",
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFAA00",
      dark: "#CC8800",
      contrastText: "#0F172A",
    },
    secondary: {
      main: "#CC8800",
      light: "#FFE9B3",
      dark: "#996600",
      contrastText: "#0F172A",
    },
    warning: {
      main: "#FFAA00",
      contrastText: "#0F172A",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFDF5",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
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
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          "&:has(.skip-link:focus)": {
            scrollMarginTop: 80,
          },
        },
        "*:focus-visible": {
          ...focusRing("#FFAA00"),
          borderRadius: 4,
        },
        "a:focus-visible, button:focus-visible, [role='button']:focus-visible": {
          ...focusRing("#FFAA00"),
          borderRadius: 8,
        },
        "input:focus-visible, textarea:focus-visible, select:focus-visible": {
          ...focusRing("#FFAA00"),
          borderRadius: 8,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            ...focusRing("#FFAA00"),
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          minHeight: 40,
          minWidth: 44,
          "&.Mui-focusVisible": {
            ...focusRing("#FFAA00"),
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          "&.Mui-focusVisible": {
            ...focusRing("#FFAA00"),
          },
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
    MuiLink: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            ...focusRing("#FFAA00"),
          },
        },
      },
    },
  },
});

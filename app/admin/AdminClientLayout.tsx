"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme, alpha as alphaFn, lighten as lightenFn, darken as darkenFn } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

const baseTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#D4AF37" },
    secondary: { main: "#D4AF37" },
    success: { main: "#16A34A" },
    warning: { main: "#F59E0B" },
    error: { main: "#DC2626" },
    info: { main: "#3B82F6" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Poppins', 'Nunito', 'Inter', system-ui, sans-serif",
    h1: { fontWeight: 700, letterSpacing: -0.5 },
    h2: { fontWeight: 700, letterSpacing: -0.3 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none" },
    body1: { color: "#1E293B" },
    body2: { color: "#64748B" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
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

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          color: "#1E293B",
        }}
      >
        <AdminSidebar collapsed={collapsed} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <AdminHeader onSidebarToggle={() => setCollapsed((c) => !c)} />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: { xs: 1.8, sm: 2.4, md: 3.2 },
              overflowX: "hidden",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

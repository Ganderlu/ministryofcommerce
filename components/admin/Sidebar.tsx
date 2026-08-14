"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Icon, styled, useTheme, Tooltip } from "@mui/material";
import {
  SpaceDashboard as DashboardIcon,
  Description as ApplicationsIcon,
  Business as BusinessesIcon,
  Diversity3 as CooperativesIcon,
  Group as UsersIcon,
  Payments as PaymentsIcon,
  Analytics as ReportsIcon,
  Campaign as CommunicationsIcon,
  SettingsInputSvideo as ServicesIcon,
  Folder as DocumentsIcon,
  Settings as SettingsIcon,
  Assignment as AuditIcon,
  ChevronRight as ChevronRightIcon,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const iconMap: Record<string, React.ComponentType<any>> = {
  Dashboard: DashboardIcon,
  Applications: ApplicationsIcon,
  Businesses: BusinessesIcon,
  Cooperatives: CooperativesIcon,
  Users: UsersIcon,
  Payments: PaymentsIcon,
  Reports: ReportsIcon,
  Communications: CommunicationsIcon,
  Services: ServicesIcon,
  Documents: DocumentsIcon,
  Settings: SettingsIcon,
  Audit: AuditIcon,
};

interface SidebarProps {
  collapsed?: boolean;
}

const mainItems = [
  { id: "Dashboard", label: "Dashboard", icon: "Dashboard", href: "/admin" },
  { id: "Applications", label: "Applications", icon: "Applications", href: "/admin/applications" },
  { id: "Businesses", label: "Businesses", icon: "Businesses", href: "/admin/businesses" },
  { id: "Cooperatives", label: "Cooperatives", icon: "Cooperatives", href: "/admin/cooperatives" },
  { id: "Users", label: "Users & Roles", icon: "Users", href: "/admin/users" },
  { id: "Payments", label: "Payments", icon: "Payments", href: "/admin/payments" },
  { id: "Reports", label: "Reports & Analytics", icon: "Reports", href: "/admin/reports" },
  { id: "Communications", label: "Communications", icon: "Communications", href: "/admin/communications" },
];

const managementItems = [
  { id: "Services", label: "Services Management", icon: "Services", href: "/admin/services" },
  { id: "Documents", label: "Document Management", icon: "Documents", href: "/admin/documents" },
  { id: "Settings", label: "Settings", icon: "Settings", href: "/admin/settings" },
  { id: "Audit", label: "Audit Logs", icon: "Audit", href: "/admin/audit-logs" },
];

export default function AdminSidebar({ collapsed = false }: SidebarProps) {
  const theme = useTheme();
  const pathname = usePathname();

  function isActive(href?: string): boolean {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname?.startsWith(href + "/");
  }

  return (
    <Box
      sx={{
        width: collapsed ? 84 : 280,
        minHeight: "100vh",
        bgcolor: "#084C2E",
        color: "white",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        position: "sticky",
        top: 0,
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: "#D4AF37",
            border: "3px solid #D4AF37",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 2px #D4AF37 inset",
          }}
        >
          <Image
            src="/images/anambralogo.jpg"
            alt="Anambra State Logo"
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        {!collapsed && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontSize: 13.5, fontWeight: 800, letterSpacing: 0.2, lineHeight: 1.15 }}>
              ANAMBRA STATE
            </Typography>
            <Typography sx={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 0.25, color: "#D4AF37", lineHeight: 1.3 }}>
              MINISTRY OF COMMERCE
            </Typography>
            <Typography
              sx={{
                mt: 0.4,
                fontSize: 9.5,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 1.6,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Admin Portal
            </Typography>
          </Box>
        )}
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5, py: 2 }}>
        {!collapsed && (
          <Typography
            sx={{
              px: 1.5,
              mb: 0.8,
              mt: 0.5,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            Main
          </Typography>
        )}
        <List sx={{ mb: 1 }} disablePadding>
          {mainItems.map((item, idx) => {
            const IconComp = iconMap[item.icon] || DashboardIcon;
            const active = isActive(item.href);
            return (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                sx={{ mb: 0.4 }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href || "#"}
                    sx={{
                      py: 1.2,
                      px: collapsed ? 1.1 : 1.5,
                      borderRadius: "10px",
                      bgcolor: active ? "rgba(11, 107, 58, 0.85)" : "transparent",
                      color: active ? "white" : "rgba(255,255,255,0.82)",
                      transition: "all 0.15s",
                      border: active ? "1px solid rgba(212, 175, 55, 0.25)" : "1px solid transparent",
                      "&:hover": {
                        bgcolor: active ? "rgba(11, 107, 58, 0.95)" : "rgba(255,255,255,0.06)",
                        color: "white",
                        transform: "translateX(3px)",
                      },
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    <Tooltip title={collapsed ? item.label : ""} placement="right">
                      <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: "inherit", justifyContent: "center" }}>
                        <IconComp sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                    </Tooltip>
                    {!collapsed && (
                      <>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 13.5,
                            fontWeight: active ? 600 : 500,
                            lineHeight: 1.1,
                          }}
                        />
                        <ChevronRightIcon sx={{ fontSize: 16, opacity: 0.6 }} />
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              </MotionBox>
            );
          })}
        </List>

        {!collapsed && (
          <Typography
            sx={{
              px: 1.5,
              mt: 2.5,
              mb: 0.8,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            Management
          </Typography>
        )}
        <List disablePadding>
          {managementItems.map((item, idx) => {
            const IconComp = iconMap[item.icon] || SettingsIcon;
            return (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.02 }}
                sx={{ mb: 0.4 }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href || "#"}
                    sx={{
                      py: 1.2,
                      px: collapsed ? 1.1 : 1.5,
                      borderRadius: "10px",
                      color: "rgba(255,255,255,0.78)",
                      transition: "all 0.15s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.06)",
                        color: "white",
                        transform: "translateX(3px)",
                      },
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    <Tooltip title={collapsed ? item.label : ""} placement="right">
                      <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: "inherit", justifyContent: "center" }}>
                        <IconComp sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                    </Tooltip>
                    {!collapsed && (
                      <>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            lineHeight: 1.1,
                          }}
                        />
                        <ChevronRightIcon sx={{ fontSize: 16, opacity: 0.55 }} />
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              </MotionBox>
            );
          })}
        </List>

        {/* System status */}
        {!collapsed && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            sx={{ mt: 3 }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "14px",
                background: "linear-gradient(145deg, rgba(212,175,55,0.65) 0%, rgba(8,76,46,0.85) 100%)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: -22,
                  bottom: -22,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "rgba(22, 163, 74, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldIcon sx={{ fontSize: 46, color: "rgba(255,255,255,0.15)" }} />
              </Box>

              <Box sx={{ position: "relative" }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, mb: 0.7, letterSpacing: 0.2 }}>
                  System Status
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.8 }}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      bgcolor: "#22C55E",
                      boxShadow: "0 0 0 4px rgba(34, 197, 94, 0.2)",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        animation: "pulse 1.8s infinite",
                        bgcolor: "#22C55E",
                        opacity: 0.4,
                      },
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 0.4 },
                        "100%": { transform: "scale(2.4)", opacity: 0 },
                      },
                    }}
                  />
                  <Typography sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                    All systems operational
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)" }}>
                    Last checked: 2 mins ago
                  </Typography>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "10px",
                      bgcolor: "rgba(22, 163, 74, 0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(22, 163, 74, 0.35)",
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 20, color: "#22C55E" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </MotionBox>
        )}
      </Box>

      {/* Copyright */}
      {!collapsed && (
        <Box
          sx={{
            p: 2.2,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            sx={{
              fontSize: 10.5,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 400,
            }}
          >
            © 2025 Anambra State Ministry
            <br /> of Commerce. All rights reserved.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

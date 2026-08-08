"use client";

import React from "react";
import { Typography, Box, Button, Chip } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import {
  WarningAmber as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { systemAlerts } from "@/data/seed";
import { motion } from "framer-motion";

const typeConfig: Record<string, { icon: typeof WarningIcon; color: string; bg: string; border: string }> = {
  warning: {
    icon: WarningIcon,
    color: "#B45309",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.2)",
  },
  success: {
    icon: CheckCircleIcon,
    color: "#166534",
    bg: "rgba(22, 163, 74, 0.08)",
    border: "rgba(22, 163, 74, 0.2)",
  },
  info: {
    icon: InfoIcon,
    color: "#1D4ED8",
    bg: "rgba(59, 130, 246, 0.08)",
    border: "rgba(59, 130, 246, 0.2)",
  },
  error: {
    icon: ErrorIcon,
    color: "#991B1B",
    bg: "rgba(220, 38, 38, 0.08)",
    border: "rgba(220, 38, 38, 0.2)",
  },
};

export default function SystemAlerts() {
  return (
    <SectionCard
      delay={0.34}
      headerTitle={<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>System Alerts</Typography>}
      action={
        <Button
          size="small"
          sx={{
            color: "#0B6B3A",
            fontWeight: 700,
            fontSize: 12,
            textTransform: "none",
            p: 0,
            minWidth: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          View All
        </Button>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {systemAlerts.map((alert, idx) => {
          const cfg = typeConfig[alert.type] || typeConfig.info;
          const Icon = cfg.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 + idx * 0.06 }}
            >
              <Box
                sx={{
                  p: 1.4,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: "12px",
                  bgcolor: cfg.bg,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.2,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateX(3px)",
                    filter: "brightness(1.02)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                    borderRadius: "9px",
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cfg.color,
                    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
                    mt: 0.2,
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 12.8, fontWeight: 650, color: "#1E293B", lineHeight: 1.2 }}>
                    {alert.title}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#64748B", mt: 0.35, fontWeight: 500 }}>
                    {alert.description}
                  </Typography>
                </Box>
                {alert.badge !== undefined ? (
                  <Chip
                    label={alert.badge}
                    size="small"
                    sx={{
                      height: 22,
                      minWidth: 28,
                      bgcolor: "#FBBF24",
                      color: "#7C2D12",
                      fontWeight: 800,
                      fontSize: 10.5,
                      borderRadius: "999px",
                      ".MuiChip-label": { px: 0.8 },
                    }}
                  />
                ) : (
                  <CheckCircleIcon sx={{ fontSize: 18, color: "#16A34A", mt: 0.8 }} />
                )}
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";
import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Diversity3 as Diversity3Icon,
  Payments as PaymentsIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { KpiCard as IKpiCard } from "@/types";

const MotionCard = motion(Card);

const iconMap: Record<string, React.ComponentType<any>> = {
  Description: DescriptionIcon,
  Business: BusinessIcon,
  Diversity3: Diversity3Icon,
  Payments: PaymentsIcon,
  SupervisorAccount: SupervisorAccountIcon,
};

interface Props {
  item: IKpiCard;
  index: number;
}

export default function DashboardCard({ item, index }: Props) {
  const Icon = iconMap[item.icon] || DescriptionIcon;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: "16px",
        bgcolor: "white",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.05)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08), 0 3px 8px rgba(15, 23, 42, 0.06)",
          borderColor: "#CBD5E1",
          "& .dashboard-icon": {
            transform: "scale(1.08) rotate(-3deg)",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          className="dashboard-icon"
          sx={{
            width: 54,
            height: 54,
            flexShrink: 0,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            transition: "all 0.3s",
            position: "relative",
            background: (theme) =>
              `linear-gradient(145deg, ${item.color}ee 0%, ${item.color} 60%, ${shade(item.color, -12)} 100%)`,
            boxShadow: (theme) => `0 8px 18px ${item.color}33`,
          }}
        >
          <Icon sx={{ fontSize: 26 }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 500,
              color: "#64748B",
              mb: 0.6,
              letterSpacing: 0.15,
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1E293B",
              lineHeight: 1.1,
              mb: 0.9,
              letterSpacing: -0.3,
            }}
          >
            {item.value}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.3,
                px: 0.9,
                py: 0.25,
                borderRadius: "999px",
                bgcolor:
                  item.changeDirection === "up" ? "rgba(22, 163, 74, 0.1)" : "rgba(220, 38, 38, 0.1)",
                color: item.changeDirection === "up" ? "#16A34A" : "#DC2626",
              }}
            >
              {item.changeDirection === "up" ? (
                <ArrowUpIcon sx={{ fontSize: 12 }} />
              ) : (
                <ArrowDownIcon sx={{ fontSize: 12 }} />
              )}
              <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.1 }}>
                {item.change.toFixed(1)}%
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 11.5, color: "#94A3B8", fontWeight: 500 }}>
              from last month
            </Typography>
          </Box>
        </Box>
      </Box>
    </MotionCard>
  );
}

function shade(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

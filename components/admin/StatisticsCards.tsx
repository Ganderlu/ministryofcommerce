"use client";

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Diversity3 as Diversity3Icon,
  Payments as PaymentsIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Card } from "@mui/material";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionCard = motion(Card);

const iconMap: Record<string, React.ComponentType<any>> = {
  Description: DescriptionIcon,
  Business: BusinessIcon,
  Diversity3: Diversity3Icon,
  Payments: PaymentsIcon,
  SupervisorAccount: SupervisorAccountIcon,
};

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

interface StatisticsCardsProps {
  data: AdminDashboardData;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-NG");
}

export default function StatisticsCards({ data }: StatisticsCardsProps) {
  const kpis = [
    {
      id: "total-applications",
      title: "Total Applications",
      value: data.kpis.totalApplications,
      icon: "Description",
      color: "#FFAA00",
    },
    {
      id: "active-businesses",
      title: "Active Businesses",
      value: data.kpis.activeBusinesses,
      icon: "Business",
      color: "#1D4ED8",
    },
    {
      id: "cooperatives",
      title: "Registered Cooperatives",
      value: data.kpis.cooperatives,
      icon: "Diversity3",
      color: "#7C3AED",
    },
    {
      id: "revenue",
      title: "Revenue Collected",
      value: data.kpis.revenue,
      icon: "Payments",
      color: "#CC8800",
      prefix: "₦",
    },
    {
      id: "admins",
      title: "Active Officers",
      value: data.kpis.officers,
      icon: "SupervisorAccount",
      color: "#CC8800",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
      <Grid container spacing={2.5}>
        {kpis.map((item, idx) => {
          const Icon = iconMap[item.icon] || DescriptionIcon;
          const displayValue = item.prefix
            ? `${item.prefix}${formatNumber(item.value)}`
            : formatNumber(item.value);
          return (
            <Grid item xs={12} sm={6} md={4} xl key={item.id}>
              <MotionCard
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                elevation={0}
                sx={{
                  p: 2.2,
                  borderRadius: "16px",
                  bgcolor: "#FFFDF5",
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
                aria-label={`${item.title}: ${displayValue}`}
              >
                <Box sx={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 2 }}>
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
                        fontWeight: 800,
                        color: "#0F172A",
                        lineHeight: 1.1,
                        mb: 0.9,
                        letterSpacing: 0.5,
                      }}
                    >
                      {displayValue}
                    </Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

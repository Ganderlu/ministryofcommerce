"use client";

import React from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import {
  Group as GroupIcon,
  VerifiedUser as VerifiedUserIcon,
  Storage as StorageIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

interface FooterStatisticsProps {
  data: AdminDashboardData;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Group: GroupIcon,
  VerifiedUser: VerifiedUserIcon,
  Storage: StorageIcon,
  Schedule: ScheduleIcon,
};

export default function FooterStatistics({ data }: FooterStatisticsProps) {
  const stats = [
    { id: "users", icon: "Group", label: "Platform Users", value: data.footerAggregates.platformUsers, color: "#FFAA00" },
    { id: "verified", icon: "VerifiedUser", label: "Verified Businesses", value: data.footerAggregates.verifiedBusinesses, color: "#1D4ED8" },
    { id: "uploads", icon: "Storage", label: "Documents Uploaded", value: data.footerAggregates.documentsUploaded, color: "#7C3AED" },
    { id: "pending", icon: "Schedule", label: "Applications Pending", value: data.footerAggregates.pendingApplications, color: "#CC8800" },
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      sx={{
        p: 1.8,
        borderRadius: "16px",
        bgcolor: "rgba(255, 170, 0, 0.03)",
        border: "1px solid rgba(255, 170, 0, 0.12)",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 1,
      }}
      role="status"
      aria-label="Platform aggregate statistics"
    >
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || GroupIcon;
        return (
          <React.Fragment key={stat.id}>
            {idx !== 0 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: idx < 2 ? "none" : "block", md: "block" },
                  borderColor: "rgba(255, 170, 0, 0.12)",
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.4,
                px: 1.2,
                py: 0.8,
                borderRadius: "12px",
                transition: "all 0.2s",
              }}
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: `${stat.color}12`,
                  color: stat.color,
                }}
              >
                <Icon sx={{ fontSize: 22 }} />
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value.toLocaleString("en-NG")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: "#64748B",
                    fontWeight: 500,
                    mt: 0.25,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          </React.Fragment>
        );
      })}
    </MotionBox>
  );
}

"use client";

import React from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import {
  Group as GroupIcon,
  VerifiedUser as VerifiedUserIcon,
  Storage as StorageIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { footerStats } from "@/data/seed";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const iconMap: Record<string, React.ComponentType<any>> = {
  Group: GroupIcon,
  VerifiedUser: VerifiedUserIcon,
  Storage: StorageIcon,
  Schedule: ScheduleIcon,
};

export default function FooterStatistics() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      sx={{
        p: 1.8,
        borderRadius: "16px",
        bgcolor: "rgba(11, 107, 58, 0.04)",
        border: "1px solid rgba(11, 107, 58, 0.15)",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 1,
      }}
    >
      {footerStats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || GroupIcon;
        return (
          <React.Fragment key={stat.id}>
            {idx !== 0 && (
              <Divider
                orientation={idx % 2 === 0 && idx !== 2 ? "vertical" : "vertical"}
                flexItem
                sx={{
                  display: { xs: idx < 2 ? "none" : "block", md: "block" },
                  borderColor: "rgba(11, 107, 58, 0.12)",
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
                "&:hover": {
                  bgcolor: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                  border: `1px solid ${stat.color}25`,
                }}
              >
                <Icon sx={{ fontSize: 22 }} />
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#084C2E",
                    lineHeight: 1.1,
                    letterSpacing: -0.3,
                  }}
                >
                  {stat.value}
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

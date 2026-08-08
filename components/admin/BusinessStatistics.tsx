"use client";

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  Storefront as StorefrontIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  MonetizationOn as MonetizationOnIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface StatCard {
  label: string;
  value: string;
  change: number;
  changeDirection: "up" | "down";
  icon: React.ComponentType<any>;
  color: string;
}

const cards: StatCard[] = [
  {
    label: "Total Businesses",
    value: "1,532",
    change: 15.3,
    changeDirection: "up",
    icon: StorefrontIcon,
    color: "#0B6B3A",
  },
  {
    label: "Approved Businesses",
    value: "1,028",
    change: 12.7,
    changeDirection: "up",
    icon: CheckCircleIcon,
    color: "#16A34A",
  },
  {
    label: "Pending Review",
    value: "342",
    change: 8.5,
    changeDirection: "up",
    icon: ScheduleIcon,
    color: "#F59E0B",
  },
  {
    label: "Rejected Businesses",
    value: "162",
    change: 3.2,
    changeDirection: "down",
    icon: CancelIcon,
    color: "#DC2626",
  },
  {
    label: "Total Revenue",
    value: "₦24.8M",
    change: 18.2,
    changeDirection: "up",
    icon: MonetizationOnIcon,
    color: "#D4AF37",
  },
];

export default function BusinessStatistics() {
  return (
    <Grid container spacing={2.5}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isUp = card.changeDirection === "up";

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={card.label}
            sx={{
              flexGrow: 1,
              flexBasis: { lg: "20%" },
              maxWidth: { lg: "20%" },
            }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              sx={{
                bgcolor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                p: 2.3,
                boxShadow:
                  "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.05)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${card.color}1A`,
                    color: card.color,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      color: "#64748B",
                      fontWeight: 500,
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#1E293B",
                      letterSpacing: -0.3,
                      mt: 0.6,
                      lineHeight: 1.1,
                    }}
                  >
                    {card.value}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.3,
                      px: 0.9,
                      py: 0.25,
                      borderRadius: "999px",
                      bgcolor: isUp
                        ? "rgba(22, 163, 74, 0.1)"
                        : "rgba(220, 38, 38, 0.1)",
                      color: isUp ? "#16A34A" : "#DC2626",
                      mt: 0.6,
                    }}
                  >
                    {isUp ? (
                      <ArrowUpIcon sx={{ fontSize: 12 }} />
                    ) : (
                      <ArrowDownIcon sx={{ fontSize: 12 }} />
                    )}
                    <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
                      {card.change.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "#94A3B8",
                      mt: 0.4,
                      display: "block",
                    }}
                  >
                    from last month
                  </Typography>
                </Box>
              </Box>
            </MotionBox>
          </Grid>
        );
      })}
    </Grid>
  );
}

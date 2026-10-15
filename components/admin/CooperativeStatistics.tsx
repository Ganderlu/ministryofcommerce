"use client";

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  Diversity3 as CooperativesIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { CooperativeRow } from "@/types";

const MotionBox = motion(Box);

interface CooperativeStatisticsProps {
  rows?: CooperativeRow[];
}

function countStatus(rows: CooperativeRow[], status: CooperativeRow["status"]): number {
  return rows.filter((r) => r.status === status).length;
}

export default function CooperativeStatistics({ rows = [] }: CooperativeStatisticsProps) {
  const total = rows.length;
  const approved = countStatus(rows, "Approved");
  const pending = countStatus(rows, "Pending") + countStatus(rows, "Under Review");
  const rejected = countStatus(rows, "Rejected") + countStatus(rows, "Suspended");

  const cards = [
    {
      label: "Total Cooperatives",
      value: total,
      icon: CooperativesIcon,
      color: "#FFAA00",
      caption: "Total registered cooperatives",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircleIcon,
      color: "#3B82F6",
      caption: "Fully reviewed and approved",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: ScheduleIcon,
      color: "#FFAA00",
      caption: "Awaiting reviewer action",
    },
    {
      label: "Rejected / Suspended",
      value: rejected,
      icon: CancelIcon,
      color: "#DC2626",
      caption: "Rejected or suspended",
    },
  ];

  return (
    <Box>
      <Grid container spacing={2.5}>
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={card.label}
              sx={{ flexGrow: 1, flexBasis: { lg: "25%" }, maxWidth: { lg: "25%" } }}
            >
              <MotionBox
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                sx={{
                  bgcolor: "#FFFDF5",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  p: 2.3,
                  boxShadow:
                    "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.05)",
                  transition: "all 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
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
                      sx={{ fontSize: 12.5, color: "#64748B", fontWeight: 500 }}
                    >
                      {card.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#0F172A",
                        mt: 0.6,
                        lineHeight: 1.1,
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11.5,
                        color: "#94A3B8",
                        mt: 0.6,
                        fontStyle: "italic",
                        display: "block",
                      }}
                    >
                      {card.caption}
                    </Typography>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

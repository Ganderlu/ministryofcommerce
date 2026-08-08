"use client";

import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

interface TableCardProps {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  sx?: any;
  padding?: number;
}

export default function TableCard({
  title,
  action,
  children,
  sx,
  padding = 0,
}: TableCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      elevation={0}
      sx={{
        borderRadius: "16px",
        bgcolor: "white",
        border: "1px solid #E2E8F0",
        boxShadow:
          "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.04)",
        ...sx,
      }}
    >
      {(title || action) && (
        <Box
          sx={{
            p: 2.2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          {typeof title === "string" ? (
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 15,
                color: "#1E293B",
              }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
          {action}
        </Box>
      )}
      <Box sx={{ p: padding }}>{children}</Box>
    </MotionCard>
  );
}

"use client";

import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

const MotionCard = motion(Card);

export interface SectionCardProps {
  headerTitle?: React.ReactNode;
  action?: React.ReactNode;
  contentGutter?: boolean;
  delay?: number;
  sx?: React.ComponentProps<typeof Card>["sx"];
  children?: React.ReactNode;
  elevation?: number;
}

export default function SectionCard({
  headerTitle,
  action,
  contentGutter = true,
  delay = 0,
  sx,
  children,
  elevation = 0,
}: SectionCardProps) {
  const motionProps: MotionProps = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
  };
  return (
    <MotionCard
      {...motionProps}
      elevation={elevation}
      sx={{
        p: 0,
        borderRadius: "18px",
        border: "1px solid #E2E8F0",
        boxShadow:
          "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)",
        bgcolor: "white",
        overflow: "hidden",
        transition: "all 0.25s",
        "&:hover": {
          boxShadow:
            "0 6px 20px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)",
          transform: "translateY(-2px)",
          borderColor: "#CBD5E1",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      } as any}
    >
      {(headerTitle || action) && (
        <Box
          sx={{
            px: 2.5,
            pt: 2.2,
            pb: 1.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #F1F5F9",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            {typeof headerTitle === "string" ? (
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
                {headerTitle}
              </Typography>
            ) : (
              headerTitle
            )}
          </Box>
          {action}
        </Box>
      )}
      <Box sx={{ p: contentGutter ? 2.5 : 0, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {children}
      </Box>
    </MotionCard>
  );
}

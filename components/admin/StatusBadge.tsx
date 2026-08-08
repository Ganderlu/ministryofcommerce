"use client";

import React from "react";
import { Chip } from "@mui/material";
import type { BusinessStatus } from "@/types";

interface StatusBadgeProps {
  status: BusinessStatus;
  size?: "small" | "medium";
}

const statusConfig: Record<
  BusinessStatus,
  {
    bgcolor: string;
    color: string;
    border: string;
  }
> = {
  Approved: {
    bgcolor: "rgba(22, 163, 74, 0.10)",
    color: "#16A34A",
    border: "rgba(22, 163, 74, 0.25)",
  },
  "Under Review": {
    bgcolor: "rgba(59, 130, 246, 0.10)",
    color: "#3B82F6",
    border: "rgba(59, 130, 246, 0.25)",
  },
  Pending: {
    bgcolor: "rgba(245, 158, 11, 0.10)",
    color: "#F59E0B",
    border: "rgba(245, 158, 11, 0.25)",
  },
  Rejected: {
    bgcolor: "rgba(220, 38, 38, 0.10)",
    color: "#DC2626",
    border: "rgba(220, 38, 38, 0.25)",
  },
  Suspended: {
    bgcolor: "rgba(100, 116, 139, 0.10)",
    color: "#64748B",
    border: "rgba(100, 116, 139, 0.25)",
  },
};

export default function StatusBadge({ status, size = "medium" }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  const fontSize = size === "small" ? 11.5 : 12.5;
  const px = size === "small" ? 0.8 : 1;

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        borderRadius: "999px",
        fontWeight: 650,
        fontSize: `${fontSize}px`,
        letterSpacing: "0.15px",
        px: `${px}rem`,
        py: 0.25,
        bgcolor: cfg.bgcolor,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        ".MuiChip-label": {
          px: 0,
          py: 0,
        },
      }}
    />
  );
}

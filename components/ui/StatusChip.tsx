"use client";

import React from "react";
import { Chip, ChipProps } from "@mui/material";
import type { ApplicationStatus } from "@/types";

type Status = ApplicationStatus | string;

const statusConfig: Record<string, { color: string; bgcolor: string; border: string }> = {
  Pending: {
    color: "#92400E",
    bgcolor: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  "Under Review": {
    color: "#1D4ED8",
    bgcolor: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.3)",
  },
  Approved: {
    color: "#166534",
    bgcolor: "rgba(22, 163, 74, 0.12)",
    border: "rgba(22, 163, 74, 0.3)",
  },
  Rejected: {
    color: "#991B1B",
    bgcolor: "rgba(220, 38, 38, 0.11)",
    border: "rgba(220, 38, 38, 0.28)",
  },
};

interface Props extends ChipProps {
  status: Status;
}

export default function StatusChip({ status, sx, ...rest }: Props) {
  const cfg = statusConfig[status] || statusConfig.Pending;

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: 11,
        height: 26,
        color: cfg.color,
        bgcolor: cfg.bgcolor,
        border: `1px solid ${cfg.border}`,
        borderRadius: "999px",
        px: 0.4,
        ".MuiChip-label": { px: 1.1 },
        ...sx,
      }}
      {...rest}
    />
  );
}

"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Inventory2Outlined as Inventory2OutlinedIcon } from "@mui/icons-material";

interface EmptyStateProps {
  icon?: string | React.ComponentType<any>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  let IconComponent: React.ComponentType<any> = Inventory2OutlinedIcon;

  if (icon && typeof icon !== "string") {
    IconComponent = icon;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 4,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "24px",
          bgcolor: "#F8FAFC",
          border: "1px dashed #CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComponent sx={{ color: "#94A3B8", fontSize: 40 }} />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 16,
          color: "#1E293B",
          mt: 2.5,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: "#64748B",
            fontSize: 13,
            mt: 0.8,
            textAlign: "center",
            maxWidth: 480,
          }}
        >
          {description}
        </Typography>
      )}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
}

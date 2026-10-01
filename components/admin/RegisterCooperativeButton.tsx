"use client";

import React from "react";
import { Button, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";

interface RegisterCooperativeButtonProps {
  size?: "small" | "medium";
  href?: string;
  sx?: any;
  onClick?: () => void;
}

const MotionBox = motion(Box);

export default function RegisterCooperativeButton({
  size = "medium",
  href,
  sx,
  onClick,
}: RegisterCooperativeButtonProps) {
  const sizeStyles =
    size === "small"
      ? { px: 1.6, py: 0.9, fontSize: 12.5 }
      : { px: 2.2, py: 1.2, fontSize: 13.5 };

  const buttonProps: any = {
    variant: "contained",
    startIcon: <AddIcon sx={{ fontSize: size === "small" ? 17 : 19 }} />,
    onClick: href ? undefined : onClick,
    sx: {
      bgcolor: "#0B6B3A",
      color: "white",
      fontWeight: 700,
      textTransform: "none",
      borderRadius: "12px",
      boxShadow: "0 3px 8px rgba(11,107,58,0.28)",
      ...sizeStyles,
      transition: "all 0.2s",
      "&:hover": {
        bgcolor: "#084C2E",
        boxShadow: "0 6px 16px rgba(11,107,58,0.4)",
        transform: "translateY(-1px)",
      },
      ...sx,
    },
  };

  if (href) {
    buttonProps.component = Link;
    buttonProps.href = href;
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.2 }}
      whileHover={{ scale: 1.015 }}
      style={{ display: "inline-block" }}
    >
      <Button {...buttonProps}>Registerrrr  New Cooperative</Button>
    </MotionBox>
  );
}

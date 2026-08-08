"use client";

import React, { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface ExportButtonProps {
  size?: "small" | "medium";
  sx?: any;
}

export default function ExportButton({ size = "medium", sx }: ExportButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const sizeStyles =
    size === "small"
      ? { px: 1.2, py: 0.6, fontSize: 12 }
      : { px: 1.6, py: 1, fontSize: 13 };

  return (
    <motion.div
      initial={{ opacity: 0.96 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{ display: "inline-block" }}
    >
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon sx={{ fontSize: size === "small" ? 16 : 18 }} />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          border: "1px solid #E2E8F0",
          color: "#1E293B",
          bgcolor: "white",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px",
          ...sizeStyles,
          "&:hover": {
            bgcolor: "#F8FAFC",
            border: "1px solid #CBD5E1",
          },
          ...sx,
        }}
      >
        Export
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(15,23,42,0.12)",
            mt: 0.5,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PictureAsPdfIcon sx={{ color: "#DC2626", fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Export as PDF"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#1E293B" }}
          />
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <TableChartIcon sx={{ color: "#16A34A", fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Export as Excel"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#1E293B" }}
          />
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <DescriptionIcon sx={{ color: "#2563EB", fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Export as CSV"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#1E293B" }}
          />
        </MenuItem>
      </Menu>
    </motion.div>
  );
}

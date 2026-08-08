"use client";

import React, { useState } from "react";
import { Stack, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import {
  Visibility,
  Edit,
  MoreVert,
  CheckCircle,
  Cancel,
  Pause,
  Delete,
  FileDownload,
  Folder,
} from "@mui/icons-material";

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
  onDownloadCert?: () => void;
  onViewDocs?: () => void;
  size?: "small" | "medium";
}

export default function ActionMenu({
  onView,
  onEdit,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
  onDownloadCert,
  onViewDocs,
  size = "medium",
}: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (callback?: () => void) => {
    handleClose();
    callback?.();
  };

  const padding = size === "small" ? 0.55 : 0.7;
  const fontSize = size === "small" ? "16px" : "18px";

  return (
    <Stack direction="row" spacing={0.3}>
      <IconButton
        size={size}
        onClick={onView}
        sx={{
          p: padding,
          borderRadius: "10px",
          color: "#64748B",
          fontSize: fontSize,
          "&:hover": {
            bgcolor: "rgba(11, 107, 58, 0.08)",
            color: "#0B6B3A",
          },
        }}
      >
        <Visibility sx={{ fontSize: "inherit" }} />
      </IconButton>

      <IconButton
        size={size}
        onClick={onEdit}
        sx={{
          p: padding,
          borderRadius: "10px",
          color: "#64748B",
          fontSize: fontSize,
          "&:hover": {
            bgcolor: "rgba(59, 130, 246, 0.08)",
            color: "#3B82F6",
          },
        }}
      >
        <Edit sx={{ fontSize: "inherit" }} />
      </IconButton>

      <IconButton
        size={size}
        onClick={handleClick}
        sx={{
          p: padding,
          borderRadius: "10px",
          color: "#64748B",
          fontSize: fontSize,
          "&:hover": {
            bgcolor: "rgba(100, 116, 139, 0.08)",
          },
        }}
      >
        <MoreVert sx={{ fontSize: "inherit" }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 0.5,
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => handleAction(onView)}>
          <Visibility sx={{ mr: 1.5, fontSize: "18px", color: "#64748B" }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction(onEdit)}>
          <Edit sx={{ mr: 1.5, fontSize: "18px", color: "#3B82F6" }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction(onApprove)}>
          <CheckCircle sx={{ mr: 1.5, fontSize: "18px", color: "#16A34A" }} />
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleAction(onReject)}>
          <Cancel sx={{ mr: 1.5, fontSize: "18px", color: "#DC2626" }} />
          Reject
        </MenuItem>
        <MenuItem onClick={() => handleAction(onSuspend)}>
          <Pause sx={{ mr: 1.5, fontSize: "18px", color: "#64748B" }} />
          Suspend
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleAction(onDelete)}>
          <Delete sx={{ mr: 1.5, fontSize: "18px", color: "#DC2626" }} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => handleAction(onDownloadCert)}>
          <FileDownload sx={{ mr: 1.5, fontSize: "18px", color: "#0B6B3A" }} />
          Download Certificate
        </MenuItem>
        <MenuItem onClick={() => handleAction(onViewDocs)}>
          <Folder sx={{ mr: 1.5, fontSize: "18px", color: "#D4AF37" }} />
          View Documents
        </MenuItem>
      </Menu>
    </Stack>
  );
}

"use client";

import React from "react";
import { Typography, Box, Chip } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { motion } from "framer-motion";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

interface RecentApplicationsProps {
  data: AdminDashboardData;
}

const STATUS_COLORS: Record<string, string> = {
  approved: "#FFAA00",
  Approved: "#FFAA00",
  pending: "#FFAA00",
  Pending: "#FFAA00",
  submitted: "#FFAA00",
  "Under Review": "#3B82F6",
  under_review: "#3B82F6",
  rejected: "#DC2626",
  Rejected: "#DC2626",
  Suspended: "#DC2626",
  draft: "#94A3B8",
};

function formatTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-NG", { day: "2-digit", month: "short" });
}

export default function RecentApplications({ data }: RecentApplicationsProps) {
  const apps = data.recentApplications;

  return (
    <SectionCard
      delay={0.3}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Recent Applications
        </Typography>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {apps.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              p: 2.4,
              borderRadius: "14px",
              border: "1.5px dashed #E2E8F0",
              bgcolor: "rgba(248,250,252,0.55)",
              textAlign: "center",
            }}
            role="status"
          >
            <Typography sx={{ fontSize: 12.5, color: "#94A3B8", fontWeight: 500 }}>
              No applications yet. Submitted registrations will appear here.
            </Typography>
          </MotionBox>
        )}
        {apps.map((app, idx) => {
          const statusColor = STATUS_COLORS[app.status] ?? "#94A3B8";
          return (
            <MotionBox
              key={app.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.4,
                p: 1.4,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  bgcolor: `${statusColor}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13,
                  fontWeight: 800,
                  color: statusColor,
                }}
                aria-hidden
              >
                {app.applicantName.charAt(0).toUpperCase()}
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1E293B",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {app.applicantName}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: "#94A3B8", fontWeight: 500 }}>
                  {app.applicationType} · {formatTime(app.submissionTime)}
                </Typography>
              </Box>
              <Chip
                size="small"
                label={app.status}
                sx={{
                  bgcolor: `${statusColor}12`,
                  color: statusColor,
                  border: `1px solid ${statusColor}30`,
                  fontWeight: 600,
                  fontSize: 10.5,
                  height: 22,
                  ".MuiChip-label": { px: 1 },
                }}
              />
            </MotionBox>
          );
        })}
      </Box>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { PieChart } from "@mui/x-charts/PieChart";
import { motion } from "framer-motion";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

interface StatusChartProps {
  data: AdminDashboardData;
}

const STATUS_COLORS: Record<string, string> = {
  approved: "#FFAA00",
  pending: "#FFAA00",
  rejected: "#DC2626",
  underReview: "#3B82F6",
};

const STATUS_LABELS: Record<string, string> = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
  underReview: "Under Review",
};

export default function StatusChart({ data }: StatusChartProps) {
  const dist = data.statusDistribution;
  const total = dist.total || 1;

  const entries = [
    { key: "approved", value: dist.approved },
    { key: "pending", value: dist.pending },
    { key: "underReview", value: dist.underReview },
    { key: "rejected", value: dist.rejected },
  ];

  const pieData = entries
    .filter((e) => e.value > 0)
    .map((e) => ({
      id: STATUS_LABELS[e.key],
      value: e.value,
      color: STATUS_COLORS[e.key],
    }));

  // If no data at all, render a single gray segment so the chart doesn't break
  const seriesData = pieData.length > 0 ? pieData : [{ id: "No Data", value: 1, color: "#E2E8F0" }];

  return (
    <SectionCard
      delay={0.15}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Applications by Status
        </Typography>
      }
      sx={{ height: "100%" }}
    >
      <MotionBox initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 260,
            borderRadius: "14px",
            overflow: "hidden",
          }}
          role="img"
          aria-label={`Applications status distribution: ${dist.approved} approved, ${dist.pending} pending, ${dist.underReview} under review, ${dist.rejected} rejected`}
        >
          <PieChart
            series={[
              {
                data: seriesData,
                cx: "50%",
                cy: "50%",
                innerRadius: 68,
                outerRadius: 108,
                cornerRadius: 6,
                paddingAngle: 2,
              },
            ]}
            width={440}
            height={260}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
              gap: 0.2,
            }}
          >
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.1,
              }}
            >
              {dist.total}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 600 }}>
              Total Applications
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1.8, display: "flex", flexDirection: "column", gap: 1.4, px: 0.4 }}>
          {entries.map((e) => {
            const pct = total > 0 ? Math.round((e.value / total) * 100) : 0;
            return (
              <Box key={e.key} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: STATUS_COLORS[e.key],
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: 12, color: "#64748B", fontWeight: 600, flex: 1 }}>
                  {STATUS_LABELS[e.key]}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#0F172A", fontWeight: 700 }}>
                  {e.value}
                  <Box component="span" sx={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, ml: 0.5 }}>
                    ({pct}%)
                  </Box>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </MotionBox>
    </SectionCard>
  );
}

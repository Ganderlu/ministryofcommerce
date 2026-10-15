"use client";

import React from "react";
import { Typography, Box, Chip } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { motion } from "framer-motion";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface RevenueChartProps {
  data: AdminDashboardData;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const totalRevenue = data.kpis.revenue;
  const zeroSeries = MONTHS.map(() => 0);

  return (
    <SectionCard
      delay={0.25}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Revenue Analytics
        </Typography>
      }
    >
      <Box sx={{ mb: 1.2, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
        <Chip
          size="small"
          label={`Total: ₦${totalRevenue.toLocaleString("en-NG")}`}
          sx={{
            bgcolor: "rgba(255, 170, 0, 0.08)",
            color: "#FFAA00",
            border: "1px solid rgba(255, 170, 0, 0.18)",
            fontWeight: 700,
            fontSize: 11.5,
            height: 26,
          }}
        />
        <Chip
          size="small"
          label="Payment ledger not yet integrated"
          sx={{
            bgcolor: "rgba(148, 163, 184, 0.08)",
            color: "#64748B",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            fontWeight: 500,
            fontSize: 11,
            height: 26,
          }}
        />
      </Box>

      <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1.5, mb: 0.5, pl: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#CC8800" }} />
            <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 600 }}>Revenue (₦)</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 250,
            borderRadius: "12px",
            overflow: "hidden",
          }}
          role="img"
          aria-label="Monthly revenue chart"
        >
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: MONTHS,
                tickLabelStyle: { fontSize: 11, fill: "#94A3B8" },
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: 1,
                tickInterval: [0, 1],
                labelStyle: { fontSize: 11, fill: "#94A3B8" },
                valueFormatter: (v: number) => `₦${v}`,
              },
            ]}
            series={[
              {
                data: zeroSeries,
                color: "#CC8800",
                highlightScope: { fade: "global", highlight: "item" },
              },
            ]}
            grid={{ horizontal: true, vertical: false }}
            height={250}
            borderRadius={7}
            margin={{ top: 16, left: 58, right: 20, bottom: 10 }}
            sx={{
              "& .MuiChartsAxis-tickLabel": { fill: "#94A3B8", fontSize: 11 },
              "& .MuiChartsGrid-line": { stroke: "#F1F5F9" },
            }}
          />
        </Box>
      </MotionBox>
    </SectionCard>
  );
}

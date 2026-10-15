"use client";

import React, { useState } from "react";
import { Typography, Box, MenuItem, Select, FormControl } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { motion } from "framer-motion";
import { LineChart } from "@mui/x-charts/LineChart";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

interface ApplicationsChartProps {
  data: AdminDashboardData;
}

export default function ApplicationsChart({ data }: ApplicationsChartProps) {
  const [range, setRange] = useState("This Year");
  const { labels, thisMonth, lastMonth } = data.monthlyApplications;

  const maxVal = Math.max(1, ...thisMonth, ...lastMonth);
  // Round up to nearest nice number
  const yMax = Math.ceil(maxVal / 5) * 5 || 5;

  return (
    <SectionCard
      delay={0.1}
      headerTitle={<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>Application Overview</Typography>}
      action={
        <FormControl size="small" sx={{ minWidth: 128 }}>
          <Select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{
              fontSize: 12.5,
              height: 34,
              bgcolor: "#F8FAFC",
              color: "#475569",
              fontWeight: 500,
              borderRadius: "9px",
              border: "1px solid #E2E8F0",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          >
            <MenuItem value="This Year">This Year</MenuItem>
            <MenuItem value="Last Year">Last Year</MenuItem>
          </Select>
        </FormControl>
      }
    >
      <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Legend color="#FFAA00" label="This Year" />
          <Legend color="#CBD5E1" label="Last Year" />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 250,
            mt: -1,
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          role="img"
          aria-label="Monthly application volumes chart"
        >
          <LineChart
            xAxis={[
              {
                data: labels,
                scaleType: "band",
                tickInterval: (_, i) => i % 2 === 0,
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: yMax,
                tickInterval: (v) => v % Math.max(1, Math.round(yMax / 5)) === 0,
                labelStyle: { fontSize: 11, fill: "#94A3B8" },
              },
            ]}
            grid={{ horizontal: true, vertical: false }}
            series={[
              {
                data: thisMonth,
                color: "#FFAA00",
                showMark: true,
                curve: "monotoneX",
                area: true,
                label: "This Year",
              },
              {
                data: lastMonth,
                color: "#CBD5E1",
                showMark: false,
                curve: "monotoneX",
                area: false,
                label: "Last Year",
              },
            ]}
            margin={{ top: 10, left: 40, right: 20, bottom: 10 }}
            height={250}
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

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
      <Box
        sx={{
          width: 22,
          height: 5,
          borderRadius: 999,
          bgcolor: color,
        }}
      />
      <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
}

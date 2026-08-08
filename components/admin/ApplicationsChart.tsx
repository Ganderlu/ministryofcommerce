"use client";

import React, { useState } from "react";
import { Typography, Box, MenuItem, Select, FormControl } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { LineChart } from "@mui/x-charts/LineChart";
import { applicationsByMonth } from "@/data/seed";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ApplicationsChart() {
  const [range, setRange] = useState("This Month");

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
              color: "#1E293B",
              fontWeight: 500,
              borderRadius: "9px",
              border: "1px solid #E2E8F0",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          >
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="Custom Range">Custom Range</MenuItem>
          </Select>
        </FormControl>
      }
    >
      <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Legend color="#0B6B3A" label="This Month" />
          <Legend color="#86C69A" label="Last Month" />
        </Box>
        <Box sx={{ width: "100%", height: 250, mt: -1 }}>
          <LineChart
            xAxis={[
              {
                data: applicationsByMonth.map((d) => d.date),
                scaleType: "band",
                tickInterval: (_, i) => i % 2 === 0,
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: 1000,
                tickInterval: [0, 200, 400, 600, 800, 1000],
                labelStyle: { fontSize: 11, fill: "#94A3B8" },
              },
            ]}
            grid={{ horizontal: true, vertical: false }}
            series={[
              {
                data: applicationsByMonth.map((d) => d.thisMonth),
                color: "#0B6B3A",
                showMark: false,
                curve: "monotoneX",
                area: true,
                label: "This Month",
              },
              {
                data: applicationsByMonth.map((d) => d.lastMonth),
                color: "#86C69A",
                showMark: false,
                curve: "monotoneX",
                area: true,
                label: "Last Month",
              },
            ]}
            margin={{ top: 10, left: 40, right: 20, bottom: 10 }}
            height={250}
            sx={{
              "& .MuiAreaElement-root": {
                opacity: 1,
              },
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
      <Typography sx={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
}

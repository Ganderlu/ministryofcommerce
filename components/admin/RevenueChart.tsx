"use client";

import React from "react";
import { Typography, Box, Button } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { revenueAnalytics } from "@/data/seed";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function RevenueChart() {
  return (
    <SectionCard
      delay={0.25}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Revenue Analytics
        </Typography>
      }
      action={
        <Button
          size="small"
          sx={{
            color: "#0B6B3A",
            fontWeight: 700,
            fontSize: 12,
            textTransform: "none",
            p: 0,
            minWidth: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          View All
        </Button>
      }
    >
      <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1.5, mb: 0.5, pl: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#0B6B3A" }} />
            <Typography sx={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>
              Revenue (₦)
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: 250 }}>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: revenueAnalytics.map((d) => d.month),
                tickLabelStyle: { fontSize: 11, fill: "#94A3B8" },
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: 25,
                tickInterval: [0, 5, 10, 15, 20, 25],
                labelStyle: { fontSize: 11, fill: "#94A3B8" },
                valueFormatter: (v: number) => `₦${v}M`,
              },
            ]}
            series={[
              {
                data: revenueAnalytics.map((d) => d.revenue),
                color: "#0B6B3A",
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
              "& .MuiBarElement-root": {
                transition: "all 0.2s",
                "&:hover": {
                  filter: "brightness(1.15)",
                  cursor: "pointer",
                },
              },
            }}
          />
        </Box>
      </MotionBox>
    </SectionCard>
  );
}

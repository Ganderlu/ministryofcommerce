"use client";

import React from "react";
import { Typography, Box } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { PieChart } from "@mui/x-charts/PieChart";
import { applicationsByStatus } from "@/data/seed";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const total = applicationsByStatus.reduce((s, d) => s + d.value, 0);

export default function StatusChart() {
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
        <Box sx={{ position: "relative", width: "100%", height: 260 }}>
          <PieChart
            series={[
              {
                data: applicationsByStatus.map((s) => ({
                  id: s.label,
                  value: s.value,
                  color: s.color,
                })),
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
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#1E293B", lineHeight: 1.1 }}>
              {total.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 600, mt: 0.3 }}>
              Total
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 0, display: "flex", flexDirection: "column", gap: 1.4, px: 1 }}>
          {applicationsByStatus.map((s) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <Box key={s.label} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: s.color,
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: 12, color: "#475569", fontWeight: 600, flex: 1 }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#1E293B", fontWeight: 700 }}>
                  {s.value.toLocaleString()}{" "}
                  <Typography component="span" sx={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
                    ({pct}%)
                  </Typography>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </MotionBox>
    </SectionCard>
  );
}

"use client";

import React from "react";
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import { motion } from "framer-motion";
import type { AdminDashboardData } from "@/lib/admin-data";

const MotionBox = motion(Box);

interface TopServicesTableProps {
  data: AdminDashboardData;
}

const ICON_COLORS = ["#FFAA00", "#1D4ED8", "#7C3AED", "#CC8800", "#CC8800"];

export default function TopServicesTable({ data }: TopServicesTableProps) {
  const services = data.topServices;
  const maxCount = Math.max(1, ...services.map((s) => s.count));

  return (
    <SectionCard
      delay={0.22}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Top Services
        </Typography>
      }
    >
      <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }}>
        <Table size="small" sx={{ minWidth: 0 }}>
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-head": { border: "none", p: 1.2, py: 0.8, pb: 1.5 } }}>
              <TableCell
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                  bgcolor: "#F8FAFC",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              >
                Service Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                  bgcolor: "#F8FAFC",
                }}
              >
                Applications
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                  bgcolor: "#F8FAFC",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                Share
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} sx={{ border: "none", p: 2, textAlign: "center", color: "#94A3B8", fontSize: 12 }}>
                  No applications yet.
                </TableCell>
              </TableRow>
            )}
            {services.map((svc, idx) => {
              const color = ICON_COLORS[idx % ICON_COLORS.length];
              const pct = Math.round((svc.count / maxCount) * 100);
              return (
                <TableRow
                  key={svc.name}
                  sx={{
                    "&:last-child .MuiTableCell-body": { border: "none" },
                    transition: "all 0.18s",
                  }}
                >
                  <TableCell sx={{ borderBottom: "1px solid #F1F5F9", p: 1.4, py: 1.6 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "10px",
                          bgcolor: `${color}12`,
                          border: `1px solid ${color}30`,
                        }}
                      />
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>
                        {svc.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid #F1F5F9", p: 1.4, py: 1.6, fontSize: 13, fontWeight: 700, color: "#0F172A" }}
                  >
                    {svc.count}
                  </TableCell>
                  <TableCell align="right" sx={{ borderBottom: "1px solid #F1F5F9", p: 1.4, py: 1.6 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.4,
                        px: 1,
                        py: 0.3,
                        borderRadius: "999px",
                        bgcolor: `${color}10`,
                        color,
                      }}
                    >
                      <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>{pct}%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </MotionBox>
    </SectionCard>
  );
}

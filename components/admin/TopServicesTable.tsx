"use client";

import React from "react";
import { Typography, Box, Button, Avatar, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import {
  ArrowUpward as ArrowUpIcon,
  Business as BusinessIcon,
  Diversity3 as Diversity3Icon,
  VerifiedUser as VerifiedUserIcon,
  Storefront as StorefrontIcon,
} from "@mui/icons-material";
import { topServices } from "@/data/seed";
import { motion } from "framer-motion";

const MotionTableRow = motion(TableRow);

const iconMap: Record<string, React.ComponentType<any>> = {
  Business: BusinessIcon,
  Diversity3: Diversity3Icon,
  VerifiedUser: VerifiedUserIcon,
  Storefront: StorefrontIcon,
};

export default function TopServicesTable() {
  return (
    <SectionCard
      delay={0.22}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Top Services
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }}>
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
                Trend
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topServices.map((row, idx) => {
              const Icon = iconMap[row.icon] || BusinessIcon;
              return (
                <MotionTableRow
                  key={row.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.26 + idx * 0.05 }}
                  sx={{
                    "&:last-child .MuiTableCell-body": { border: "none" },
                    transition: "all 0.18s",
                    "&:hover": { bgcolor: "#FAFBFC" },
                  }}
                >
                    <TableCell sx={{ borderBottom: "1px solid #F1F5F9", p: 1.4, py: 1.6 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            bgcolor: `${row.color}15`,
                            color: row.color,
                            border: `1px solid ${row.color}25`,
                          }}
                        >
                          <Icon sx={{ fontSize: 17 }} />
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1E293B",
                          }}
                        >
                          {row.serviceName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid #F1F5F9",
                        p: 1.4,
                        py: 1.6,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#084C2E",
                      }}
                    >
                      {row.applications.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "1px solid #F1F5F9", p: 1.4, py: 1.6 }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                          px: 1,
                          py: 0.3,
                          borderRadius: "999px",
                          bgcolor: "rgba(22, 163, 74, 0.1)",
                          color: "#16A34A",
                        }}
                      >
                        <ArrowUpIcon sx={{ fontSize: 12 }} />
                        <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
                          {row.growth.toFixed(1)}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </MotionTableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </SectionCard>
  );
}

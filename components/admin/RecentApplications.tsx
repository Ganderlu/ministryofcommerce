"use client";

import React from "react";
import { Typography, Box, Button, Avatar, Divider } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import StatusChip from "@/components/ui/StatusChip";
import {
  Business as BusinessIcon,
  Diversity3 as Diversity3Icon,
} from "@mui/icons-material";
import { recentApplications } from "@/data/seed";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
  Business: BusinessIcon,
  Diversity3: Diversity3Icon,
};

export default function RecentApplications() {
  return (
    <SectionCard
      delay={0.3}
      headerTitle={
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
          Recent Applications
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
        {recentApplications.map((app, idx) => {
          const Icon = iconMap[app.icon] || BusinessIcon;
          return (
            <React.Fragment key={app.id}>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + idx * 0.05 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    p: 1.1,
                    borderRadius: "11px",
                    transition: "all 0.18s",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "#F8FAFC",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: `${app.color}18`,
                      color: app.color,
                      border: `1px solid ${app.color}25`,
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 12.8,
                        fontWeight: 650,
                        color: "#1E293B",
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {app.applicantName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#64748B",
                        mt: 0.25,
                        fontWeight: 500,
                      }}
                    >
                      {app.applicationType}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 0.7,
                    }}
                  >
                    <Typography sx={{ fontSize: 10.5, color: "#94A3B8", fontWeight: 500 }}>
                      {app.submissionTime}
                    </Typography>
                    <StatusChip status={app.status} />
                  </Box>
                </Box>
              </motion.div>
              {idx !== recentApplications.length - 1 && (
                <Divider sx={{ borderColor: "#F1F5F9" }} />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </SectionCard>
  );
}

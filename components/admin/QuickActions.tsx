"use client";

import React from "react";
import { Typography, Box, ListItemIcon, ListItemButton, ListItemText, List, ListItem, Chip } from "@mui/material";
import SectionCard from "@/components/ui/SectionCard";
import {
  PersonAdd as PersonAddIcon,
  RateReview as RateReviewIcon,
  Business as BusinessIcon,
  Diversity3 as Diversity3Icon,
  Campaign as CampaignIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { quickActions } from "@/data/seed";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
  PersonAdd: PersonAddIcon,
  RateReview: RateReviewIcon,
  Business: BusinessIcon,
  Diversity3: Diversity3Icon,
  Campaign: CampaignIcon,
  Analytics: AnalyticsIcon,
};

export default function QuickActions() {
  return (
    <SectionCard
      delay={0.18}
      headerTitle={<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>Quick Actions</Typography>}
    >
      <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
        {quickActions.map((a, idx) => {
          const Icon = iconMap[a.icon] || AnalyticsIcon;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + idx * 0.04 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: "10px",
                    px: 1.4,
                    py: 1.1,
                    transition: "all 0.18s",
                    "&:hover": {
                      bgcolor: "#F8FAFC",
                      transform: "translateX(3px)",
                      "& .qa-icon-box": {
                        bgcolor: "#0B6B3A",
                        color: "white",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 42 }}>
                    <Box
                      className="qa-icon-box"
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "9px",
                        bgcolor: "rgba(11, 107, 58, 0.1)",
                        color: "#0B6B3A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={a.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1E293B",
                    }}
                  />
                  {a.badge !== undefined && (
                    <Chip
                      label={a.badge}
                      size="small"
                      sx={{
                        height: 22,
                        minWidth: 28,
                        bgcolor: "#FBBF24",
                        color: "#7C2D12",
                        fontWeight: 800,
                        fontSize: 10.5,
                        borderRadius: "999px",
                        ".MuiChip-label": { px: 0.8 },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          );
        })}
      </List>
    </SectionCard>
  );
}

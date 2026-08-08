"use client";

import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import StatisticsCards from "@/components/admin/StatisticsCards";
import ApplicationsChart from "@/components/admin/ApplicationsChart";
import StatusChart from "@/components/admin/StatusChart";
import QuickActions from "@/components/admin/QuickActions";
import RecentApplications from "@/components/admin/RecentApplications";
import TopServicesTable from "@/components/admin/TopServicesTable";
import RevenueChart from "@/components/admin/RevenueChart";
import SystemAlerts from "@/components/admin/SystemAlerts";
import FooterStatistics from "@/components/admin/FooterStatistics";

export default function AdminDashboardPage() {
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto" }}>
      {/* Welcome */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: -0.5,
              mb: 0.8,
            }}
          >
            Welcome back, Admin!{" "}
            <Typography component="span" sx={{ fontSize: 26 }}>
              👋
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>
            Here&apos;s what&apos;s happening with the Ministry today.
          </Typography>
        </motion.div>
      </Box>

      {/* KPI Cards */}
      <Box sx={{ mb: 3 }}>
        <StatisticsCards />
      </Box>

      {/* Row 1: App Overview + Status + Quick Actions */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} lg={7} xl={7.5}>
          <ApplicationsChart />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={2.8}>
          <StatusChart />
        </Grid>
        <Grid item xs={12} sm={6} lg={2} xl={1.7}>
          <QuickActions />
        </Grid>
      </Grid>

      {/* Row 2: Top Services + Revenue + (Recent App + System Alerts stacked) */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={4} xl={4.2}>
          <TopServicesTable />
        </Grid>
        <Grid item xs={12} lg={4.2} xl={4.2}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} lg={3.8} xl={3.6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <RecentApplications />
            <SystemAlerts />
          </Box>
        </Grid>
      </Grid>

      {/* Footer Stats */}
      <FooterStatistics />
    </Box>
  );
}

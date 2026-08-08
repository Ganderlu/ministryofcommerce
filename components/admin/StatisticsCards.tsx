import React from "react";
import { Grid, Box } from "@mui/material";
import DashboardCard from "@/components/ui/DashboardCard";
import { kpiCards } from "@/data/seed";

export default function StatisticsCards() {
  return (
    <Grid container spacing={2.5}>
      {kpiCards.map((card, idx) => (
        <Grid item xs={12} sm={6} md={4} xl key={card.id}>
          <DashboardCard item={card} index={idx} />
        </Grid>
      ))}
    </Grid>
  );
}

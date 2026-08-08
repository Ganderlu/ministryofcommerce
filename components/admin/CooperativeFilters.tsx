"use client";

import React from "react";
import { motion } from "framer-motion";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Paper, Stack, Button, Box } from "@mui/material";
import SearchField from "@/components/ui/SearchField";
import FilterSelect from "@/components/ui/FilterSelect";

const MotionBox = motion(Box);

interface CooperativeFiltersProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit?: () => void;
  categoryValue: string;
  onCategoryChange: (v: string) => void;
  categoryOptions: { id: string; name: string }[];
  statusValue: string;
  onStatusChange: (v: string) => void;
  statusOptions: { id: string; name: string }[];
  lgaValue: string;
  onLgaChange: (v: string) => void;
  lgaOptions: { id: string; name: string }[];
  onFilterClick?: () => void;
  onResetClick?: () => void;
}

export default function CooperativeFilters({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  categoryValue,
  onCategoryChange,
  categoryOptions,
  statusValue,
  onStatusChange,
  statusOptions,
  lgaValue,
  onLgaChange,
  lgaOptions,
  onFilterClick,
  onResetClick,
}: CooperativeFiltersProps) {
  const handleSearchClick = () => {
    if (onSearchSubmit) {
      onSearchSubmit();
    } else if (onFilterClick) {
      onFilterClick();
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.35 }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          p: 2.2,
          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} lg={4}>
            <SearchField
              placeholder="Search cooperatives name, chairman, email…"
              fullWidth
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearchSubmit}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <FilterSelect
              placeholder="All Categories"
              value={categoryValue}
              options={categoryOptions}
              onChange={onCategoryChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <FilterSelect
              placeholder="All Status"
              value={statusValue}
              options={statusOptions}
              onChange={onStatusChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <FilterSelect
              placeholder="All LGA"
              value={lgaValue}
              options={lgaOptions}
              onChange={onLgaChange}
            />
          </Grid>
          <Grid item xs={12} md="auto">
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={onFilterClick}
                sx={{
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 2,
                  py: 1.1,
                  border: "1px solid #E2E8F0",
                  color: "#1E293B",
                  "&:hover": {
                    bgcolor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                  },
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearchClick}
                sx={{
                  bgcolor: "#0B6B3A",
                  color: "white",
                  fontWeight: 650,
                  borderRadius: "12px",
                  px: 2.2,
                  py: 1.1,
                  boxShadow: "0 2px 6px rgba(11,107,58,0.25)",
                  "&:hover": {
                    bgcolor: "#084C2E",
                    boxShadow: "0 2px 6px rgba(11,107,58,0.25)",
                  },
                }}
              >
                Search
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </MotionBox>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import CooperativeStatistics from "@/components/admin/CooperativeStatistics";
import CooperativeFilters from "@/components/admin/CooperativeFilters";
import CooperativeTable from "@/components/admin/CooperativeTable";
import ExportButton from "@/components/admin/ExportButton";
import RegisterCooperativeButton from "@/components/admin/RegisterCooperativeButton";
import {
  cooperativeAdminCategories as _cooperativeAdminCategories,
  cooperativeStatusOptions as _cooperativeStatusOptions,
  cooperativeRows as _cooperativeRows,
  TOTAL_COOPERATIVES as _TOTAL_COOPERATIVES,
  lgas as _lgas,
} from "@/data/seed";
import type { CooperativeRow as ICooperativeRow, RegistrationCategory } from "@/types";

const cooperativeAdminCategories = _cooperativeAdminCategories ?? [];
const cooperativeStatusOptions = _cooperativeStatusOptions ?? [];
const cooperativeRows = _cooperativeRows ?? [];
const TOTAL_COOPERATIVES = _TOTAL_COOPERATIVES ?? 0;
const lgas: RegistrationCategory[] = _lgas ?? [];

const MotionBox = motion(Box);

export default function CooperativesPageClient() {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [lgaValue, setLgaValue] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const lgaOptions = useMemo(
    () => lgas.map((l) => ({ id: l.id, name: l.name })),
    []
  );
  const catOptions = useMemo(
    () => cooperativeAdminCategories.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const filteredRows = useMemo<ICooperativeRow[]>(() => {
    let rows = [...cooperativeRows];
    const q = searchValue.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          r.cooperativeName.toLowerCase().includes(q) ||
          r.registrationNumber.toLowerCase().includes(q) ||
          r.chairmanName.toLowerCase().includes(q) ||
          r.chairmanEmail.toLowerCase().includes(q) ||
          r.chairmanPhone.toLowerCase().includes(q)
      );
    }
    if (categoryValue) {
      rows = rows.filter((r) => r.categoryId === categoryValue);
    }
    if (statusValue) {
      rows = rows.filter((r) => r.status === statusValue);
    }
    if (lgaValue) {
      rows = rows.filter((r) => r.lga === lgas.find((l) => l.id === lgaValue)?.name);
    }
    return rows;
  }, [searchValue, categoryValue, statusValue, lgaValue]);

  const pagedRows = useMemo<ICooperativeRow[]>(() => {
    const start = page * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const totalRows = filteredRows.length || TOTAL_COOPERATIVES;

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Title row */}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 3.5,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: -0.4,
              lineHeight: 1.1,
            }}
          >
            Cooperatives
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: "#64748B",
              fontWeight: 500,
              mt: 0.8,
              maxWidth: 620,
              lineHeight: 1.55,
            }}
          >
            Manage, monitor and oversee all registered cooperatives in the system.
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          flexWrap="wrap"
        >
          <ExportButton />
          <RegisterCooperativeButton href="/admin/cooperatives/new" />
        </Stack>
      </MotionBox>

      {/* KPI Cards */}
      <Box sx={{ mb: 3.5 }}>
        <CooperativeStatistics />
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3.5 }}>
        <CooperativeFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          categoryValue={categoryValue}
          onCategoryChange={setCategoryValue}
          categoryOptions={catOptions}
          statusValue={statusValue}
          onStatusChange={setStatusValue}
          statusOptions={cooperativeStatusOptions}
          lgaValue={lgaValue}
          onLgaChange={setLgaValue}
          lgaOptions={lgaOptions}
        />
      </Box>

      {/* Table */}
      <MotionBox
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <CooperativeTable
          rows={pagedRows}
          rowCount={totalRows}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPageSize(n);
            setPage(0);
          }}
          categories={cooperativeAdminCategories}
          loading={false}
        />
      </MotionBox>
    </Box>
  );
}

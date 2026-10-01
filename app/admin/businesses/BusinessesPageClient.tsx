"use client";

import React, { useMemo, useState } from "react";
import { Box, Typography, Stack, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import BusinessStatistics from "@/components/admin/BusinessStatistics";
import BusinessFilters from "@/components/admin/BusinessFilters";
import BusinessTable from "@/components/admin/BusinessTable";
import ExportButton from "@/components/admin/ExportButton";
import RegisterBusinessButton from "@/components/admin/RegisterBusinessButton";
import Pagination from "@/components/admin/Pagination";
import {
  businessAdminCategories,
  businessStatusOptions,
  businessRows,
  lgas,
  TOTAL_BUSINESSES,
} from "@/data/seed";
import type { BusinessRow, BusinessCategoryItem } from "@/types";

const MotionBox = motion(Box);

export default function BusinessesPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [lga, setLga] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [snack, setSnack] = useState<{ open: boolean; severity: "success" | "info" | "warning" | "error"; message: string }>({
    open: false,
    severity: "info",
    message: "",
  });

  const categoryMap = useMemo<Record<string, BusinessCategoryItem>>(() => {
    const m: Record<string, BusinessCategoryItem> = {};
    businessAdminCategories.forEach((c) => {
      m[c.name] = c;
      m[c.id] = c;
    });
    return m;
  }, []);

  const notify = (severity: "success" | "info" | "warning" | "error", message: string) => {
    setSnack({ open: true, severity, message });
  };

  const categorySelectOptions = useMemo(
    () => businessAdminCategories.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const filteredRows = useMemo<BusinessRow[]>(() => {
    const q = search.trim().toLowerCase();
    return businessRows.filter((r) => {
      if (category) {
        const picked = businessAdminCategories.find((c) => c.id === category);
        if (picked && r.categoryId !== picked.id && r.categoryName !== picked.name) return false;
      }
      if (status && r.status !== status) return false;
      if (lga) {
        const lgaOpt = lgas.find((l) => l.id === lga)?.name ?? lga;
        if (r.lga !== lgaOpt) return false;
      }
      if (q) {
        const match =
          r.businessName.toLowerCase().includes(q) ||
          r.ownerName.toLowerCase().includes(q) ||
          r.ownerEmail.toLowerCase().includes(q) ||
          r.applicationNumber.toLowerCase().includes(q) ||
          r.ownerPhone.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [search, category, status, lga]);

  const totalCount = TOTAL_BUSINESSES;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const paginatedRows = useMemo<BusinessRow[]>(() => {
    const start = page * pageSize;
    if (filteredRows.length >= pageSize && filteredRows.length >= start + pageSize) {
      return filteredRows.slice(start, start + pageSize);
    }
    if (filteredRows.length > 0) {
      if (start > filteredRows.length) return filteredRows.slice(0, pageSize);
      return filteredRows.slice(start, start + pageSize);
    }
    return [];
  }, [filteredRows, page, pageSize]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setLga("");
    setPage(0);
    notify("info", "Filters have been reset.");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.6 }}>
      {/* Page heading */}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.02 }}
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 28 },
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: -0.4,
              lineHeight: 1.1,
            }}
          >
            Businesses Management Module
          </Typography>
          <Typography
            sx={{
              mt: 0.8,
              fontSize: 14,
              color: "#64748B",
              fontWeight: 450,
              lineHeight: 1.45,
              maxWidth: 620,
            }}
          >
            Manage, monitor and oversee all registered businesses in the system.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <ExportButton />
          <RegisterBusinessButton href="/admin/businesses/new" />
        </Stack>
      </MotionBox>

      {/* KPI Statistics */}
      <BusinessStatistics />

      {/* Filters */}
      <BusinessFilters
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(0)}
        categoryValue={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setPage(0);
        }}
        categoryOptions={categorySelectOptions}
        statusValue={status}
        onStatusChange={(v) => {
          setStatus(v);
          setPage(0);
        }}
        statusOptions={businessStatusOptions}
        lgaValue={lga}
        onLgaChange={(v) => {
          setLga(v);
          setPage(0);
        }}
        lgaOptions={lgas}
        onFilterClick={() => setPage(0)}
        onResetClick={resetFilters}
      />

      {/* Table + Pagination container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          bgcolor: "white",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <BusinessTable
          rows={paginatedRows}
          categories={businessAdminCategories}
          categoryMap={categoryMap}
          page={page}
          pageSize={pageSize}
          rowCount={totalCount}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(0);
          }}
          onView={(row) => notify("info", `Viewing business: ${row.businessName}`)}
          onEdit={(row) => notify("info", `Edit business: ${row.businessName}`)}
          onApprove={(row) => notify("success", `Approved: ${row.businessName}`)}
          onReject={(row) => notify("error", `Rejected: ${row.businessName}`)}
          onSuspend={(row) => notify("warning", `Suspended: ${row.businessName}`)}
          onDelete={(row) => notify("error", `Deleted: ${row.businessName}`)}
          onDownloadCert={(row) => notify("success", `Downloading certificate for ${row.businessName}`)}
          onViewDocs={(row) => notify("info", `Opening documents for ${row.businessName}`)}
          onBulkApprove={(ids) => notify("success", `Approved ${ids.length} business(es).`)}
          onBulkReject={(ids) => notify("error", `Rejected ${ids.length} business(es).`)}
          onBulkDelete={(ids) => notify("error", `Deleted ${ids.length} business(es).`)}
        />

        <Pagination
          page={page + 1}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          itemLabel="businesses"
          onPageChange={(oneBased) => setPage(oneBased - 1)}
          onRowsPerPageChange={(size) => {
            setPageSize(size);
            setPage(0);
          }}
        />
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
            fontWeight: 550,
            fontSize: 13,
          }}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

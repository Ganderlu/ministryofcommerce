"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import CooperativeStatistics from "@/components/admin/CooperativeStatistics";
import CooperativeFilters from "@/components/admin/CooperativeFilters";
import CooperativeTable from "@/components/admin/CooperativeTable";
import ExportButton from "@/components/admin/ExportButton";
import RegisterCooperativeButton from "@/components/admin/RegisterCooperativeButton";
import Pagination from "@/components/admin/Pagination";
import {
  cooperativeAdminCategories,
  cooperativeStatusOptions,
  lgas,
} from "@/data/seed";
import type { CooperativeRow, RegistrationCategory, CooperativeCategoryItem } from "@/types";
import { updateApplicationStatus, COLLECTION_KEYS } from "@/lib/admin-actions";

const MotionBox = motion(Box);

interface CooperativesPageClientProps {
  initialRows: CooperativeRow[];
}

export default function CooperativesPageClient({ initialRows }: CooperativesPageClientProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [lgaValue, setLgaValue] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState<CooperativeRow[]>(initialRows);
  const [snack, setSnack] = useState<{
    open: boolean;
    severity: "success" | "info" | "warning" | "error";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const categoryMap = useMemo<Record<string, CooperativeCategoryItem>>(() => {
    const m: Record<string, CooperativeCategoryItem> = {};
    cooperativeAdminCategories.forEach((c) => {
      m[c.name] = c;
      m[c.id] = c;
    });
    return m;
  }, []);

  const notify = (
    severity: "success" | "info" | "warning" | "error",
    message: string
  ) => setSnack({ open: true, severity, message });

  const lgaOptions = useMemo(
    () => lgas.map((l: RegistrationCategory) => ({ id: l.id, name: l.name })),
    []
  );
  const catOptions = useMemo(
    () => cooperativeAdminCategories.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const filteredRows = useMemo<CooperativeRow[]>(() => {
    let r = rows;
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      r = r.filter(
        (row) =>
          row.cooperativeName.toLowerCase().includes(q) ||
          row.registrationNumber.toLowerCase().includes(q) ||
          row.chairmanName.toLowerCase().includes(q) ||
          row.chairmanEmail.toLowerCase().includes(q)
      );
    }
    if (categoryValue) {
      r = r.filter(
        (row) => row.categoryName === categoryValue || row.categoryId === categoryValue
      );
    }
    if (statusValue) r = r.filter((row) => row.status === statusValue);
    if (lgaValue) r = r.filter((row) => row.lga === lgaValue);
    return r;
  }, [rows, searchValue, categoryValue, statusValue, lgaValue]);

  const totalCount = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginatedRows = useMemo<CooperativeRow[]>(() => {
    const start = page * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleStatus = useCallback(
    async (row: CooperativeRow, status: CooperativeRow["status"]) => {
      const prev = rows;
      setRows((rs) =>
        rs.map((r) => (r.id === row.id ? { ...r, status } : r))
      );
      try {
        await updateApplicationStatus({
          collection: COLLECTION_KEYS.cooperatives,
          id: row.id,
          status,
        });
        notify("success", `${row.cooperativeName} → ${status}`);
      } catch (err) {
        setRows(prev);
        notify(
          "error",
          err instanceof Error ? err.message : "Failed to update status"
        );
      }
    },
    [rows]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.6 }}>
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 22, sm: 26, md: 28 },
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: -0.4,
              lineHeight: 1.1,
            }}
          >
            Cooperatives Management Module
          </Typography>
          <Typography
            sx={{
              mt: 0.8,
              fontSize: 14,
              color: "#64748B",
              fontWeight: 450,
              maxWidth: 620,
              lineHeight: 1.55,
            }}
          >
            Manage, monitor and oversee all registered cooperatives in the system.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <ExportButton />
          <RegisterCooperativeButton href="/admin/cooperatives/new" />
        </Stack>
      </MotionBox>

      <CooperativeStatistics rows={rows} />

      <CooperativeFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        categoryValue={categoryValue}
        onCategoryChange={(v) => { setCategoryValue(v); setPage(0); }}
        categoryOptions={catOptions}
        statusValue={statusValue}
        onStatusChange={(v) => { setStatusValue(v); setPage(0); }}
        statusOptions={cooperativeStatusOptions}
        lgaValue={lgaValue}
        onLgaChange={(v) => { setLgaValue(v); setPage(0); }}
        lgaOptions={lgaOptions}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFDF5",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
        }}
      >
        <CooperativeTable
          rows={paginatedRows}
          rowCount={totalCount}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(n) => { setPageSize(n); setPage(0); }}
          categories={cooperativeAdminCategories}
          loading={false}
          onView={(row) => notify("info", `Viewing: ${row.cooperativeName}`)}
          onApprove={(row) => handleStatus(row, "Approved")}
          onReject={(row) => handleStatus(row, "Rejected")}
          onSuspend={(row) => handleStatus(row, "Suspended")}
          onDelete={(row) =>
            notify("warning", `Delete is disabled for data integrity: ${row.cooperativeName}`)
          }
        />

        <Pagination
          page={page + 1}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          itemLabel="cooperatives"
          onPageChange={(oneBased) => setPage(oneBased - 1)}
          onRowsPerPageChange={(size) => { setPageSize(size); setPage(0); }}
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

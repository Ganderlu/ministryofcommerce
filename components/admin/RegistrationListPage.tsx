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
import BusinessStatistics from "@/components/admin/BusinessStatistics";
import BusinessFilters from "@/components/admin/BusinessFilters";
import BusinessTable from "@/components/admin/BusinessTable";
import ExportButton from "@/components/admin/ExportButton";
import Pagination from "@/components/admin/Pagination";
import {
  businessAdminCategories,
  businessStatusOptions,
  lgas,
} from "@/data/seed";
import type { BusinessRow, BusinessCategoryItem } from "@/types";
import { updateApplicationStatus, type AdminCollection } from "@/lib/admin-actions";

const MotionBox = motion(Box);

interface RegistrationListPageProps {
  initialRows: BusinessRow[];
  collection: AdminCollection;
  title: string;
  subtitle: string;
}

export default function RegistrationListPage({
  initialRows,
  collection,
  title,
  subtitle,
}: RegistrationListPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [lga, setLga] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState<BusinessRow[]>(initialRows);
  const [snack, setSnack] = useState<{
    open: boolean;
    severity: "success" | "info" | "warning" | "error";
    message: string;
  }>({ open: false, severity: "info", message: "" });

  const categoryMap = useMemo<Record<string, BusinessCategoryItem>>(() => {
    const m: Record<string, BusinessCategoryItem> = {};
    businessAdminCategories.forEach((c) => {
      m[c.name] = c;
      m[c.id] = c;
    });
    return m;
  }, []);

  const notify = (
    severity: "success" | "info" | "warning" | "error",
    message: string
  ) => setSnack({ open: true, severity, message });

  const categorySelectOptions = useMemo(
    () => businessAdminCategories.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const filteredRows = useMemo<BusinessRow[]>(() => {
    let r = rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (row) =>
          row.businessName.toLowerCase().includes(q) ||
          row.applicationNumber.toLowerCase().includes(q) ||
          row.ownerName.toLowerCase().includes(q) ||
          row.ownerEmail.toLowerCase().includes(q)
      );
    }
    if (category) {
      r = r.filter(
        (row) => row.categoryName === category || row.categoryId === category
      );
    }
    if (status) r = r.filter((row) => row.status === status);
    if (lga) r = r.filter((row) => row.lga === lga);
    return r;
  }, [rows, search, category, status, lga]);

  const totalCount = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginatedRows = useMemo<BusinessRow[]>(() => {
    const start = page * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleStatus = useCallback(
    async (row: BusinessRow, newStatus: BusinessRow["status"]) => {
      const prev = rows;
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r)));
      try {
        await updateApplicationStatus({ collection, id: row.id, status: newStatus });
        notify("success", `${row.businessName} → ${newStatus}`);
      } catch (err) {
        setRows(prev);
        notify("error", err instanceof Error ? err.message : "Failed to update status");
      }
    },
    [rows, collection]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.6 }}>
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04 }}
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
            {title}
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
            {subtitle}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <ExportButton />
        </Stack>
      </MotionBox>

      <BusinessStatistics rows={rows} />

      <BusinessFilters
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(0)}
        categoryValue={category}
        onCategoryChange={(v) => { setCategory(v); setPage(0); }}
        categoryOptions={categorySelectOptions}
        statusValue={status}
        onStatusChange={(v) => { setStatus(v); setPage(0); }}
        statusOptions={businessStatusOptions}
        lgaValue={lga}
        onLgaChange={(v) => { setLga(v); setPage(0); }}
        lgaOptions={lgas}
        onFilterClick={() => setPage(0)}
        onResetClick={() => {
          setSearch(""); setCategory(""); setStatus(""); setLga(""); setPage(0);
          notify("info", "Filters have been reset.");
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          bgcolor: "#FFFDF5",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
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
          onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
          onView={(row) => notify("info", `Viewing: ${row.businessName}`)}
          onEdit={(row) => notify("info", `Edit: ${row.businessName}`)}
          onApprove={(row) => handleStatus(row, "Approved")}
          onReject={(row) => handleStatus(row, "Rejected")}
          onSuspend={(row) => handleStatus(row, "Suspended")}
          onDelete={(row) =>
            notify("warning", `Delete is disabled for data integrity: ${row.businessName}`)
          }
          onDownloadCert={(row) =>
            notify("success", `Downloading certificate for ${row.businessName}`)
          }
          onViewDocs={(row) =>
            notify("info", `Opening documents for ${row.businessName}`)
          }
          onBulkApprove={(ids) => notify("success", "Approved " + ids.length + " record(s).")}
          onBulkReject={(ids) => notify("error", "Rejected " + ids.length + " record(s).")}
          onBulkDelete={(ids) =>
            notify("warning", "Bulk delete is disabled for " + ids.length + " record(s).")
          }
        />

        <Pagination
          page={page + 1}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          itemLabel="records"
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

"use client";

import React, { useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Box, Avatar, Typography, Chip, Stack, IconButton, Button, Divider, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Computer as ICTIcon,
  Agriculture as AgricultureIcon,
  Construction as ConstructionIcon,
  Storefront as RetailIcon,
  Diversity3 as CooperativeIcon,
  Fastfood as FoodIcon,
  DirectionsCar as TransportIcon,
  LocalShipping as LogisticsIcon,
  Grid3x3 as GenericIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import type { BusinessRow, BusinessStatus, BusinessCategoryItem } from "@/types";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

const MotionBox = motion(Box);

const categoryIconMap: Record<string, React.ComponentType<any>> = {
  ICT: ICTIcon,
  Agriculture: AgricultureIcon,
  Construction: ConstructionIcon,
  Retail: RetailIcon,
  Cooperative: CooperativeIcon,
  "Food & Beverage": FoodIcon,
  Transport: TransportIcon,
  Logistics: LogisticsIcon,
};

export function getCategoryIcon(name: string) {
  return categoryIconMap[name] || GenericIcon;
}

interface CustomToolbarProps {
  selectedCount: number;
  onBulkApprove?: () => void;
  onBulkReject?: () => void;
  onBulkDelete?: () => void;
}

function CustomToolbar({ selectedCount, onBulkApprove, onBulkReject, onBulkDelete }: CustomToolbarProps) {
  if (selectedCount === 0) {
    return (
      <GridToolbarContainer sx={{ p: 1, gap: 0.5, borderBottom: "1px solid #F1F5F9" }}>
        <Box sx={{ "& .MuiButton-root": { fontSize: 12, color: "#64748B", borderRadius: "10px" } }}>
          <GridToolbarColumnsButton />
        </Box>
        <Box sx={{ "& .MuiButton-root": { fontSize: 12, color: "#64748B", borderRadius: "10px" } }}>
          <GridToolbarFilterButton />
        </Box>
        <Box sx={{ "& .MuiButton-root": { fontSize: 12, color: "#64748B", borderRadius: "10px" } }}>
          <GridToolbarDensitySelector />
        </Box>
      </GridToolbarContainer>
    );
  }
  return (
    <GridToolbarContainer
      sx={{
        p: 1.4,
        gap: 1,
        borderBottom: "1px solid #F1F5F9",
        bgcolor: alpha("#0B6B3A", 0.05),
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 13, fontWeight: 650, color: "#0B6B3A" }}>
        {selectedCount} selected
      </Typography>
      <Box sx={{ flex: 1 }} />
      <Button
        size="small"
        startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        onClick={onBulkApprove}
        sx={{
          color: "#16A34A",
          bgcolor: "rgba(22,163,74,0.08)",
          fontWeight: 650,
          borderRadius: "10px",
          px: 1.4,
          fontSize: 12,
          "&:hover": { bgcolor: "rgba(22,163,74,0.16)" },
        }}
      >
        Approve
      </Button>
      <Button
        size="small"
        startIcon={<CancelIcon sx={{ fontSize: 16 }} />}
        onClick={onBulkReject}
        sx={{
          color: "#DC2626",
          bgcolor: "rgba(220,38,38,0.08)",
          fontWeight: 650,
          borderRadius: "10px",
          px: 1.4,
          fontSize: 12,
          "&:hover": { bgcolor: "rgba(220,38,38,0.16)" },
        }}
      >
        Reject
      </Button>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: "#CBD5E1" }} />
      <Button
        size="small"
        startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
        onClick={onBulkDelete}
        sx={{
          color: "#64748B",
          fontWeight: 650,
          borderRadius: "10px",
          px: 1.4,
          fontSize: 12,
          border: "1px solid #E2E8F0",
          "&:hover": { bgcolor: "#F8FAFC", color: "#DC2626", borderColor: "#DC2626" },
        }}
      >
        Delete
      </Button>
    </GridToolbarContainer>
  );
}

interface BusinessTableProps {
  rows: BusinessRow[];
  categories: BusinessCategoryItem[];
  categoryMap: Record<string, BusinessCategoryItem>;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowCount: number;
  loading?: boolean;
  onView?: (row: BusinessRow) => void;
  onEdit?: (row: BusinessRow) => void;
  onApprove?: (row: BusinessRow) => void;
  onReject?: (row: BusinessRow) => void;
  onSuspend?: (row: BusinessRow) => void;
  onDelete?: (row: BusinessRow) => void;
  onDownloadCert?: (row: BusinessRow) => void;
  onViewDocs?: (row: BusinessRow) => void;
  onBulkApprove?: (ids: string[]) => void;
  onBulkReject?: (ids: string[]) => void;
  onBulkDelete?: (ids: string[]) => void;
}

export default function BusinessTable(props: BusinessTableProps) {
  const {
    rows,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    rowCount,
    loading,
    categories,
    categoryMap,
    onView,
    onEdit,
    onApprove,
    onReject,
    onSuspend,
    onDelete,
    onDownloadCert,
    onViewDocs,
    onBulkApprove,
    onBulkReject,
    onBulkDelete,
  } = props;

  const [selectionModel, setSelectionModel] = useState<{ type: "include" | "exclude"; ids: Set<string> }>({
    type: "include",
    ids: new Set<string>(),
  });

  const catColor = (name: string) => categoryMap[name]?.color || "#64748B";

  const columns = useMemo<GridColDef<BusinessRow>[]>(
    () => [
      {
        field: "business",
        headerName: "Business Name",
        flex: 1.5,
        minWidth: 260,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Business
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => {
          const row = params.row;
          const Icon = BusinessIcon;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, py: 0.8 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  bgcolor: `${row.logoColor}18`,
                  color: row.logoColor,
                  border: `1px solid ${row.logoColor}30`,
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 650, color: "#1E293B", lineHeight: 1.15 }}>
                  {row.businessName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: "#94A3B8",
                    fontWeight: 500,
                    mt: 0.3,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    letterSpacing: 0.2,
                  }}
                >
                  {row.applicationNumber}
                </Typography>
              </Box>
            </Box>
          );
        },
      },
      {
        field: "owner",
        headerName: "Owner / Contact",
        flex: 1.5,
        minWidth: 260,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Owner / Contact
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => {
          const row = params.row;
          return (
            <Box sx={{ py: 0.8 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.4 }}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#F1F5F9",
                    color: "#64748B",
                    fontWeight: 700,
                    fontSize: 12,
                    border: "1px solid #E2E8F0",
                  }}
                >
                  {row.ownerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </Avatar>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1E293B", lineHeight: 1.1 }}>
                  {row.ownerName}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={0.8}
                alignItems="center"
                sx={{ ml: 0.5, fontSize: 11.5, color: "#64748B", fontWeight: 450, lineHeight: 1.4 }}
              >
                <EmailIcon sx={{ fontSize: 12, color: "#94A3B8" }} />
                <Typography sx={{ fontSize: 11.5, color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 170 }}>
                  {row.ownerEmail}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.8} alignItems="center" sx={{ ml: 0.5, mt: 0.3, fontSize: 11.5, color: "#64748B", fontWeight: 450 }}>
                <PhoneIcon sx={{ fontSize: 12, color: "#94A3B8" }} />
                <Typography sx={{ fontSize: 11.5, color: "#64748B" }}>{row.ownerPhone}</Typography>
              </Stack>
            </Box>
          );
        },
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1,
        minWidth: 170,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Category
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => {
          const name = params.row.categoryName;
          const color = catColor(name);
          const Icon = getCategoryIcon(name);
          return (
            <Box sx={{ py: 0.8 }}>
              <Chip
                size="small"
                icon={<Icon sx={{ fontSize: 14 }} />}
                label={name}
                sx={{
                  fontWeight: 600,
                  fontSize: 12,
                  bgcolor: `${color}14`,
                  color,
                  border: `1px solid ${color}28`,
                  borderRadius: "999px",
                  px: 0.6,
                  height: 28,
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />
            </Box>
          );
        },
      },
      {
        field: "lga",
        headerName: "LGA",
        flex: 0.8,
        minWidth: 130,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            LGA
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => (
          <Typography sx={{ fontSize: 12.8, color: "#475569", fontWeight: 500 }}>
            {params.row.lga}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.8,
        minWidth: 140,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Status
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => (
          <Box sx={{ py: 0.8 }}>
            <StatusBadge status={params.row.status as BusinessStatus} />
          </Box>
        ),
      },
      {
        field: "registeredOn",
        headerName: "Registered On",
        flex: 0.9,
        minWidth: 150,
        sortable: true,
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Registered On
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => (
          <Box sx={{ py: 0.8 }}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#334155", lineHeight: 1.15 }}>
              {params.row.registeredOnDate}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, mt: 0.3 }}>
              {params.row.registeredOnTime}
            </Typography>
          </Box>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 140,
        sortable: false,
        align: "right",
        renderHeader: (p) => (
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: 0.3, textTransform: "uppercase" }}>
            Actions
          </Typography>
        ),
        renderCell: (params: GridRenderCellParams<BusinessRow>) => {
          const row = params.row;
          return (
            <Box sx={{ display: "flex", justifyContent: "flex-end", py: 0.8 }}>
              <ActionMenu
                size="small"
                onView={() => onView?.(row)}
                onEdit={() => onEdit?.(row)}
                onApprove={() => onApprove?.(row)}
                onReject={() => onReject?.(row)}
                onSuspend={() => onSuspend?.(row)}
                onDelete={() => onDelete?.(row)}
                onDownloadCert={() => onDownloadCert?.(row)}
                onViewDocs={() => onViewDocs?.(row)}
              />
            </Box>
          );
        },
      },
    ],
    [categoryMap, onApprove, onDelete, onDownloadCert, onEdit, onReject, onSuspend, onView, onViewDocs]
  );

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18 }}
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.04)",
        overflow: "hidden",
        "& .MuiDataGrid-root": {
          border: "none",
          color: "#1E293B",
          fontFamily: "'Poppins','Nunito','Inter',system-ui,sans-serif",
        },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
        },
        "& .MuiDataGrid-columnHeader": {
          outline: "none !important",
        },
        "& .MuiDataGrid-virtualScroller": {
          bgcolor: "white",
        },
        "& .MuiDataGrid-row": {
          borderBottom: "1px solid #F1F5F9",
          transition: "background-color 0.15s",
          "&:hover": {
            bgcolor: "#FAFBFC",
          },
          "&.Mui-selected": {
            bgcolor: "rgba(11,107,58,0.06) !important",
          },
          "&.Mui-selected:hover": {
            bgcolor: "rgba(11,107,58,0.10) !important",
          },
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          outline: "none !important",
          px: 2,
        },
        "& .MuiDataGrid-checkboxInput": {
          color: "#94A3B8",
          "&.Mui-checked": {
            color: "#0B6B3A",
          },
        },
        "& .MuiDataGrid-footerContainer": {
          display: "none",
        },
        "& .MuiDataGrid-overlayWrapper": {
          minHeight: 280,
        },
        "& .MuiDataGrid-overlay": {
          color: "#94A3B8",
        },
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        checkboxSelection
        pagination
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          if (model.page !== page) onPageChange(model.page);
          if (model.pageSize !== pageSize) onPageSizeChange(model.pageSize);
        }}
        rowCount={rowCount}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        density="standard"
        sortingOrder={["asc", "desc"]}
        disableColumnMenu={false}
        slots={{
          toolbar: () => (
            <CustomToolbar
              selectedCount={selectionModel.ids.size}
              onBulkApprove={() => onBulkApprove?.(Array.from(selectionModel.ids))}
              onBulkReject={() => onBulkReject?.(Array.from(selectionModel.ids))}
              onBulkDelete={() => onBulkDelete?.(Array.from(selectionModel.ids))}
            />
          ),
        }}
        onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection as { type: "include" | "exclude"; ids: Set<string> })}
        rowSelectionModel={selectionModel}
        sx={{ minHeight: 620, "& .MuiDataGrid-columnHeaders": { minHeight: "56px !important" }, "& .MuiDataGrid-row": { minHeight: "72px !important" } }}
      />
    </MotionBox>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, Avatar, Typography, Chip, Stack, IconButton, Button, Divider, Tooltip } from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Agriculture as LocalAgriculture,
  Business,
  Diversity3,
  EmojiPeople,
  ShoppingCart,
  DashboardCustomize,
  DirectionsCar,
  Build,
} from "@mui/icons-material";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import type { CooperativeRow, CooperativeStatus, CooperativeCategoryItem } from "@/types";

interface CooperativeTableProps {
  rows: CooperativeRow[];
  loading?: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  categories: CooperativeCategoryItem[];
  onView?: (row: CooperativeRow) => void;
  onEdit?: (row: CooperativeRow) => void;
  onApprove?: (row: CooperativeRow) => void;
  onReject?: (row: CooperativeRow) => void;
  onSuspend?: (row: CooperativeRow) => void;
  onDelete?: (row: CooperativeRow) => void;
  onBulkApprove?: (ids: string[]) => void;
  onBulkReject?: (ids: string[]) => void;
  onBulkDelete?: (ids: string[]) => void;
}

const categoryIconMap: Record<string, React.ComponentType<any>> = {
  Agriculture: LocalAgriculture,
  Business: Business,
  Cooperative: Diversity3,
  Youth: EmojiPeople,
  Trade: ShoppingCart,
  Multipurpose: DashboardCustomize,
  Transport: DirectionsCar,
  Artisan: Build,
};

function CooperativeNameCell({ row }: { row: CooperativeRow }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
      <Avatar
        sx={{
          width: 44,
          height: 44,
          borderRadius: "12px",
          bgcolor: `${row.logoColor}18`,
          color: row.logoColor,
          fontWeight: 800,
          fontSize: 18,
          border: `1px solid ${row.logoColor}30`,
          flexShrink: 0,
        }}
      >
        <Diversity3 sx={{ fontSize: 22 }} />
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 700,
            color: "#1E293B",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.cooperativeName}
        </Typography>
        <Typography
          sx={{
            fontSize: 11.5,
            color: "#64748B",
            fontWeight: 500,
            mt: 0.35,
            letterSpacing: 0.2,
          }}
        >
          {row.registrationNumber}
        </Typography>
      </Box>
    </Box>
  );
}

function ChairmanContactCell({ row }: { row: CooperativeRow }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#1E293B",
          lineHeight: 1.2,
        }}
      >
        {row.chairmanName}
      </Typography>
      <Typography
        sx={{
          fontSize: 11.5,
          color: "#64748B",
          fontWeight: 500,
          mt: 0.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {row.chairmanEmail}
      </Typography>
      <Typography
        sx={{
          fontSize: 11.5,
          color: "#64748B",
          fontWeight: 500,
          mt: 0.15,
          letterSpacing: 0.1,
        }}
      >
        {row.chairmanPhone}
      </Typography>
    </Box>
  );
}

function CategoryCell({
  row,
  categories,
}: {
  row: CooperativeRow;
  categories: CooperativeCategoryItem[];
}) {
  const cat = categories.find((c) => c.id === row.categoryId) || {
    id: row.categoryId,
    name: row.categoryName,
    color: "#64748B",
    icon: "Dashboard",
  };
  const IconComp =
    categoryIconMap[row.categoryName] ||
    categoryIconMap[cat.name] ||
    DashboardCustomize;
  const color = cat.color;

  return (
    <Chip
      icon={
        <IconComp
          sx={{
            fontSize: 14,
            ml: 0.4,
            color: color,
          }}
        />
      }
      label={row.categoryName}
      size="small"
      sx={{
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: 12,
        bgcolor: `${color}12`,
        color: color,
        border: `1px solid ${color}30`,
        px: 0.6,
        py: 0.2,
        "& .MuiChip-icon": { ml: 0.6 },
        "& .MuiChip-label": { px: 0.5, py: 0 },
      }}
    />
  );
}

function StatusCell({ row }: { row: CooperativeRow }) {
  return <StatusBadge status={row.status as CooperativeStatus} size="small" />;
}

function RegisteredOnCell({ row }: { row: CooperativeRow }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12.5,
          color: "#1E293B",
          fontWeight: 600,
          lineHeight: 1.25,
        }}
      >
        {row.registeredOnDate}
      </Typography>
      <Typography
        sx={{
          fontSize: 11.5,
          color: "#64748B",
          fontWeight: 500,
          mt: 0.3,
        }}
      >
        {row.registeredOnTime}
      </Typography>
    </Box>
  );
}

function ActionsCell({
  row,
  actions,
}: {
  row: CooperativeRow;
  actions: CooperativeTableProps;
}) {
  return (
    <ActionMenu
      size="small"
      onView={() => actions.onView?.(row)}
      onEdit={() => actions.onEdit?.(row)}
      onApprove={() => actions.onApprove?.(row)}
      onReject={() => actions.onReject?.(row)}
      onSuspend={() => actions.onSuspend?.(row)}
      onDelete={() => actions.onDelete?.(row)}
      onDownloadCert={() => actions.onView?.(row)}
      onViewDocs={() => actions.onView?.(row)}
    />
  );
}

interface CustomToolbarProps {
  selectedCount: number;
  onBulkApprove?: () => void;
  onBulkReject?: () => void;
  onBulkDelete?: () => void;
}

function CustomToolbar({
  selectedCount,
  onBulkApprove,
  onBulkReject,
  onBulkDelete,
}: CustomToolbarProps) {
  if (selectedCount === 0) {
    return (
      <GridToolbarContainer
        sx={{
          p: 1,
          gap: 0.5,
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <Box
          sx={{
            "& .MuiButton-root": {
              fontSize: 12,
              color: "#64748B",
              borderRadius: "10px",
            },
          }}
        >
          <GridToolbarColumnsButton />
        </Box>
        <Box
          sx={{
            "& .MuiButton-root": {
              fontSize: 12,
              color: "#64748B",
              borderRadius: "10px",
            },
          }}
        >
          <GridToolbarFilterButton />
        </Box>
        <Box
          sx={{
            "& .MuiButton-root": {
              fontSize: 12,
              color: "#64748B",
              borderRadius: "10px",
            },
          }}
        >
          <GridToolbarDensitySelector />
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <GridToolbarContainer
      sx={{
        p: 1.2,
        gap: 1,
        borderBottom: "1px solid #F1F5F9",
        bgcolor: "#F8FAFC",
      }}
    >
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 700,
          color: "#1E293B",
          mr: 1,
        }}
      >
        {selectedCount} selected
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Tooltip title="Bulk Approve">
        <Button
          size="small"
          startIcon={<CheckIcon sx={{ fontSize: 14 }} />}
          onClick={onBulkApprove}
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#16A34A",
            bgcolor: "rgba(22,163,74,0.08)",
            borderRadius: "10px",
            px: 1.2,
            "&:hover": {
              bgcolor: "rgba(22,163,74,0.16)",
            },
          }}
        >
          Approve
        </Button>
      </Tooltip>
      <Tooltip title="Bulk Reject">
        <Button
          size="small"
          startIcon={<CloseIcon sx={{ fontSize: 14 }} />}
          onClick={onBulkReject}
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#DC2626",
            bgcolor: "rgba(220,38,38,0.08)",
            borderRadius: "10px",
            px: 1.2,
            "&:hover": {
              bgcolor: "rgba(220,38,38,0.16)",
            },
          }}
        >
          Reject
        </Button>
      </Tooltip>
      <Tooltip title="Bulk Delete">
        <Button
          size="small"
          startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
          onClick={onBulkDelete}
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#DC2626",
            bgcolor: "rgba(220,38,38,0.05)",
            borderRadius: "10px",
            px: 1.2,
            ml: "auto",
            "&:hover": {
              bgcolor: "rgba(220,38,38,0.12)",
            },
          }}
        >
          Delete
        </Button>
      </Tooltip>
    </GridToolbarContainer>
  );
}

export default function CooperativeTable(props: CooperativeTableProps) {
  const {
    rows,
    loading = false,
    rowCount,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    categories,
  } = props;

  const [selectionModel, setSelectionModel] = useState<{
    type: "include" | "exclude";
    ids: Set<string>;
  }>({
    type: "include",
    ids: new Set<string>(),
  });

  const columns: GridColDef<CooperativeRow>[] = useMemo(
    () => [
      {
        field: "cooperativeName",
        headerName: "Cooperative Name",
        minWidth: 280,
        flex: 1.6,
        headerAlign: "left",
        align: "left",
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => <CooperativeNameCell row={row} />,
        sortable: true,
        filterable: true,
      },
      {
        field: "chairmanName",
        headerName: "Chairman / Contact",
        minWidth: 240,
        flex: 1.6,
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => <ChairmanContactCell row={row} />,
        sortable: true,
        filterable: true,
      },
      {
        field: "categoryName",
        headerName: "Category",
        minWidth: 150,
        flex: 0.9,
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => (
          <CategoryCell row={row} categories={categories} />
        ),
        sortable: true,
        filterable: true,
      },
      {
        field: "lga",
        headerName: "LGA",
        minWidth: 140,
        flex: 0.8,
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => (
          <Typography
            sx={{
              fontSize: 12.5,
              color: "#1E293B",
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            {row.lga}
          </Typography>
        ),
        sortable: true,
        filterable: true,
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.8,
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => <StatusCell row={row} />,
        sortable: true,
        filterable: true,
      },
      {
        field: "registeredOnDate",
        headerName: "Registered On",
        minWidth: 150,
        flex: 0.9,
        headerClassName: "cooperative-grid-header",
        renderCell: ({ row }) => <RegisteredOnCell row={row} />,
        sortable: true,
        filterable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        flex: 0.7,
        headerClassName: "cooperative-grid-header",
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => <ActionsCell row={row} actions={props} />,
      },
    ],
    [categories, props]
  );

  return (
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
            onBulkApprove={() => props.onBulkApprove?.(Array.from(selectionModel.ids))}
            onBulkReject={() => props.onBulkReject?.(Array.from(selectionModel.ids))}
            onBulkDelete={() => props.onBulkDelete?.(Array.from(selectionModel.ids))}
          />
        ),
      }}
      onRowSelectionModelChange={(newSelection) =>
        setSelectionModel(
          newSelection as { type: "include" | "exclude"; ids: Set<string> }
        )
      }
      rowSelectionModel={
        selectionModel as unknown as GridRowSelectionModel
      }
      sx={{
        minHeight: 620,
        "& .cooperative-grid-header": {
          bgcolor: "#F8FAFC",
          color: "#1E293B",
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: 0.1,
          borderBottom: "1px solid #E2E8F0",
        },
        "& .MuiDataGrid-columnHeaders": { minHeight: "56px !important" },
        "& .MuiDataGrid-row": { minHeight: "72px !important" },
        "& .MuiDataGrid-row:hover": {
          bgcolor: "#F8FAFC",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #F1F5F9",
        },
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "white",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    />
  );
}

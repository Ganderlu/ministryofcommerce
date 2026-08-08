"use client";

import React from "react";
import { Box, Typography, Select, MenuItem, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (p: number) => void;
  onRowsPerPageChange?: (n: number) => void;
  itemLabel?: string;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
  itemLabel = "items",
}: Props) {
  const start = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | "dots")[] => {
    const pages: (number | "dots")[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const firstPage = 1;
    const lastPage = totalPages;

    let left = Math.max(1, page - 1);
    let right = Math.min(totalPages, page + 1);

    if (left === firstPage + 1) left = firstPage;
    if (right === lastPage - 1) right = lastPage;

    pages.push(firstPage);

    if (left > firstPage + 1) {
      pages.push("dots");
    }

    for (let i = left; i <= right; i++) {
      if (i !== firstPage && i !== lastPage) pages.push(i);
    }

    if (right < lastPage - 1) {
      pages.push("dots");
    }

    if (lastPage !== firstPage) pages.push(lastPage);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderTop: "1px solid #F1F5F9",
        flexWrap: "wrap",
        rowGap: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: 12.5,
          color: "#64748B",
          fontWeight: 500,
        }}
      >
        Showing {start} to {end} of {totalItems} {itemLabel}
      </Typography>

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            sx={{
              fontSize: 12.5,
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            Rows per page:
          </Typography>
          <Select
            size="small"
            value={itemsPerPage}
            onChange={(e) => {
              const newVal = e.target.value as number;
              onRowsPerPageChange?.(newVal);
              onPageChange(1);
            }}
            sx={{
              height: 36,
              borderRadius: "10px",
              ".MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
                borderColor: "#E2E8F0",
              },
              fontSize: 12.5,
              color: "#1E293B",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0B6B3A",
                borderWidth: 1,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#CBD5E1",
              },
            }}
          >
            {rowsPerPageOptions.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: 12.5 }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack direction="row" spacing={0.6} alignItems="center">
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            sx={{
              minWidth: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: page === 1 ? "#F8FAFC" : "white",
              border: "1px solid #E2E8F0",
              color: page === 1 ? "#CBD5E1" : "#64748B",
              "&:hover": {
                bgcolor: page === 1 ? "#F8FAFC" : "#F8FAFC",
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: 18 }} />
          </IconButton>

          {pages.map((p, idx) =>
            p === "dots" ? (
              <Typography
                key={`dots-${idx}`}
                sx={{
                  px: 0.8,
                  color: "#94A3B8",
                  fontSize: 13,
                }}
              >
                …
              </Typography>
            ) : (
              <IconButton
                key={p}
                size="small"
                onClick={() => onPageChange(p)}
                sx={{
                  minWidth: 38,
                  height: 38,
                  borderRadius: "10px",
                  fontSize: 13,
                  fontWeight: 650,
                  px: 1,
                  bgcolor: p === page ? "#0B6B3A" : "white",
                  color: p === page ? "white" : "#64748B",
                  border:
                    p === page
                      ? "1px solid #0B6B3A"
                      : "1px solid #E2E8F0",
                  "&:hover": {
                    bgcolor: p === page ? "#084C2E" : "#F8FAFC",
                  },
                }}
              >
                {p}
              </IconButton>
            )
          )}

          <IconButton
            size="small"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange(page + 1)}
            sx={{
              minWidth: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: page === totalPages || totalPages === 0 ? "#F8FAFC" : "white",
              border: "1px solid #E2E8F0",
              color:
                page === totalPages || totalPages === 0 ? "#CBD5E1" : "#64748B",
              "&:hover": {
                bgcolor:
                  page === totalPages || totalPages === 0 ? "#F8FAFC" : "#F8FAFC",
              },
            }}
          >
            <ChevronRight sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

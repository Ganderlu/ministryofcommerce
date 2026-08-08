"use client";

import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchFieldProps {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  sx?: any;
  fullWidth?: boolean;
  size?: "small" | "medium";
}

export default function SearchField({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  sx,
  fullWidth = false,
  size = "medium",
}: SearchFieldProps) {
  const height = size === "small" ? 38 : 44;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        ...sx,
      }}
    >
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        variant="outlined"
        size={size}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "#64748B",
                  fontSize: size === "small" ? 18 : 20,
                }}
              />
            </InputAdornment>
          ),
          endAdornment: onSearch ? (
            <InputAdornment position="end">
              <IconButton
                onClick={onSearch}
                edge="end"
                sx={{
                  color: "#0B6B3A",
                  p: size === "small" ? 0.5 : 0.75,
                  "&:hover": {
                    bgcolor: "rgba(11, 107, 58, 0.08)",
                  },
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: size === "small" ? 18 : 20,
                  }}
                />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            fontSize: 13.5,
            height: height,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#CBD5E1",
            },
            "&.Mui-focused": {
              borderColor: "#0B6B3A",
              boxShadow: "0 0 0 2px rgba(11, 107, 58, 0.25)",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            fontSize: 13.5,
            py: size === "small" ? 0.5 : 1,
            color: "#1E293B",
            "&::placeholder": {
              color: "#94A3B8",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}

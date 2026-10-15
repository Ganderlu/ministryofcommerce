"use client";

import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchFieldProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  sx?: any;
  fullWidth?: boolean;
  size?: "small" | "medium";
  hideLabel?: boolean;
}

export default function SearchField({
  placeholder = "Search...",
  label = "Search",
  value,
  onChange,
  onSearch,
  sx,
  fullWidth = false,
  size = "medium",
  hideLabel = true,
}: SearchFieldProps) {
  const height = size === "small" ? 38 : 44;
  const inputId = React.useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && onSearch) {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <Box
      role="search"
      sx={{
        width: fullWidth ? "100%" : "auto",
        ...sx,
      }}
    >
      <TextField
        id={inputId}
        label={hideLabel ? undefined : label}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        variant="outlined"
        size={size}
        InputProps={{
          "aria-describedby": onSearch ? `${inputId}-submit` : undefined,
          startAdornment: (
            <InputAdornment position="start" aria-hidden="true">
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
                id={`${inputId}-submit`}
                onClick={onSearch}
                edge="end"
                aria-label={`Submit ${label.toLowerCase()}`}
                sx={{
                  color: "#CC8800",
                  p: size === "small" ? 0.5 : 0.75,
                  "&:hover": {
                    bgcolor: "rgba(255, 170, 0, 0.08)",
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
              borderColor: "#CC8800",
              boxShadow: "0 0 0 3px rgba(255, 170, 0, 0.15)",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            fontSize: 13.5,
            py: size === "small" ? 0.5 : 1,
            color: "#0F172A",
            "&::placeholder": {
              color: "#64748B",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}

"use client";

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface FilterSelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: { id: string; name: string }[];
  onChange: (v: string) => void;
  sx?: any;
  size?: "small" | "medium";
}

export default function FilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  sx,
  size = "medium",
}: FilterSelectProps) {
  const height = size === "small" ? 38 : 44;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        minWidth: 140,
        ...sx,
      }}
    >
      {label && (
        <InputLabel
          sx={{
            fontSize: 13.5,
            color: "#64748B",
            "&.Mui-focused": {
              color: "#0B6B3A",
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        displayEmpty
        sx={{
          height,
          borderRadius: "12px",
          bgcolor: "white",
          fontSize: 13.5,
          color: "#1E293B",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #E2E8F0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#CBD5E1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0B6B3A",
            borderWidth: 1.5,
          },
          "& .MuiSelect-select": {
            py: size === "small" ? 0.8 : 1.2,
            px: 1.4,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow:
                "0 12px 28px rgba(15, 23, 42, 0.08), 0 3px 8px rgba(15, 23, 42, 0.06)",
              mt: 0.5,
            },
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span style={{ color: "#94A3B8", fontSize: 13.5 }}>
              {placeholder}
            </span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              fontSize: 13.5,
              color: "#1E293B",
              minHeight: 38,
              "&:hover": {
                bgcolor: "#F1F5F9",
              },
              "&.Mui-selected": {
                bgcolor: "rgba(11, 107, 58, 0.08)",
                color: "#0B6B3A",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(11, 107, 58, 0.12)",
                },
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

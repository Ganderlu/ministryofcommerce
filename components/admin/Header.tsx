"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Typography,
  Button,
  Divider,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  DateRange as DateRangeIcon,
  FileDownload as DownloadIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: "#F1F5F9",
  color: "#64748B",
  "&:hover": { backgroundColor: "#E2E8F0" },
  display: "flex",
  alignItems: "center",
  minWidth: 420,
  [theme.breakpoints.down("md")]: {
    minWidth: 240,
  },
}));

const SearchIconWrapper = styled("div")(() => ({
  padding: "0 14px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748B",
  fontSize: 18,
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "#1E293B",
  flex: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 8,
  fontSize: 13.5,
  "& .MuiInputBase-input::placeholder": {
    color: "#94A3B8",
  },
}));

const ShortcutChip = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: "3px 9px",
  marginRight: 10,
  border: "1px solid #CBD5E1",
  borderRadius: 6,
  backgroundColor: "white",
  fontSize: 11,
  fontFamily: "inherit",
  color: "#64748B",
  letterSpacing: 0.4,
  fontWeight: 500,
}));

interface AdminHeaderProps {
  onSidebarToggle?: () => void;
}

export default function AdminHeader({ onSidebarToggle }: AdminHeaderProps) {
  const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(null);

  const openProfile = Boolean(profileAnchor);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
        color: "#1E293B",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)",
        borderBottom: "1px solid #E2E8F0",
        zIndex: 20,
      }}
      elevation={0}
    >
      <Toolbar sx={{ px: { xs: 1.5, md: 3 }, py: 1, minHeight: "72px !important" }}>
        <IconButton
          edge="start"
          aria-label="toggle sidebar"
          onClick={onSidebarToggle}
          sx={{
            mr: 1,
            color: "#1E293B",
            borderRadius: "10px",
            bgcolor: "#F1F5F9",
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          <MenuIcon sx={{ fontSize: 22 }} />
        </IconButton>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.96 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.05 }}
          style={{ flexGrow: 1, display: "flex", justifyContent: "center", marginLeft: 12 }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search anything…" inputProps={{ "aria-label": "search" }} />
            <ShortcutChip>Ctrl + K</ShortcutChip>
          </Search>
        </motion.div>

        <Box sx={{ flex: 1 }} />

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            aria-label="notifications"
            sx={{
              color: "#475569",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              p: 1.2,
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <Badge
              badgeContent={8}
              color="error"
              sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16, px: 0.5, right: 4, top: 4 } }}
            >
              <NotificationsIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="messages"
            sx={{
              color: "#475569",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              bgcolor: "white",
              p: 1.2,
              ml: 0.5,
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  minWidth: 16,
                  height: 16,
                  px: 0.5,
                  right: 4,
                  top: 4,
                  bgcolor: "#D4AF37",
                  color: "white",
                },
              }}
            >
              <MailIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: "#E2E8F0" }} />

        {/* Date selector */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.6,
            py: 1.1,
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
            bgcolor: "white",
            cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": { bgcolor: "#F8FAFC" },
          }}
        >
          <DateRangeIcon sx={{ color: "#D4AF37", fontSize: 18 }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>
            May 24, 2025
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
        </Box>

        {/* Download Report */}
        <Button
          variant="contained"
          startIcon={<DownloadIcon sx={{ fontSize: 17 }} />}
          sx={{
            ml: 1.5,
            bgcolor: "#D4AF37",
            color: "white",
            borderRadius: "10px",
            px: 2,
            py: 1.1,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 2px 6px rgba(11, 107, 58, 0.3)",
            "&:hover": {
              bgcolor: "#084C2E",
              boxShadow: "0 4px 12px rgba(11, 107, 58, 0.45)",
            },
          }}
        >
          Download Report
        </Button>

        <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: "#E2E8F0" }} />

        {/* Profile */}
        <Box
          component="button"
          onClick={(e) => setProfileAnchor(e.currentTarget as any)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            p: 0.5,
            pr: 1,
            borderRadius: "12px",
            transition: "all 0.15s",
            "&:hover": { bgcolor: "#F8FAFC" },
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#D4AF37",
              color: "#084C2E",
              fontWeight: 700,
              fontSize: 14,
              border: "2px solid rgba(11, 107, 58, 0.15)",
            }}
          >
            AU
          </Avatar>
          <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1E293B", lineHeight: 1.1 }}>
              Admin User
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
              Super Administrator
            </Typography>
          </Box>
          <KeyboardArrowDownIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
        </Box>

        <Popover
          open={openProfile}
          anchorEl={profileAnchor}
          onClose={() => setProfileAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { mt: 1, borderRadius: "14px", boxShadow: "0 10px 40px rgba(15,23,42,0.15)" } }}
        >
          <Box sx={{ p: 2, width: 260 }}>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: "#D4AF37", color: "#084C2E", fontWeight: 700 }}>AU</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#1E293B" }}>Admin User</Typography>
                <Typography sx={{ fontSize: 12, color: "#64748B" }}>Super Administrator</Typography>
                <Chip
                  size="small" label="Online" color="success" variant="outlined" sx={{ mt: 0.6, height: 20, fontSize: 10.5, fontWeight: 600 }}
                />
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {[
                { icon: PersonIcon, label: "My Profile" },
                { icon: SecurityIcon, label: "Security" },
                { icon: SettingsIcon, label: "Settings" },
              ].map((o) => (
                <ListItem key={o.label} disablePadding>
                  <ListItemButton sx={{ borderRadius: "10px", mb: 0.4 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: "#64748B" }}>
                      <o.icon sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={o.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: "10px", color: "#DC2626" }}>
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <LogoutIcon sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}

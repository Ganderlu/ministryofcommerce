"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Search, Menu as MenuIcon, Close, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { 
    label: "About Us", 
    href: "/about", 
    hasDropdown: true,
    dropdownItems: [
      { label: "History", href: "/about#history" },
      { label: "Mission & Vision", href: "/about#mission-vision" },
      { label: "Our Team", href: "/about#our-team" },
    ]
  },
  { 
    label: "Services", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Business Registration", href: "/services" },
      { label: "Permit & Licensing", href: "#" },
      { label: "Cooperative Registration", href: "#" },
      { label: "Export Promotion", href: "#" },
      { label: "Loan & Grants", href: "#" },
    ]
  },
  { 
    label: "Invest in Anambra", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Why Anambra", href: "#" },
      { label: "Investment Opportunities", href: "#" },
      { label: "Success Stories", href: "#" },
    ]
  },
  { 
    label: "Resources", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Downloads", href: "#" },
      { label: "Publications", href: "#" },
      { label: "FAQs", href: "#" },
    ]
  },
  { 
    label: "Media", 
    href: "#", 
    hasDropdown: true,
    dropdownItems: [
      { label: "News", href: "#" },
      { label: "Events", href: "#" },
      { label: "Gallery", href: "#" },
    ]
  },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (label: string) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({ ...anchorEl, [label]: event.currentTarget });
  };

  const handleClose = (label: string) => {
    setAnchorEl({ ...anchorEl, [label]: null });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="column" py={{ xs: 1.5, md: 2 }} spacing={1}>
          {/* Top Row: Logos + Right Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* Left: Logos */}
            <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2 } }}>
                <Image
                  src="/images/anambralogo.jpg"
                  alt="Anambra State Logo"
                  width={isMobile ? 45 : 60}
                  height={isMobile ? 45 : 60}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#D4AF37",
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      lineHeight: 1.1,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    ANAMBRA STATE
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      fontWeight: 500,
                      fontSize: { xs: "0.7rem", md: "0.75rem" },
                    }}
                  >
                    MINISTRY OF COMMERCE
                  </Typography>
                </Box>
                <Image
                  src="/images/soludon.png"
                  alt="Soludo"
                  width={isMobile ? 55 : 80}
                  height={isMobile ? 55 : 80}
                  style={{ borderRadius: "50%" }}
                  priority
                />
              </Box>
            </Stack>

            {/* Right: Search, Login, Register */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {!isMobile && (
                <>
                  <IconButton sx={{ color: "#D4AF37" }}>
                    <Search />
                  </IconButton>
                  <Button sx={{ textTransform: "none", color: "#D4AF37" }}>Login</Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#D4AF37",
                      "&:hover": { backgroundColor: "#c49f2d" },
                      textTransform: "none",
                      color: "black"
                    }}
                  >
                    Register
                  </Button>
                </>
              )}

              {/* Mobile Menu Button - Enhanced Styling */}
              {isMobile && (
                <IconButton 
                  onClick={() => setMobileOpen(true)}
                  sx={{
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    color: "#D4AF37",
                    "&:hover": { backgroundColor: "rgba(212, 175, 55, 0.2)" },
                  }}
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>
              )}
            </Stack>
          </Stack>

          {/* Bottom Row: Navigation */}
          {!isMobile && (
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                  <>
                  <Button
                    onClick={handleClick(item.label)}
                    sx={{ 
                      color: item.label === "Home" ? "#D4AF37" : theme.palette.text.primary, 
                      textTransform: "none",
                      fontWeight: item.label === "Home" ? 600 : 400,
                      px: 2,
                    }}
                    endIcon={<ExpandMore />}
                  >
                    {item.label}
                  </Button>
                  <Menu
                    anchorEl={anchorEl[item.label]}
                    open={Boolean(anchorEl[item.label])}
                    onClose={() => handleClose(item.label)}
                    PaperProps={{
                      sx: {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: 2,
                        minWidth: 200,
                      }
                    }}
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <MenuItem
                        key={dropdownItem.label}
                        onClick={() => handleClose(item.label)}
                        sx={{ py: 1.5 }}
                        component={Link}
                        href={dropdownItem.href}
                      >
                        {dropdownItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    href={item.href}
                    sx={{ 
                      color: item.label === "Home" ? "#D4AF37" : theme.palette.text.primary, 
                      textTransform: "none",
                      fontWeight: item.label === "Home" ? 600 : 400,
                      px: 2,
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Button>
                )}
                </div>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }
        }}
      >
        <Box sx={{ width: 320, pt: 2, px: 1 }}>
          {/* Close Button */}
          <Box display="flex" justifyContent="flex-end" pr={2} mb={1}>
            <IconButton 
              onClick={() => setMobileOpen(false)}
              sx={{
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                color: "#D4AF37",
              }}
            >
              <Close />
            </IconButton>
          </Box>
          
          {/* Welcome Header */}
          <Box sx={{ px: 2, pb: 2.5, borderBottom: "1px solid #f0f0f0", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Image
                src="/images/anambralogo.jpg"
                alt="Anambra State Logo"
                width={50}
                height={50}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#D4AF37" }}>
                  ANAMBRA STATE
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  MINISTRY OF COMMERCE
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
              Welcome to Anambra State Ministry of Commerce
            </Typography>
          </Box>

          <List sx={{ pb: 2 }}>
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown && item.dropdownItems ? (
                  <Accordion 
                    disableGutters 
                    elevation={0} 
                    sx={{ 
                      borderBottom: "1px solid #f5f5f5",
                      "&:before": { display: "none" }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#D4AF37" }} />}
                      sx={{ px: 2 }}
                    >
                      <Typography sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1, backgroundColor: "#fafafa" }}>
                      {item.dropdownItems.map((dropdownItem) => (
                        <ListItemButton
                          key={dropdownItem.label}
                          onClick={() => setMobileOpen(false)}
                          sx={{ pl: 2, py: 1.2, borderRadius: 1 }}
                          component={Link}
                          href={dropdownItem.href}
                        >
                          <ListItemText primary={dropdownItem.label} />
                        </ListItemButton>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <ListItem disablePadding sx={{ borderBottom: "1px solid #f5f5f5" }}>
                    <ListItemButton 
                      sx={{ px: 2 }} 
                      onClick={() => setMobileOpen(false)}
                      component={Link}
                      href={item.href}
                    >
                      <ListItemText 
                        primary={item.label} 
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </div>
            ))}
          </List>

          {/* Login/Register Buttons */}
          <Stack spacing={1.5} px={2} pt={2}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ 
                borderColor: "#D4AF37",
                color: "#D4AF37",
                textTransform: "none",
                py: 1.2,
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ 
                backgroundColor: "#D4AF37",
                "&:hover": { backgroundColor: "#c49f2d" },
                textTransform: "none",
                color: "black",
                py: 1.2,
              }}
            >
              Register
            </Button>
          </Stack>

          {/* Contact Info */}
          <Box sx={{ mt: 4, px: 2, pb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: "#D4AF37" }}>
              Contact Us
            </Typography>
            <Stack spacing={1.2}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography sx={{ color: "#D4AF37", fontSize: "1.2rem" }}>
                  📧
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  info@commerce.anambrastate.gov.ng
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography sx={{ color: "#D4AF37", fontSize: "1.2rem" }}>
                  📞
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  +234 (0) 813 423 4567
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

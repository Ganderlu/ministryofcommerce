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
import { Search, Menu as MenuIcon, Close, ExpandMore, Business, AccountTree } from "@mui/icons-material";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const departments = [
  { name: "Commerce", url: "/departments/commerce" },
  { name: "Cooperatives", url: "/departments/cooperatives" },
  { name: "Trade/Industry", url: "/departments/trade-industry" },
  { name: "Investment Promotion", url: "/departments/investment-promotion" },
  { name: "Inspectorate and Monitoring", url: "/departments/inspectorate-and-monitoring" },
  { name: "Administration and Human Resource", url: "/departments/administration-and-human-resource" },
  { name: "Finance and Account", url: "/departments/finance-and-account" },
];

const units = [
  { name: "Agribusiness Support", url: "/units/agribusiness-support" },
  { name: "Procurement", url: "/units/procurement" },
  { name: "Public Affairs", url: "/units/public-affairs" },
  { name: "Audit", url: "/units/audit" },
  { name: "ICT", url: "/units/ict" },
  { name: "Legal", url: "/units/legal" },
  { name: "Planning", url: "/units/planning" },
];

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
    ],
  },
  {
    label: "Portals",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { label: "Business Registration", href: "/services/business-registration" },
      { label: "SME Registration", href: "/services/sme-registration" },
      { label: "Cooperative Registration", href: "/services/cooperative-registration" },
      { label: "MSME Registration", href: "/services/msme-registration" },
    ],
  },
  {
    label: "Invest in Anambra",
    href: "/invest-in-anambra",
    hasDropdown: true,
    dropdownItems: [
      { label: "Why Anambra", href: "/invest-in-anambra#why-anambra" },
      { label: "Investment Opportunities", href: "/invest-in-anambra#opportunities" },
      { label: "Success Stories", href: "/invest-in-anambra#success-stories" },
    ],
  },
  {
    label: "Department & Unit",
    href: "/about#departments",
    hasDropdown: true,
    isDepartmentUnit: true,
  },
  {
    label: "Media",
    href: "/media",
    hasDropdown: true,
    dropdownItems: [
      { label: "News", href: "/media#news" },
      { label: "Events", href: "/media#events" },
      { label: "Gallery", href: "/media#gallery" },
    ],
  },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: false,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleClick = (label: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl({ ...anchorEl, [label]: event.currentTarget });
  };

  const handleClose = (label: string) => {
    setAnchorEl({ ...anchorEl, [label]: null });
  };

  const handleKeyDown = (label: string) => (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      setAnchorEl({ ...anchorEl, [label]: target });
    } else if (event.key === "Escape") {
      handleClose(label);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFAA00",
        boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
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
                  src="/images/Anambra State Government Seal.png"
                  alt="Anambra State Government Seal"
                  width={isMobile ? 45 : 60}
                  height={isMobile ? 45 : 60}
                  style={{ objectFit: "contain" }}
                  priority
                />
                <Box>
                  <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    color: "black",
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
                  component="p"
                  sx={{ 
                    color: "rgba(0,0,0,0.85)", 
                    fontWeight: 500,
                    fontSize: { xs: "0.68rem", md: "0.75rem" },
                    lineHeight: 1.2,
                  }}
                >
                  MINISTRY OF COMMERCE, INDUSTRY AND TRADE
                </Typography>
                </Box>
                <Image
                  src="/images/soludon.png"
                  alt="Governor of Anambra State"
                  width={isMobile ? 55 : 80}
                  height={isMobile ? 55 : 80}
                  style={{ borderRadius: "50%" }}
                  sizes="(max-width: 767px) 55px, 80px"
                />
              </Box>
            </Stack>

            {/* Right: Search */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: { xs: 2, md: 0 } }}>
              {!isMobile && (
                <IconButton
                  onClick={handleSearchClick}
                  aria-label="Search the site"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "#996600",
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,1)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Search sx={{ fontSize: 22 }} />
                </IconButton>
              )}

              {/* Mobile Menu Button - Enhanced Styling */}
              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open main navigation menu"
                  aria-controls="mobile-navigation-drawer"
                  aria-expanded={mobileOpen}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "#996600",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  }}
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>
              )}
            </Stack>
          </Stack>

          {/* Bottom Row: Navigation */}
          {!isMobile && (
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} role="navigation" aria-label="Main site navigation">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                  <>
                  <Button
                    component={Link}
                    href={item.href}
                    onClick={handleClick(item.label)}
                    onKeyDown={handleKeyDown(item.label)}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl[item.label])}
                    aria-controls={`menu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    sx={{
                      color: item.label === "Home" ? "#996600" : theme.palette.text.primary,
                      textTransform: "none",
                      fontWeight: item.label === "Home" ? 700 : 400,
                      px: 2,
                    }}
                    endIcon={<ExpandMore />}
                  >
                    {item.label}
                  </Button>
                  <Menu
                    id={`menu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    anchorEl={anchorEl[item.label]}
                    open={Boolean(anchorEl[item.label])}
                    onClose={() => handleClose(item.label)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    PaperProps={{
                      sx: {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: 2,
                        minWidth: item.isDepartmentUnit ? 480 : 200,
                        maxWidth: item.isDepartmentUnit ? 550 : undefined,
                      }
                    }}
                  >
                    {item.isDepartmentUnit ? (
                      <Box sx={{ display: "flex", gap: 3, p: 1.5 }}>
                        {/* Departments Column */}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
                            <Business sx={{ color: "#FFAA00", fontSize: "1.3rem" }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                              Departments
                            </Typography>
                          </Box>
                          <Stack spacing={0.5}>
                            {departments.map((dept) => (
                              <MenuItem
                                key={dept.url}
                                onClick={() => handleClose(item.label)}
                                component={Link}
                                href={dept.url}
                                sx={{ py: 0.6, px: 1, borderRadius: 0.8, fontSize: "0.9rem" }}
                              >
                                {dept.name}
                              </MenuItem>
                            ))}
                          </Stack>
                        </Box>
                        {/* Units Column */}
                        <Box sx={{ flex: 1, borderLeft: "1px solid #f0f0f0", pl: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
                            <AccountTree sx={{ color: "#FFAA00", fontSize: "1.3rem" }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                              Units
                            </Typography>
                          </Box>
                          <Stack spacing={0.5}>
                            {units.map((unit) => (
                              <MenuItem
                                key={unit.url}
                                onClick={() => handleClose(item.label)}
                                component={Link}
                                href={unit.url}
                                sx={{ py: 0.6, px: 1, borderRadius: 0.8, fontSize: "0.9rem" }}
                              >
                                {unit.name}
                              </MenuItem>
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    ) : (
                      item.dropdownItems?.map((dropdownItem) => (
                        <MenuItem
                          key={dropdownItem.label}
                          onClick={() => handleClose(item.label)}
                          sx={{ py: 1.5 }}
                          component={Link}
                          href={dropdownItem.href}
                        >
                          {dropdownItem.label}
                        </MenuItem>
                      ))
                    )}
                  </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    href={item.href}
                    sx={{
                      color: item.label === "Home" ? "#996600" : theme.palette.text.primary,
                      textTransform: "none",
                      fontWeight: item.label === "Home" ? 700 : 400,
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
        id="mobile-navigation-drawer"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        aria-label="Mobile site navigation"
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }
        }}
      >
        <Box sx={{ width: 320, pt: 2, px: 1 }} role="dialog" aria-modal="true" aria-label="Mobile main menu">
          {/* Close + Search Buttons */}
          <Box display="flex" justifyContent="space-between" pr={2} pl={2} mb={1}>
            <IconButton
              onClick={() => {
                setMobileOpen(false);
                handleSearchClick();
              }}
              aria-label="Search the site"
              sx={{
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                color: "#FFAA00",
              }}
            >
              <Search />
            </IconButton>
            <IconButton
              onClick={() => setMobileOpen(false)}
              aria-label="Close main navigation menu"
              sx={{
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                color: "#FFAA00",
              }}
            >
              <Close />
            </IconButton>
          </Box>
          
          {/* Welcome Header */}
          <Box sx={{ px: 2, pb: 2.5, borderBottom: "1px solid #f0f0f0", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Image
                src="/images/Anambra State Government Seal.png"
                alt="Anambra State Government Seal"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <Box>
                <Typography variant="subtitle2" component="p" sx={{ fontWeight: 700, color: "#FFAA00" }}>
                  ANAMBRA STATE
                </Typography>
                <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
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
                {item.hasDropdown ? (
                  <Accordion 
                    disableGutters 
                    elevation={0} 
                    sx={{ 
                      borderBottom: "1px solid #f5f5f5",
                      "&:before": { display: "none" }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#FFAA00" }} />}
                      sx={{ px: 2 }}
                    >
                      <Typography sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, py: 1, backgroundColor: "#fafafa" }}>
                      {item.isDepartmentUnit ? (
                        <Stack spacing={2}>
                          {/* Departments */}
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Business sx={{ color: "#FFAA00", fontSize: "1.2rem" }} />
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Departments
                              </Typography>
                            </Box>
                            <Stack spacing={0.5}>
                              {departments.map((dept) => (
                                <ListItemButton
                                  key={dept.url}
                                  onClick={() => setMobileOpen(false)}
                                  component={Link}
                                  href={dept.url}
                                  sx={{ py: 0.8, borderRadius: 1 }}
                                >
                                  <ListItemText primary={dept.name} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                                </ListItemButton>
                              ))}
                            </Stack>
                          </Box>
                          {/* Units */}
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <AccountTree sx={{ color: "#FFAA00", fontSize: "1.2rem" }} />
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Units
                              </Typography>
                            </Box>
                            <Stack spacing={0.5}>
                              {units.map((unit) => (
                                <ListItemButton
                                  key={unit.url}
                                  onClick={() => setMobileOpen(false)}
                                  component={Link}
                                  href={unit.url}
                                  sx={{ py: 0.8, borderRadius: 1 }}
                                >
                                  <ListItemText primary={unit.name} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                                </ListItemButton>
                              ))}
                            </Stack>
                          </Box>
                        </Stack>
                      ) : (
                        item.dropdownItems?.map((dropdownItem) => (
                          <ListItemButton
                            key={dropdownItem.label}
                            onClick={() => setMobileOpen(false)}
                            sx={{ pl: 2, py: 1.2, borderRadius: 1 }}
                            component={Link}
                            href={dropdownItem.href}
                          >
                            <ListItemText primary={dropdownItem.label} />
                          </ListItemButton>
                        ))
                      )}
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

          {/* Contact Info */}
          <Box sx={{ mt: 4, px: 2, pb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: "#FFAA00" }}>
              Contact Us
            </Typography>
            <Stack spacing={1.2}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography sx={{ color: "#FFAA00", fontSize: "1.2rem" }}>
                  📧
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  commerce@anambrastate.gov.ng
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Typography sx={{ color: "#FFAA00", fontSize: "1.2rem" }}>
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

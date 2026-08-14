"use client";
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Description,
  Article,
  Event,
  Business,
  AccountTree,
  People,
  PermContactCalendar,
  AppRegistration,
  ChevronRight,
  SearchOff,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  services as _services,
  news as _news,
  events as _events,
  teamMembers as _teamMembers,
} from "@/data/seed";
import SearchField from "@/components/ui/SearchField";

const services = _services ?? [];
const news = _news ?? [];
const events = _events ?? [];
const teamMembers = _teamMembers ?? [];

const departments = [
  { name: "Commerce", url: "/departments/commerce", description: "Oversee commercial activities, trade facilitation, and market development across Anambra State." },
  { name: "Cooperatives", url: "/departments/cooperatives", description: "Registration, regulation, and support for cooperative societies and enterprises." },
  { name: "Trade/Industry", url: "/departments/trade-industry", description: "Industrialization, trade policy, MSME growth, and manufacturing sector support." },
  { name: "Investment Promotion", url: "/departments/investment-promotion", description: "Attract investments, promote incentives, and facilitate investor onboarding." },
  { name: "Inspectorate and Monitoring", url: "/departments/inspectorate-and-monitoring", description: "Compliance inspection, quality assurance, and regulatory monitoring." },
  { name: "Administration and Human Resource", url: "/departments/administration-and-human-resource", description: "Personnel management, administration, and welfare for the Ministry." },
  { name: "Finance and Account", url: "/departments/finance-and-account", description: "Budgeting, treasury operations, revenue accounting, and financial reporting." },
];

const units = [
  { name: "Agribusiness Support", url: "/units/agribusiness-support", description: "Agricultural enterprise support, agri-MSME funding, and value chain programs." },
  { name: "Procurement", url: "/units/procurement", description: "Transparent procurement of goods, services, and works for the Ministry." },
  { name: "Public Affairs", url: "/units/public-affairs", description: "Media relations, public communications, events, and citizen engagement." },
  { name: "Audit", url: "/units/audit", description: "Internal audit, controls, compliance review, and financial oversight." },
  { name: "ICT", url: "/units/ict", description: "Digital services, portal management, and technology infrastructure." },
  { name: "Legal", url: "/units/legal", description: "Legal advisory, contracts, compliance, and regulatory drafting." },
  { name: "Planning", url: "/units/planning", description: "Strategic planning, policy formulation, research, and statistics." },
];

const registrationLinks = [
  { name: "Business Registration", url: "/services/business-registration", description: "Register your business online — sole proprietorship, limited liability, and more." },
  { name: "Cooperative Registration", url: "/services/cooperative-registration", description: "Register your cooperative society and access all Ministry support programs." },
  { name: "All Services", url: "/services", description: "Browse every service, permit, license, and program available on the portal." },
];

const contactItems = [
  { name: "Contact Us", url: "/contact", description: "Phone, email, office address, live support, and general enquiry channels." },
];

type CategoryId =
  | "all"
  | "services"
  | "news"
  | "events"
  | "departments"
  | "units"
  | "team"
  | "registration"
  | "contact";

interface SearchResult {
  id: string;
  category: Exclude<CategoryId, "all">;
  title: string;
  description: string;
  url: string;
  image?: string;
  meta?: string;
}

const CATEGORY_META: Record<
  Exclude<CategoryId, "all">,
  { label: string; color: string; chipBg: string; Icon: any }
> = {
  services: {
    label: "Services",
    color: "#D4AF37",
    chipBg: "rgba(212,175,55,0.1)",
    Icon: Description,
  },
  news: {
    label: "News",
    color: "#3B82F6",
    chipBg: "rgba(59,130,246,0.1)",
    Icon: Article,
  },
  events: {
    label: "Events",
    color: "#8B5CF6",
    chipBg: "rgba(139,92,246,0.1)",
    Icon: Event,
  },
  departments: {
    label: "Departments",
    color: "#0EA5E9",
    chipBg: "rgba(14,165,233,0.1)",
    Icon: Business,
  },
  units: {
    label: "Units",
    color: "#14B8A6",
    chipBg: "rgba(20,184,166,0.1)",
    Icon: AccountTree,
  },
  team: {
    label: "Our Team",
    color: "#F97316",
    chipBg: "rgba(249,115,22,0.1)",
    Icon: People,
  },
  registration: {
    label: "Registration",
    color: "#D4AF37",
    chipBg: "rgba(212,175,55,0.1)",
    Icon: AppRegistration,
  },
  contact: {
    label: "Contact",
    color: "#EF4444",
    chipBg: "rgba(239,68,68,0.1)",
    Icon: PermContactCalendar,
  },
};

function buildAllResults(): SearchResult[] {
  const out: SearchResult[] = [];

  services.forEach((s) => {
    let url = "#";
    if (s.title === "Business Registration") url = "/services/business-registration";
    else if (s.title === "Cooperative Registration") url = "/services/cooperative-registration";
    else if (s.title === "Permit & Licensing") url = "/services/permit-licensing";
    else if (s.title === "Export Promotion") url = "/services/export-promotion";
    else if (s.title === "Loan & Grants") url = "/services/loan-grants";
    else if (s.title === "MSME Development") url = "/units/agribusiness-support";
    else if (s.title === "E-Service Centre") url = "/contact";
    else if (s.title === "Procurement/Tenders") url = "/units/procurement";
    out.push({
      id: `svc-${s.id}`,
      category: "services",
      title: s.title,
      description: s.description,
      url,
      image: s.image,
    });
  });

  news.forEach((n) => {
    out.push({
      id: `news-${n.id}`,
      category: "news",
      title: n.title,
      description: n.date,
      url: "/media#news",
      image: n.image,
      meta: "News Article",
    });
  });

  events.forEach((e) => {
    out.push({
      id: `evt-${e.id}`,
      category: "events",
      title: e.title,
      description: `${e.month} ${e.date} — ${e.venue}`,
      url: "/media#events",
      meta: `${e.day} • ${e.month} ${e.date}`,
    });
  });

  departments.forEach((d, i) => {
    out.push({
      id: `dept-${i}`,
      category: "departments",
      title: `Department of ${d.name}`,
      description: d.description,
      url: d.url,
    });
  });

  units.forEach((u, i) => {
    out.push({
      id: `unit-${i}`,
      category: "units",
      title: `${u.name} Unit`,
      description: u.description,
      url: u.url,
    });
  });

  teamMembers.forEach((m) => {
    if (m.name === "Prof. Charles Chukwuma Soludo") {
      out.push({
        id: `team-${m.id}`,
        category: "team",
        title: "Prof. Charles Chukwuma Soludo",
        description:
          "Executive Governor of Anambra State. His Excellency Professor Charles Chukwuma Soludo CFR — economist, banker, policymaker, and the sitting Governor of Anambra State leading the Agenda for a Livable, Prosperous, and Sustainable homeland.",
        url: "/about#our-team",
        image: m.image,
        meta:
          "Governor Governor-General His Excellency HE Prof Executive Governor Anambra state governor Soludo Chukwuma Charles CFR economist banker professor leader leadership Awka government house",
      });
    } else if (m.name === "Hon. Nomso Chukwuma Ebonwu") {
      out.push({
        id: `team-${m.id}`,
        category: "team",
        title: "Hon. Nomso Chukwuma Ebonwu",
        description:
          "Commissioner for Commerce, Anambra State. Honorable Nomso Chukwuma Ebonwu — Commissioner heading the Anambra State Ministry of Commerce, overseeing trade, industry, cooperatives, MSMEs, investment, and business registration services across the state.",
        url: "/about#our-team",
        image: m.image,
        meta:
          "Commissioner Hon Honorable Minister Commerce Commissioner for Commerce Anambra commissioner head of ministry Nomso Ebonwu Chukwuma trade cooperatives investment MSME business registration permanent secretary cabinet member",
      });
    } else {
      let extraMeta = "";
      if (m.position.toLowerCase().includes("permanent secretary")) {
        extraMeta =
          "permanent secretary PS admin head of civil service administration Engr engineer Michael Obiekwe";
      } else if (m.position.toLowerCase().includes("director of account")) {
        extraMeta =
          "director of accounts finance accounts treasury payroll budgeting revenue Anagbakwu Chioma Uzoamaka";
      } else if (m.position.toLowerCase().includes("director of cooperative")) {
        extraMeta =
          "director of cooperatives cooperative societies cooperative registration head of cooperatives Odegbunam Chinyere";
      } else if (m.position.toLowerCase().includes("trade & investment") || m.position.toLowerCase().includes("trade and investment")) {
        extraMeta = "director of trade trade and investment industrialisation export";
      } else if (m.position.toLowerCase().includes("msme")) {
        extraMeta = "MSME micro small medium enterprises director development MSMEs smes small business";
      }
      out.push({
        id: `team-${m.id}`,
        category: "team",
        title: m.name,
        description: m.position,
        url: "/about#our-team",
        image: m.image,
        meta: extraMeta || undefined,
      });
    }
  });

  registrationLinks.forEach((r, i) => {
    out.push({
      id: `reg-${i}`,
      category: "registration",
      title: r.name,
      description: r.description,
      url: r.url,
    });
  });

  contactItems.forEach((c, i) => {
    out.push({
      id: `contact-${i}`,
      category: "contact",
      title: c.name,
      description: c.description,
      url: c.url,
    });
  });

  return out;
}

const ALL_RESULTS = buildAllResults();

export default function SearchResults() {
  const theme = useTheme();
  const params = useSearchParams();
  const urlQ = (params?.get("q") ?? "").toString();

  const [query, setQuery] = useState(urlQ);
  const [category, setCategory] = useState<CategoryId>("all");

  useEffect(() => {
    setQuery(urlQ);
  }, [urlQ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALL_RESULTS;
    if (category !== "all") {
      list = list.filter((r) => r.category === category);
    }
    if (!q) return list;
    return list.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        CATEGORY_META[r.category].label.toLowerCase().includes(q) ||
        (r.meta ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const counts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = ALL_RESULTS.filter((r) => {
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.meta ?? "").toLowerCase().includes(q)
      );
    });
    const byCat: Record<string, number> = { all: all.length };
    (Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).forEach((k) => {
      byCat[k] = all.filter((r) => r.category === k).length;
    });
    return byCat;
  }, [query]);

  const tabs: { id: CategoryId; label: string; count: number }[] = [
    { id: "all", label: "All", count: counts["all"] ?? 0 },
    { id: "services", label: "Services", count: counts["services"] ?? 0 },
    { id: "news", label: "News", count: counts["news"] ?? 0 },
    { id: "events", label: "Events", count: counts["events"] ?? 0 },
    { id: "departments", label: "Departments", count: counts["departments"] ?? 0 },
    { id: "units", label: "Units", count: counts["units"] ?? 0 },
    { id: "team", label: "Our Team", count: counts["team"] ?? 0 },
    { id: "registration", label: "Registration", count: counts["registration"] ?? 0 },
    { id: "contact", label: "Contact", count: counts["contact"] ?? 0 },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#FAFBFC" }}>
      <Container maxWidth="xl">
        {/* Search Bar */}
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            mb: { xs: 3, md: 4 },
            border: "1px solid #EEF1F5",
            background: "white",
          }}
        >
          <SearchField
            placeholder="Search for services, news, departments, events, people..."
            value={query}
            onChange={setQuery}
            onSearch={() => {}}
            fullWidth
            size="medium"
          />
        </Card>

        {/* Result Summary */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
          >
            <Box component="span" sx={{ color: "#D4AF37", fontWeight: 700 }}>
              {filtered.length}
            </Box>{" "}
            result{filtered.length === 1 ? "" : "s"} found
            {query.trim() && (
              <>
                {" "}
                for{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.text.primary, fontWeight: 700 }}
                >
                  &ldquo;{query}&rdquo;
                </Box>
              </>
            )}
          </Typography>
          {query && (
            <Button
              size="small"
              onClick={() => setQuery("")}
              sx={{ color: theme.palette.text.secondary, textTransform: "none" }}
            >
              Clear search
            </Button>
          )}
        </Stack>

        {/* Category Tabs */}
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Tabs
            value={category}
            onChange={(_e, v) => setCategory(v)}
            TabIndicatorProps={{
              style: { backgroundColor: "#D4AF37", height: 3, borderRadius: 2 },
            }}
            sx={{
              minWidth: { xs: 720, sm: 0 },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                py: 1.5,
                px: 2,
                minHeight: 0,
                color: theme.palette.text.secondary,
                "&.Mui-selected": { color: "#D4AF37" },
              },
            }}
          >
            {tabs.map((t) => (
              <Tab
                key={t.id}
                value={t.id}
                label={
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <Box component="span">{t.label}</Box>
                    <Chip
                      label={t.count}
                      size="small"
                      sx={{
                        backgroundColor:
                          category === t.id
                            ? "rgba(212,175,55,0.15)"
                            : "#EEF1F5",
                        color:
                          category === t.id ? "#D4AF37" : theme.palette.text.secondary,
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        height: 22,
                      }}
                    />
                  </Stack>
                }
              />
            ))}
          </Tabs>
        </Box>

        <Divider sx={{ mb: { xs: 3, md: 4 } }} />

        {/* Results Grid or Empty State */}
        {filtered.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: { xs: 2, md: 3 },
            }}
          >
            {filtered.map((r) => {
              const meta = CATEGORY_META[r.category];
              const Icon = meta.Icon;
              const isTeam = r.category === "team";

              if (isTeam && r.image) {
                return (
                  <Card
                    key={r.id}
                    elevation={1}
                    component={Link}
                    href={r.url}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #EEF1F5",
                      background: "white",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        borderColor: "rgba(212,175,55,0.3)",
                        bgcolor: "#FFFEF8",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.6, md: 3 }, flex: 1 }}>
                      <Stack direction="row" spacing={{ xs: 2, md: 2.5 }} alignItems="flex-start">
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: 72, md: 84 },
                            height: { xs: 72, md: 84 },
                            flexShrink: 0,
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid",
                            borderColor: "rgba(212,175,55,0.35)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                          }}
                        >
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            sizes="84px"
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Chip
                            label={meta.label}
                            size="small"
                            sx={{
                              backgroundColor: meta.chipBg,
                              color: meta.color,
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              mb: 1.5,
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 800,
                              color: theme.palette.text.primary,
                              fontSize: { xs: "0.98rem", md: "1.05rem" },
                              mb: 0.6,
                              lineHeight: 1.3,
                            }}
                          >
                            {r.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: meta.color,
                              fontWeight: 700,
                              fontSize: "0.85rem",
                              lineHeight: 1.4,
                              mb: 1.4,
                            }}
                          >
                            {r.description.split(".")[0]}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7,
                          mt: 2.2,
                          fontSize: "0.88rem",
                        }}
                      >
                        {r.description.includes(".") && r.description.split(".").slice(1).join(".").trim() || r.description}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2.2,
                          pt: 2,
                          borderTop: "1px solid #F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.disabled,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          Our Team • Ministry Profile
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#D4AF37",
                            fontWeight: 700,
                            fontSize: "0.86rem",
                            gap: 0.3,
                          }}
                        >
                          View Profile <ChevronRight sx={{ fontSize: 16 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <Card
                  key={r.id}
                  elevation={1}
                  component={Link}
                  href={r.url}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #EEF1F5",
                    background: "white",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      borderColor: "rgba(212,175,55,0.3)",
                      bgcolor: "#FFFEF8",
                    },
                  }}
                >
                  {r.image && (
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 160,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 600px) 100vw, 420px"
                        style={{ objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                        }}
                      >
                        <Chip
                          label={meta.label}
                          size="small"
                          sx={{
                            backgroundColor: meta.chipBg,
                            color: meta.color,
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            backdropFilter: "blur(6px)",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  <CardContent sx={{ p: { xs: 2.2, md: 2.6 }, flex: 1 }}>
                    {!r.image && (
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          icon={
                            <Icon
                              sx={{
                                fontSize: 15,
                                color: meta.color,
                                ml: 0.5,
                              }}
                            />
                          }
                          label={meta.label}
                          size="small"
                          sx={{
                            backgroundColor: meta.chipBg,
                            color: meta.color,
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>
                    )}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontSize: "1.02rem",
                        mb: 1,
                        lineHeight: 1.35,
                      }}
                    >
                      {r.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.65,
                        mb: 2,
                        fontSize: "0.88rem",
                      }}
                    >
                      {r.description}
                    </Typography>
                    {r.meta && !r.image && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: meta.color,
                          fontWeight: 600,
                          mb: 1.5,
                        }}
                      >
                        {r.meta}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#D4AF37",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        gap: 0.4,
                      }}
                    >
                      View <ChevronRight sx={{ fontSize: 16 }} />
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px dashed #D8DEE7",
              p: { xs: 4, md: 7 },
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                mx: "auto",
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#F5F1E5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <SearchOff sx={{ fontSize: 36, color: "#D4AF37" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}
            >
              No results match your search
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3.5,
                maxWidth: 480,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              We couldn&rsquo;t find anything matching your search. Try different
              keywords or browse by category below.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="center"
              spacing={{ xs: 1.5, sm: 2 }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                sx={{
                  borderColor: "#D4AF37",
                  color: "#D4AF37",
                  textTransform: "none",
                  px: 2.5,
                  py: 1.2,
                  "&:hover": {
                    borderColor: "#b99727",
                    color: "#b99727",
                    bgcolor: "rgba(212,175,55,0.06)",
                  },
                }}
              >
                <SearchIcon sx={{ fontSize: 18, mr: 1 }} />
                Reset search
              </Button>
              <Button
                component={Link}
                href="/services"
                variant="contained"
                sx={{
                  backgroundColor: "#D4AF37",
                  color: "black",
                  textTransform: "none",
                  px: 2.5,
                  py: 1.2,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#c49f2d" },
                }}
              >
                Browse Services
              </Button>
            </Stack>
          </Card>
        )}
      </Container>
    </Box>
  );
}

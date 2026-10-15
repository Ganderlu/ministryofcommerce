import { Metadata } from "next";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  LocationOn,
  People,
  Business,
  TrendingUp,
  Security,
  Speed,
  Public,
  Agriculture,
  Factory,
  Construction,
  Computer,
  BeachAccess,
  Storefront,
  LocalShipping,
  CheckCircle,
  ArrowForward,
  Email,
  Phone,
  Star,
  Insights,
  Handshake,
  ReceiptLong,
} from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Invest in Anambra State | Anambra State Ministry of Commerce",
  description:
    "Discover why Anambra State is Nigeria's leading investment destination. Explore investment opportunities across commerce, agriculture, manufacturing, real estate, ICT, and tourism. Ease of doing business, investor support, and a thriving economy await.",
  keywords: [
    "Anambra State",
    "Invest in Anambra",
    "Investment Opportunities",
    "Nigeria Investment",
    "Ministry of Commerce",
    "Ease of Doing Business",
    "Foreign Direct Investment",
    "Anambra Economy",
    "Business in Anambra",
    "Investment Promotion",
    "Anambra Sectors",
  ],
  alternates: { canonical: "/invest-in-anambra" },
  openGraph: {
    title: "Invest in Anambra State | Anambra State Ministry of Commerce",
    description:
      "Anambra State — Nigeria's commercial heartbeat. Strategic location, vibrant markets, skilled workforce, and investor-friendly policies. Find your next investment opportunity.",
    type: "website",
    url: "/invest-in-anambra",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Anambra State | Anambra State Ministry of Commerce",
    description:
      "Anambra State — Nigeria's commercial heartbeat. Strategic location, vibrant markets, skilled workforce, and investor-friendly policies.",
  },
};

const whyAnambra = [
  {
    icon: <LocationOn sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Strategic Geographic Location",
    description:
      "Centrally positioned in the South-East, Anambra connects the entire Eastern Nigeria commercial corridor with easy access to ports, land borders, and major regional markets.",
  },
  {
    icon: <People sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Skilled & Entrepreneurial Workforce",
    description:
      "Home to some of Nigeria's most industrious and innovative people. A young, tech-savvy population with a deep culture of enterprise and trade.",
  },
  {
    icon: <Storefront sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Vibrant Commercial Hub",
    description:
      "Onitsha — West Africa's largest market — anchors a thriving trade ecosystem spanning manufacturing, wholesale, retail, and distribution.",
  },
  {
    icon: <Security sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Stable & Secure Environment",
    description:
      "A peaceful and secure state with strong governance, the rule of law, and a commitment to protecting lives, property, and investor interests.",
  },
  {
    icon: <Speed sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Ease of Doing Business",
    description:
      "Streamlined registrations, a one-stop investment center, and investor-friendly policies designed to reduce bureaucracy and accelerate time-to-market.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Growing & Diversified Economy",
    description:
      "A robust economy driven by commerce, industry, agriculture, and services — offering resilient, high-return investment opportunities across multiple sectors.",
  },
];

const stats = [
  { value: "5M+", label: "Residents" },
  { value: "21", label: "Local Government Areas" },
  { value: "N2.5T+", label: "GDP (2023 Est.)" },
  { value: "1st", label: "Commercial Hub in SE Nigeria" },
];

const sectors = [
  {
    icon: <Storefront sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Commerce & Trade",
    description:
      "Leverage the Onitsha market ecosystem and a vast distribution network to capture regional and national demand.",
  },
  {
    icon: <Agriculture sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Agriculture & Agro-Allied",
    description:
      "Fertile land, favorable climate, and strong value chains in rice, cassava, yam, vegetables, and livestock.",
  },
  {
    icon: <Factory sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Manufacturing & Industry",
    description:
      "Industrial parks and zones supporting light manufacturing, textiles, pharmaceuticals, and consumer goods.",
  },
  {
    icon: <Construction sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Real Estate & Construction",
    description:
      "Rapid urbanization creating strong demand for residential, commercial, and infrastructure development.",
  },
  {
    icon: <Computer sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "ICT & Digital Economy",
    description:
      "A young, digitally-literate population and growing tech ecosystem make Anambra an ideal ICT investment ground.",
  },
  {
    icon: <BeachAccess sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Tourism & Hospitality",
    description:
      "Rich cultural heritage, festivals, and natural attractions offering untapped potential in hospitality and tourism.",
  },
  {
    icon: <LocalShipping sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Logistics & Transportation",
    description:
      "Strategic position and growing trade volumes create demand for modern logistics, warehousing, and transport services.",
  },
  {
    icon: <Public sx={{ fontSize: "2.25rem", color: "#FFAA00" }} />,
    title: "Education & Health Services",
    description:
      "Strong human capital base and rising demand for quality private education and healthcare services.",
  },
];

const investorServices = [
  {
    icon: <Handshake sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Investment Facilitation",
    description:
      "End-to-end support from project conception to commissioning, including site selection, approvals, and partner matching.",
  },
  {
    icon: <ReceiptLong sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Regulatory Guidance",
    description:
      "Clear guidance on licensing, permits, tax obligations, and compliance requirements to keep your business on track.",
  },
  {
    icon: <Insights sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Market Intelligence",
    description:
      "Access to sector research, market data, and feasibility insights to inform sound investment decisions.",
  },
  {
    icon: <Security sx={{ fontSize: "2rem", color: "#FFAA00" }} />,
    title: "Investor Aftercare",
    description:
      "Dedicated aftercare services to resolve operational challenges and ensure long-term investor satisfaction.",
  },
];

const investmentSteps = [
  {
    step: "01",
    title: "Explore Opportunities",
    description:
      "Review our priority sectors and identify the investment opportunity that aligns with your goals and capital.",
  },
  {
    step: "02",
    title: "Submit Investment Inquiry",
    description:
      "Reach out to the Investment Promotion Department with your project concept and investment profile.",
  },
  {
    step: "03",
    title: "Receive Guidance & Support",
    description:
      "Our team provides tailored guidance on site selection, regulatory requirements, and available incentives.",
  },
  {
    step: "04",
    title: "Secure Approvals & Set Up",
    description:
      "Complete registrations and permits through our streamlined one-stop process and establish your operations.",
  },
  {
    step: "05",
    title: "Launch & Grow",
    description:
      "Commission your project and benefit from ongoing aftercare support as you scale your Anambra operations.",
  },
];

const successStories = [
  {
    quote:
      "Anambra's commercial energy is unmatched. Setting up our distribution hub here gave us immediate access to the entire Eastern Nigerian market.",
    name: "Regional Distribution Firm",
    sector: "Logistics & Trade",
  },
  {
    quote:
      "The ease of doing business and the skilled workforce made our manufacturing expansion in Anambra seamless and highly rewarding.",
    name: "Consumer Goods Manufacturer",
    sector: "Manufacturing",
  },
  {
    quote:
      "From the first inquiry to launch, the Investment Promotion team was responsive, transparent, and genuinely committed to our success.",
    name: "Agro-Processing Investor",
    sector: "Agriculture",
  },
];

export default function InvestInAnambraPage() {
  return (
    <Box>
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "62vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/ch2.png"
            alt="Invest in Anambra State"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.62)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ py: { xs: 7, md: 11 } }}>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ mb: 4, color: "rgba(255,255,255,0.85)" }}
            >
              <Link
                underline="hover"
                color="inherit"
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": { color: "#FFAA00" },
                }}
              >
                <Home fontSize="small" />
                Home
              </Link>
              <Typography sx={{ color: "#FFAA00", fontWeight: 600 }}>
                Invest in Anambra
              </Typography>
            </Breadcrumbs>

            <Chip
              label="Preferred Investment Destination"
              sx={{
                mb: 3,
                backgroundColor: "rgba(255, 170, 0, 0.15)",
                color: "#FFAA00",
                fontWeight: 700,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                border: "1px solid rgba(255, 170, 0, 0.35)",
                backdropFilter: "blur(8px)",
              }}
            />

            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.75rem" },
                fontFamily: "var(--font-poppins)",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                maxWidth: "760px",
                lineHeight: 1.1,
              }}
            >
              Invest in Anambra State
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.92)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                maxWidth: "640px",
                mb: 5,
              }}
            >
              Nigeria&apos;s commercial heartbeat. A strategic location, vibrant
              markets, a skilled and entrepreneurial workforce, and
              investor-friendly policies make Anambra the smart choice for your
              next investment.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ flexWrap: "wrap" }}
            >
              <Button
                variant="contained"
                size="large"
                href="mailto:investment@commerce.anambrastate.gov.ng"
                startIcon={<Email />}
                sx={{
                  backgroundColor: "#FFAA00",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: "0 6px 16px rgba(15, 23, 42, 0.18)",
                  "&:hover": {
                    backgroundColor: "#e09600",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.24)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Start Your Investment
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/contact"
                endIcon={<ChevronRight />}
                sx={{
                  borderColor: "rgba(255,255,255,0.55)",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#FFAA00",
                    color: "#FFAA00",
                    backgroundColor: "rgba(255,255,255,0.06)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Talk to an Advisor
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Why Invest in Anambra */}
      <Box id="why-anambra" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FFFDF5" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#FFAA00",
                fontWeight: 800,
                letterSpacing: "2px",
                fontSize: "0.8rem",
              }}
            >
              WHY ANAMBRA
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 1.5,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: { xs: "2rem", md: "2.75rem" },
                color: "#1E293B",
                lineHeight: 1.15,
              }}
            >
              A Compelling Investment Case
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "680px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Anambra State combines the fundamentals investors look for —
              location, talent, market access, security, and a government
              committed to private-sector-led growth.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {whyAnambra.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  p: 1,
                  border: "1px solid #f1f5f9",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.1)",
                    borderColor: "rgba(255, 170, 0, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box
                    sx={{
                      width: 68,
                      height: 68,
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 170, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontFamily: "var(--font-poppins)",
                      color: "#1E293B",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Anambra At A Glance */}
      <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: "#FFAA00" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 3, md: 4 },
              textAlign: "center",
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "var(--font-poppins)",
                    color: "white",
                    fontSize: { xs: "2.25rem", md: "3rem" },
                    mb: 1,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Investment Opportunities */}
      <Box id="opportunities" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FFFDF5" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#FFAA00",
                fontWeight: 800,
                letterSpacing: "2px",
                fontSize: "0.8rem",
              }}
            >
              INVESTMENT OPPORTUNITIES
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 1.5,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: { xs: "2rem", md: "2.75rem" },
                color: "#1E293B",
                lineHeight: 1.15,
              }}
            >
              High-Potential Sectors
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "680px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              From commerce to agriculture, manufacturing to technology — Anambra
              offers diverse, high-return investment opportunities across
              priority sectors.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {sectors.map((sector, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.1)",
                    borderColor: "rgba(255, 170, 0, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 170, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {sector.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontFamily: "var(--font-poppins)",
                      color: "#1E293B",
                      fontSize: "1.1rem",
                    }}
                  >
                    {sector.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.75,
                      fontSize: "0.92rem",
                    }}
                  >
                    {sector.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Ease of Doing Business / Investor Support */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f8fafc" }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} lg={5}>
              <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", boxShadow: "0 20px 50px -15px rgba(15,23,42,0.18)" }}>
                <Box sx={{ position: "relative", height: { xs: 320, md: 460 } }}>
                  <Image
                    src="/images/images1.jpg"
                    alt="Anambra business environment"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Typography
                variant="overline"
                sx={{
                  color: "#FFAA00",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  fontSize: "0.8rem",
                }}
              >
                EASE OF DOING BUSINESS
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mt: 1.5,
                  mb: 3,
                  fontFamily: "var(--font-poppins)",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "#1E293B",
                  lineHeight: 1.15,
                }}
              >
                Investor Support Designed for Growth
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  mb: 4,
                }}
              >
                We are committed to making Anambra the easiest place to do
                business in Nigeria. Our Investment Promotion Department offers
                a full suite of support services to guide investors at every
                stage of their journey.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                {investorServices.map((service, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2.5,
                        backgroundColor: "rgba(255, 170, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          fontFamily: "var(--font-poppins)",
                          color: "#1E293B",
                          mb: 0.5,
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.7, fontSize: "0.92rem" }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Investment Process */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FFFDF5" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#FFAA00",
                fontWeight: 800,
                letterSpacing: "2px",
                fontSize: "0.8rem",
              }}
            >
              HOW TO INVEST
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 1.5,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: { xs: "2rem", md: "2.75rem" },
                color: "#1E293B",
                lineHeight: 1.15,
              }}
            >
              Your Investment Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "680px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              A clear, supportive path from idea to operations — designed to get
              your investment up and running without unnecessary delays.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 3,
            }}
          >
            {investmentSteps.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  backgroundColor: "white",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.1)",
                    borderColor: "rgba(255, 170, 0, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontFamily: "var(--font-poppins)",
                      color: "rgba(255, 170, 0, 0.25)",
                      fontSize: "2.75rem",
                      lineHeight: 1,
                      mb: 2,
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontFamily: "var(--font-poppins)",
                      color: "#1E293B",
                      fontSize: "1.05rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.75,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Success Stories */}
      <Box
        id="success-stories"
        sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#1E293B" }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#FFAA00",
                fontWeight: 800,
                letterSpacing: "2px",
                fontSize: "0.8rem",
              }}
            >
              SUCCESS STORIES
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 1.5,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: { xs: "2rem", md: "2.75rem" },
                color: "white",
                lineHeight: 1.15,
              }}
            >
              Investors Who Chose Anambra
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.75)",
                maxWidth: "680px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Hear from businesses that have thrived by investing in Anambra
              State.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {successStories.map((story, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ mb: 3, color: "#FFAA00" }}>
                    <Star sx={{ fontSize: "1.5rem" }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                      mb: 4,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </Typography>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      color: "white",
                    }}
                  >
                    {story.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#FFAA00", fontWeight: 500, mt: 0.5 }}
                  >
                    {story.sector}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 11 },
          backgroundColor: "#FFAA00",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: 800,
                  fontFamily: "var(--font-poppins)",
                  mb: 1.5,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  lineHeight: 1.2,
                }}
              >
                Ready to Invest in Anambra State?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  maxWidth: "620px",
                  fontSize: "1.05rem",
                }}
              >
                Let our Investment Promotion team help you turn your investment
                vision into reality. Reach out today for a confidential
                consultation and tailored support.
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                href="mailto:investment@commerce.anambrastate.gov.ng"
                sx={{
                  backgroundColor: "#1E293B",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.18)",
                  "&:hover": {
                    backgroundColor: "#0f172a",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Email Investment Team
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Phone />}
                href="tel:+2348134234570"
                sx={{
                  borderColor: "rgba(255,255,255,0.6)",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Call +234 813 423 4570
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: { xs: 5, md: 7 } }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <CheckCircle sx={{ color: "white", fontSize: "1.5rem", mt: 0.25 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 700, fontFamily: "var(--font-poppins)" }}
                >
                  Confidential Consultation
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Discuss your project with our advisors in complete confidence.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <CheckCircle sx={{ color: "white", fontSize: "1.5rem", mt: 0.25 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 700, fontFamily: "var(--font-poppins)" }}
                >
                  Tailored Incentive Guidance
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Learn about incentives applicable to your sector and project.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <CheckCircle sx={{ color: "white", fontSize: "1.5rem", mt: 0.25 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 700, fontFamily: "var(--font-poppins)" }}
                >
                  End-to-End Facilitation
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  From inquiry to launch, we are with you at every step.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

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
  Chip,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  Home,
  ArrowForward,
  AccountBalance,
  Description,
  HowToReg,
  SupportAgent,
  TrendingUp,
  Shield,
  Schedule,
  Email,
  Phone,
  ChevronRight,
} from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Loan & Grants | Anambra State Ministry of Commerce",
  description:
    "Coming Soon — Access financial support, loans, and grant opportunities for MSMEs and cooperatives in Anambra State through the Ministry of Commerce.",
  keywords: [
    "Anambra State",
    "Loan",
    "Grants",
    "MSME Funding",
    "Financial Support",
    "Ministry of Commerce",
    "Small Business Loans",
    "Cooperative Grants",
    "Anambra Business",
  ],
  openGraph: {
    title: "Loan & Grants | Anambra State Ministry of Commerce",
    description:
      "Coming Soon — Financial support, loans, and grant opportunities for Anambra State businesses.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan & Grants | Anambra State Ministry of Commerce",
    description:
      "Coming Soon — Financial support, loans, and grant opportunities for Anambra State businesses.",
  },
};

const comingSoonFeatures = [
  {
    icon: <AccountBalance sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Low-Interest Loans",
    description:
      "Access affordable credit facilities tailored for micro, small, and medium-scale enterprises across Anambra State.",
  },
  {
    icon: <Description sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Government Grants",
    description:
      "Explore grant programs designed to empower entrepreneurs, women-owned businesses, and cooperative societies.",
  },
  {
    icon: <HowToReg sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Simplified Application",
    description:
      "A step-by-step digital application process with eligibility checks, document uploads, and status tracking.",
  },
  {
    icon: <SupportAgent sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Dedicated Support",
    description:
      "Receive guidance from our financial inclusion team to help you prepare and submit winning applications.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Enterprise Growth",
    description:
      "Programs specifically designed to scale businesses, create jobs, and drive economic prosperity in Anambra.",
  },
  {
    icon: <Shield sx={{ fontSize: "2rem", color: "#D4AF37" }} />,
    title: "Transparent Processes",
    description:
      "Clear criteria, open timelines, and honest communication at every stage of the review and disbursement cycle.",
  },
];

export default function LoanGrantsPage() {
  return (
    <Box>
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/ch3.png"
            alt="Loan & Grants"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(212, 175, 55, 0.75)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ py: { xs: 6, md: 10 } }}>
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
                  "&:hover": { color: "#D4AF37" },
                }}
              >
                <Home fontSize="small" />
                Home
              </Link>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                Services
              </Typography>
              <Typography sx={{ color: "#D4AF37", fontWeight: 600 }}>
                Loan & Grants
              </Typography>
            </Breadcrumbs>

            <Chip
              icon={<Schedule />}
              label="Coming Soon"
              sx={{
                mb: 3,
                backgroundColor: "rgba(212, 175, 55, 0.2)",
                color: "#D4AF37",
                fontWeight: 700,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                border: "1px solid rgba(212, 175, 55, 0.4)",
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
                textShadow: "0 4px 12px rgba(0,0,0,0.25)",
                maxWidth: "720px",
              }}
            >
              Loan & Grants
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.92)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                maxWidth: "640px",
              }}
            >
              Empowering Anambra businesses with accessible financing. We are
              putting the finishing touches on a comprehensive platform that
              will connect MSMEs and cooperatives to loans and grants — launching very soon.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Coming Soon Status Card */}
      <Container maxWidth="xl" sx={{ mt: -8, mb: 10, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            background: "linear-gradient(135deg, #ffffff 0%, #fffdf5 100%)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "5fr 4fr" },
            }}
          >
            {/* Left: Status & Description */}
            <Box sx={{ p: { xs: 4, md: 7 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#D4AF37",
                    boxShadow: "0 0 0 6px rgba(212, 175, 55, 0.15)",
                    animation: "coming-soon-pulse 1.8s infinite",
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: "#D4AF37",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    fontSize: "0.8rem",
                  }}
                >
                  FINALIZING DEVELOPMENT
                </Typography>
              </Stack>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontFamily: "var(--font-poppins)",
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  lineHeight: 1.15,
                  color: "#D4AF37",
                }}
              >
                A Financial Gateway for Anambra Enterprises
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  mb: 4,
                }}
              >
                Our Loan & Grants portal will be the single destination for
                businesses in Anambra State to discover, apply for, and manage
                government-backed financing opportunities. From micro-credit to
                sizable expansion grants, every program is crafted to accelerate
                the growth of local enterprise and create shared prosperity.
              </Typography>

              <Divider sx={{ mb: 4 }} />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="/contact"
                  endIcon={<ChevronRight />}
                  sx={{
                    backgroundColor: "#D4AF37",
                    color: "white",
                    px: 3.5,
                    py: 1.6,
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: "0 6px 16px rgba(212, 175, 55, 0.35)",
                    "&:hover": {
                      backgroundColor: "#b8972e",
                      transform: "translateY(-1px)",
                      boxShadow: "0 10px 24px rgba(212, 175, 55, 0.45)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  Contact Us for Enquiries
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/"
                  endIcon={<Home />}
                  sx={{
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                    px: 3.5,
                    py: 1.6,
                    fontWeight: 700,
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#b8972e",
                      backgroundColor: "rgba(212, 175, 55, 0.06)",
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Stack>
            </Box>

            {/* Right: Illustration / Image */}
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: "320px", lg: "100%" },
                backgroundColor: "#D4AF37",
              }}
            >
              <Image
                src="/images/soludo33.jpg"
                alt="Anambra State Prosperity"
                fill
                style={{ objectFit: "cover", opacity: 0.9 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.25) 100%)",
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* What to Expect */}
      <Container maxWidth="xl" sx={{ pb: 10 }}>
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#D4AF37",
              fontWeight: 800,
              letterSpacing: "2px",
              fontSize: "0.8rem",
            }}
          >
            WHAT TO EXPECT
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mt: 1.5,
              mb: 2.5,
              fontFamily: "var(--font-poppins)",
              fontSize: { xs: "2rem", md: "2.75rem" },
              color: "#1E293B",
            }}
          >
            Features on the Way
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "640px",
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1.05rem",
            }}
          >
            A carefully designed experience to help every qualified Anambra
            business find and secure the funding it deserves.
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
          {comingSoonFeatures.map((feature, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 5,
                p: 1,
                border: "1px solid #f1f5f9",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 18px 40px -10px rgba(212, 175, 55, 0.15)",
                  borderColor: "rgba(212, 175, 55, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: 3,
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    fontFamily: "var(--font-poppins)",
                    color: "#D4AF37",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Contact CTA Strip */}
      <Box
        sx={{
          backgroundColor: "#D4AF37",
          py: { xs: 6, md: 8 },
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
              "radial-gradient(circle at top right, rgba(212,175,55,0.18), transparent 60%)",
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
                }}
              >
                Need Assistance Before Launch?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.88)",
                  lineHeight: 1.8,
                  maxWidth: "600px",
                }}
              >
                Our team is ready to answer your questions about upcoming loan
                and grant programs. Reach out today and we will keep you
                informed as soon as the portal goes live.
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Email />}
                href="mailto:info@commerce.anambrastate.gov.ng"
                sx={{
                  backgroundColor: "#D4AF37",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
                  "&:hover": {
                    backgroundColor: "#b8972e",
                  },
                }}
              >
                Email Us
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Phone />}
                href="tel:+2348134234567"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  px: 3.5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#D4AF37",
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                  },
                }}
              >
                Call +234 813 423 4567
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import LastUpdatedLabel from "@/components/ui/LastUpdatedLabel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of the Anambra State Ministry of Commerce integrated digital portal — how we collect, use, store and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const primaryGreen = "#FFAA00";
const accentColor = "#FFAA00";

const STATIC_LAST_UPDATED = "October 10, 2026";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontFamily: "var(--font-poppins)",
        fontWeight: 700,
        fontSize: { xs: "1.4rem", md: "1.65rem" },
        color: "#0F172A",
        mb: 2,
        scrollMarginTop: 110,
      }}
    >
      {children}
    </Typography>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body1"
      sx={{
        color: "#334155",
        lineHeight: 1.9,
        mb: 2,
        fontSize: { xs: "0.95rem", md: "1.02rem" },
      }}
    >
      {children}
    </Typography>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#FFFDF5" }}>
      <TopBar />
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 6, md: 10 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${primaryGreen} 0%, #CC8800 100%)`,
            color: "white",
            py: { xs: 6, md: 9 },
            mb: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={1.5}>
              <Typography
                variant="overline"
                sx={{
                  color: accentColor,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  fontSize: "0.85rem",
                }}
              >
                Legal Information
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.15,
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: 720,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                }}
              >
                Last updated: <LastUpdatedLabel fallback={STATIC_LAST_UPDATED} />
              </Typography>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Stack spacing={5}>
            <section id="introduction">
              <SectionTitle>1. Introduction</SectionTitle>
              <Paragraph>
                The Anambra State Ministry of Commerce (&quot;the Ministry&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) is committed to protecting the privacy and security of personal information submitted by users of this integrated digital portal (the &quot;Portal&quot;).
              </Paragraph>
              <Paragraph>
                This Privacy Policy explains what personal data we collect, why we collect it, how we use and store it, the lawful basis for processing, the rights you have regarding your data, and how to contact us about privacy-related enquiries.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="information-we-collect">
              <SectionTitle>2. Information We Collect</SectionTitle>
              <Paragraph>
                We collect information that you voluntarily provide when you use our services, including but not limited to:
              </Paragraph>
              <Box component="ul" sx={{ pl: 3.5, mb: 2 }}>
                <Typography component="li" sx={{ color: "#334155", lineHeight: 2, fontSize: "1rem" }}>
                  <strong>Registration information:</strong> full name, email address, phone number, postal address, Government-issued identification details, business name and address, cooperative member details, and other information required to complete Business, SME, MSME or Cooperative registration applications.
                </Typography>
                <Typography component="li" sx={{ color: "#334155", lineHeight: 2, fontSize: "1rem", mt: 1 }}>
                  <strong>Uploaded documents:</strong> scanned copies of certificates, means of identification, utility bills, passport photographs, constitutions, minutes of meetings and other supporting documents you submit via the Portal.
                </Typography>
                <Typography component="li" sx={{ color: "#334155", lineHeight: 2, fontSize: "1rem", mt: 1 }}>
                  <strong>Communications data:</strong> enquiries, complaints, feedback and correspondence submitted through the contact forms, email, telephone or newsletter subscription.
                </Typography>
                <Typography component="li" sx={{ color: "#334155", lineHeight: 2, fontSize: "1rem", mt: 1 }}>
                  <strong>Automatically-collected data:</strong> device type, browser information, IP address (pseudonymised where possible), referring and exit pages, approximate location at state/regional level, and click-stream analytics to improve Portal performance.
                </Typography>
              </Box>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="how-we-use-information">
              <SectionTitle>3. How We Use Your Information</SectionTitle>
              <Paragraph>
                Your personal data is processed strictly for the purposes for which it was collected, including: processing registration applications, issuing certificates and permits, verifying application details, communicating application status, responding to enquiries and support requests, delivering newsletter updates (where you have expressly opted in), maintaining Portal security and integrity, conducting internal audits, and complying with applicable Nigerian laws including the Nigeria Data Protection Act 2023 (NDPA).
              </Paragraph>
              <Paragraph>
                We do not sell, rent or trade your personal data to any third party for commercial marketing purposes.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="legal-basis">
              <SectionTitle>4. Lawful Basis for Processing</SectionTitle>
              <Paragraph>
                We process personal data on one or more of the following lawful bases: performance of a public task carried out in the exercise of official authority vested in the Ministry; performance of a contract with you or to take steps at your request prior to entering into a contract; compliance with a legal obligation to which the Ministry is subject; your explicit consent where required; and, where necessary, the legitimate interests of the Ministry, provided such interests do not override your fundamental rights and freedoms.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="data-sharing">
              <SectionTitle>5. Data Sharing &amp; Disclosure</SectionTitle>
              <Paragraph>
                We may share your information only with authorised parties strictly on a need-to-know basis, including: authorised employees and officers of the Ministry and relevant Anambra State Government agencies processing registration applications; third-party processors providing cloud hosting, document storage, email delivery, payment processing and analytics services — all bound by written data protection agreements; law enforcement agencies, courts and regulators where required or permitted by law; and, with your explicit written consent, other parties for purposes you have approved.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="data-security">
              <SectionTitle>6. Data Security</SectionTitle>
              <Paragraph>
                We implement appropriate administrative, technical and organisational security measures to protect personal data against unauthorised access, alteration, disclosure, loss or destruction. These measures include encrypted data transmission (HTTPS/TLS), role-based access controls, encryption of sensitive data at rest, regular vulnerability assessments, secure cloud hosting with industry-leading providers, and staff training on data protection.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="data-retention">
              <SectionTitle>7. Data Retention</SectionTitle>
              <Paragraph>
                We retain personal data only for as long as is necessary to fulfil the purposes for which it was collected, to comply with legal, accounting and reporting obligations, and to resolve any disputes. Registration records are generally retained for the lifetime of the registered entity plus a minimum retention period required by applicable law. Anonymised analytical data may be retained for longer to support evidence-based policy.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="your-rights">
              <SectionTitle>8. Your Rights</SectionTitle>
              <Paragraph>
                Subject to applicable law, you may have the right to: access the personal information we hold about you; request rectification of inaccurate or incomplete data; request erasure of your data (&quot;right to be forgotten&quot;), where no overriding legal obligation to retain applies; restrict or object to processing; request data portability in a commonly-used machine-readable format; withdraw any consent previously provided, without affecting the lawfulness of processing carried out before withdrawal; and, lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your privacy rights have been violated.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="cookies">
              <SectionTitle>9. Cookies &amp; Similar Technologies</SectionTitle>
              <Paragraph>
                The Portal uses strictly necessary cookies to enable core functionality including session management and authentication. Optional analytics cookies may be used to help us understand how visitors engage with the Portal, on an opt-in basis only. You can control cookies through your browser settings. Disabling strictly necessary cookies may prevent you from using certain Portal features such as authenticated registration workflows.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="international-transfers">
              <SectionTitle>10. International Transfers</SectionTitle>
              <Paragraph>
                Where data is processed by cloud infrastructure outside Nigeria, we ensure that such transfers are made only with adequate safeguards in place — including the use of NDPC-approved Standard Contractual Clauses, binding corporate rules or adequacy decisions — and in full compliance with the NDPA.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="childrens-privacy">
              <SectionTitle>11. Children&apos;s Privacy</SectionTitle>
              <Paragraph>
                The Portal is not intended for use by children under the age of 18. Registration services require individuals of at least 18 years of age, or minors acting with the explicit consent and supervision of a parent or legally-appointed guardian. If you become aware that we have inadvertently collected personal data from a child without appropriate consent, please contact us immediately so we can take corrective action.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="policy-updates">
              <SectionTitle>12. Updates to This Policy</SectionTitle>
              <Paragraph>
                We may amend this Privacy Policy from time to time to reflect changes in law, regulatory guidance, Portal functionality or data processing practices. Material changes will be notified by posting a prominent notice on the Portal homepage prior to the change taking effect. Your continued use of the Portal after such amendments constitutes acceptance of the revised policy.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="contact">
              <SectionTitle>13. Contact Information</SectionTitle>
              <Paragraph>
                All privacy-related enquiries, data subject access requests and complaints should be directed to:
              </Paragraph>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                    Data Protection Officer — Ministry of Commerce
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#334155" }}>
                    📍 Ministry of Commerce, Government House Complex, Awka, Anambra State, Nigeria
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#334155" }}>
                    ✉️ privacy@commerce.anambrastate.gov.ng
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#334155" }}>
                    📞 +234 (0) 813 423 4567
                  </Typography>
                </Stack>
              </Box>
            </section>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

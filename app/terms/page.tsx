import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import LastUpdatedLabel from "@/components/ui/LastUpdatedLabel";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use governing the Anambra State Ministry of Commerce integrated digital portal. Conditions of use, disclaimers, liability and intellectual property notice.",
  alternates: {
    canonical: "/terms",
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

export default function TermsOfUsePage() {
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
                Terms of Use
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
            <section id="acceptance">
              <SectionTitle>1. Acceptance of Terms</SectionTitle>
              <Paragraph>
                Welcome to the Anambra State Ministry of Commerce integrated digital portal (&quot;the Portal&quot;). By accessing, browsing or using this Portal and any services, features, applications, content or functionality made available herein, you acknowledge that you have read, understood, and unconditionally agree to be bound by these Terms of Use and all applicable laws and regulations, including but not limited to all relevant Anambra State Government and Federal Republic of Nigeria legislation and regulations governing e-Government services.
              </Paragraph>
              <Paragraph>
                If you do not agree to any of these Terms of Use, please discontinue use of the Portal immediately.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="services">
              <SectionTitle>2. Description of Portal Services</SectionTitle>
              <Paragraph>
                The Portal provides electronic access to public services administered by the Anambra State Ministry of Commerce, including but not limited to: online Business Registration, SME Registration, MSME Registration, Cooperative Registration, Permits and Licensing applications, Export Promotion enquiries, Loan and Grants information, news and media publications, ministry departments and units information, and general enquiries.
              </Paragraph>
              <Paragraph>
                Services are provided for informational and transactional purposes and may be updated, modified, suspended or discontinued at any time, with or without prior notice, at the sole discretion of the Ministry.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="eligibility">
              <SectionTitle>3. Eligibility &amp; User Accounts</SectionTitle>
              <Paragraph>
                Use of the Portal and its transactional services is intended for individuals aged 18 years and older with legal capacity to enter into binding obligations under Nigerian law, or duly authorised representatives acting on behalf of a business, cooperative society or government entity. You are responsible for maintaining the confidentiality of any account credentials, session tokens or access codes issued to you, and for all activities conducted under your account. You must notify the Ministry immediately of any unauthorised use of your account or any other suspected security breach.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="user-obligations">
              <SectionTitle>4. User Obligations &amp; Acceptable Use</SectionTitle>
              <Paragraph>
                You agree to use the Portal exclusively for lawful purposes and in a manner consistent with these Terms. You specifically undertake not to: submit false, fraudulent, misleading, incomplete or unlawfully-obtained information; impersonate any person or entity; upload content that infringes third-party intellectual property, privacy or publicity rights; distribute malware, spyware, ransomware, viruses or any code designed to disrupt, damage or limit the functionality of the Portal or any connected system; attempt unauthorised access to restricted areas, other users&apos; accounts, databases or infrastructure; use any automated means (scrapers, robots, spiders, crawlers) except standard search engines operating in compliance with robots.txt and reasonable rate limits; interfere with Portal availability, performance or integrity via denial-of-service or similar attacks; and, use the Portal to solicit, advertise or promote any commercial product, service or activity without the prior written consent of the Ministry.
              </Paragraph>
              <Paragraph>
                Violation of any provision of this section may result in immediate termination of access, referral to appropriate law enforcement authorities and pursuit of available legal and equitable remedies.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="application-processing">
              <SectionTitle>5. Application Processing &amp; Decision-Making</SectionTitle>
              <Paragraph>
                Submission of a registration, permit, licence or other application via the Portal does not guarantee approval. All applications are subject to verification, assessment and discretionary approval by duly authorised officers of the Ministry in accordance with applicable Anambra State laws, regulations, administrative guidelines and published eligibility criteria. The Ministry reserves the right to request additional information, supporting documentation or in-person verification at any stage of the review process. Processing timelines published on the Portal are indicative only and do not constitute a binding commitment.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="fees-payments">
              <SectionTitle>6. Fees &amp; Payments</SectionTitle>
              <Paragraph>
                Where a service is subject to a fee, such fee will be clearly indicated prior to submission of the relevant application. All payments shall be made through the Ministry&apos;s approved payment channels. You are responsible for the accuracy of payment information you supply. Fees are generally non-refundable once an application has entered the substantive review stage, except where a material error is demonstrated to have been made by the Ministry, and subject to the Ministry&apos;s published refund policy.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="ip">
              <SectionTitle>7. Intellectual Property Rights</SectionTitle>
              <Paragraph>
                All content and materials published on the Portal — including but not limited to text, graphics, logos, icons, images, audio-visual materials, data, software, source code, APIs, page layouts, design works, typography, trade dress and compilation of data — are the property of the Anambra State Ministry of Commerce or its duly licenced content providers, and are protected by Nigerian copyright, trademark, database and other intellectual property laws and international treaties.
              </Paragraph>
              <Paragraph>
                Permission is granted to view, download, cache and print Portal content for your personal, non-commercial use or for legitimate dealings with the Ministry, provided that all copyright, trademark and other proprietary notices are retained intact. Reproduction, distribution, public display, modification, reverse engineering, creation of derivative works, framing, deep-linking or commercial exploitation of any Portal content without prior written permission from the Ministry is strictly prohibited.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="user-generated-content">
              <SectionTitle>8. User-Generated Content &amp; Uploads</SectionTitle>
              <Paragraph>
                By submitting, uploading or transmitting any content — including but not limited to application data, documents, photographs, feedback, suggestions and enquiries — via the Portal, you grant the Ministry a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, sub-licensable licence to use, reproduce, store, process, transmit, adapt, publish, display and perform such content solely for the purpose of delivering the services you requested, administering the Portal, fulfilling legal obligations, producing aggregated and anonymised statistical analysis, and improving Ministry services.
              </Paragraph>
              <Paragraph>
                You represent and warrant that you hold all necessary rights and authority to submit such content and that the content does not infringe the rights of any third party.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="external-links">
              <SectionTitle>9. External Links &amp; Third-Party Content</SectionTitle>
              <Paragraph>
                The Portal may contain hyperlinks to websites operated by third parties (other Anambra State Government MDAs, Federal Government agencies, development partners, service providers, reference material sources, etc.). Such external links are provided for your convenience and general information only. The Ministry does not endorse, sponsor, approve, guarantee, verify, or exercise any editorial control over the content, accuracy, completeness, reliability, security, availability, opinions or practices of any third-party website. Access to external links is at your own risk.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="disclaimer">
              <SectionTitle>10. Disclaimers of Warranty</SectionTitle>
              <Paragraph>
                The Portal and all content, services, information, materials and functionality are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranty of any kind, express or implied. To the fullest extent permitted by applicable law, the Ministry expressly disclaims all warranties — express, implied, statutory or otherwise — including but not limited to warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, completeness, reliability, availability, uninterrupted service, freedom from errors, viruses or other harmful components, and security of information transmitted through or stored on the Portal.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="liability">
              <SectionTitle>11. Limitation of Liability</SectionTitle>
              <Paragraph>
                To the fullest extent permitted by applicable law, under no circumstances shall the Anambra State Ministry of Commerce, its officers, employees, agents, contractors, partners, or data processors be liable for any direct, indirect, incidental, special, consequential, exemplary, punitive or any other damages whatsoever — including but not limited to damages for loss of profits, revenue, goodwill, business, opportunity, savings, data, use or other intangible losses, procurement of substitute goods or services, or business interruption — arising out of or in any way connected with the use of, inability to use, or reliance upon the Portal, any content, information, service, error, omission, delay, interruption, system failure, data breach, deletion or corruption of files, even if advised of the possibility of such damages.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="indemnification">
              <SectionTitle>12. Indemnification</SectionTitle>
              <Paragraph>
                You agree to defend, indemnify and hold harmless the Anambra State Ministry of Commerce, its Commissioners, Permanent Secretaries, Directors, officers, employees, agents, representatives, contractors, licensors and service providers from and against any and all claims, liabilities, losses, damages, fines, penalties, costs and expenses (including reasonable legal and professional fees) arising out of, resulting from, or in any way connected with: your use of or inability to use the Portal; your breach of these Terms of Use; your violation of any applicable law, regulation, or third-party right; any content, data or information you submit, upload or transmit via the Portal; or any activity conducted under your account whether by you or any third party.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="severability">
              <SectionTitle>13. Severability</SectionTitle>
              <Paragraph>
                If any provision of these Terms of Use is held to be unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, such provision shall be deemed severable from the remaining Terms and shall not affect the validity and enforceability of any remaining provisions, which shall continue in full force and effect.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="governing-law">
              <SectionTitle>14. Governing Law &amp; Jurisdiction</SectionTitle>
              <Paragraph>
                These Terms of Use and any dispute, claim or controversy (including non-contractual disputes) arising out of or relating to them, their subject matter, the Portal or the services herein shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. The courts of Anambra State, Nigeria, shall have exclusive jurisdiction to settle any such dispute, claim or controversy.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="updates">
              <SectionTitle>15. Modifications to Terms</SectionTitle>
              <Paragraph>
                The Ministry reserves the right to update, modify or replace these Terms of Use at any time by publishing the revised version on the Portal with an updated &quot;Last updated&quot; date. Material changes will be notified by a prominent notice on the Portal homepage. Your continued use of the Portal after any changes take effect constitutes acceptance of the revised Terms.
              </Paragraph>
            </section>

            <Divider sx={{ backgroundColor: "#E2E8F0" }} />

            <section id="contact">
              <SectionTitle>16. Contact for Terms of Use Enquiries</SectionTitle>
              <Paragraph>
                Questions, comments or concerns regarding these Terms of Use should be directed to:
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
                    Legal Unit — Ministry of Commerce
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#334155" }}>
                    📍 Ministry of Commerce, Government House Complex, Awka, Anambra State, Nigeria
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#334155" }}>
                    ✉️ legal@commerce.anambrastate.gov.ng
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

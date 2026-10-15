import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Box } from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://commerce.anambrastate.gov.ng";

const DEFAULT_OG_IMAGE =
  "https://commerce.anambrastate.gov.ng/images/soludohead.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Anambra State Ministry of Commerce",
    template: "%s | Anambra State Ministry of Commerce",
  },
  description:
    "Building a Thriving Commerce and Investment Ecosystem in Anambra State. Promoting trade, investment, enterprise development, industrial growth, and consumer protection.",
  keywords: [
    "Anambra State",
    "Ministry of Commerce",
    "Commerce Anambra",
    "SME Registration",
    "MSME Registration",
    "Cooperative Registration",
    "Business Registration Nigeria",
    "Invest Anambra",
    "Anambra Trade",
    "Anambra Investment",
    "Government Portal Nigeria",
    "Anambra State Government",
    "Permits and Licensing",
    "Export Promotion Nigeria",
  ],
  authors: [{ name: "Anambra State Ministry of Commerce", url: BASE_URL }],
  creator: "Anambra State Ministry of Commerce",
  publisher: "Anambra State Ministry of Commerce",
  category: "government",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Anambra State Ministry of Commerce",
    title: "Anambra State Ministry of Commerce",
    description:
      "Building a Thriving Commerce and Investment Ecosystem in Anambra State.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Anambra State Ministry of Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anambra State Ministry of Commerce",
    description:
      "Building a Thriving Commerce and Investment Ecosystem in Anambra State.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/anambralogo.jpg",
    shortcut: "/images/anambralogo.jpg",
    apple: "/images/anambralogo.jpg",
  },
  manifest: undefined,
};

export const viewport: Viewport = {
  themeColor: "#FFAA00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .skip-link {
            position: absolute !important;
            left: -9999px !important;
            top: auto !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
            z-index: 9999 !important;
          }
          .skip-link:focus {
            left: 16px !important;
            top: 16px !important;
            width: auto !important;
            height: auto !important;
            padding: 12px 20px !important;
            background: #FFAA00 !important;
            color: #FFFFFF !important;
            border-radius: 8px !important;
            font-family: var(--font-poppins), sans-serif !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeRegistry>
          <Box component="a" href="#main-content" className="skip-link">
            Skip to main content
          </Box>
          <Box component="main" id="main-content" role="main">
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}

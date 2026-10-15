import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://commerce.anambrastate.gov.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: string[] = [
    "/",
    "/about",
    "/contact",
    "/media",
    "/search",
    "/privacy",
    "/terms",
    "/services",
    "/invest-in-anambra",
    "/services/business-registration",
    "/services/business-registration/register",
    "/services/cooperative-registration",
    "/services/cooperative-registration/register",
    "/services/msme-registration",
    "/services/msme-registration/register",
    "/services/sme-registration",
    "/services/sme-registration/register",
    "/services/export-promotion",
    "/services/loan-grants",
    "/services/permit-licensing",
    "/departments/commerce",
    "/departments/cooperatives",
    "/departments/trade-industry",
    "/departments/investment-promotion",
    "/departments/inspectorate-and-monitoring",
    "/departments/administration-and-human-resource",
    "/departments/finance-and-account",
    "/units/agribusiness-support",
    "/units/procurement",
    "/units/public-affairs",
    "/units/audit",
    "/units/ict",
    "/units/legal",
    "/units/planning",
  ];

  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority:
      route === "/"
        ? 1
        : route.startsWith("/services/business") ||
          route.startsWith("/services/cooperative") ||
          route.startsWith("/services/msme") ||
          route.startsWith("/services/sme")
        ? 0.9
        : route === "/about" || route === "/contact" || route === "/media"
        ? 0.8
        : route.startsWith("/departments") || route.startsWith("/units")
        ? 0.7
        : 0.6,
  }));
}

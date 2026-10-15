import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://commerce.anambrastate.gov.ng";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/services/*/register",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/services/*/register",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/services/*/register",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

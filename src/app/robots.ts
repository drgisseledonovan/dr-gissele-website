import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/* /robots.txt — generated at build time.
   Currently allows all crawlers and points to the sitemap. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

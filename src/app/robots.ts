import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/en", "/zh", "/"],
    },
    sitemap: "https://wanghongming.xyz/sitemap.xml",
  };
}

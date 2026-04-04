import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/blog";

const baseUrl = "https://wanghongming.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate entries for each locale with full hreflang alternates
  const localeEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
        "x-default": `${baseUrl}/en`,
      },
    },
  }));

  // Also include the root URL pointing to the default locale
  const rootEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
        "x-default": `${baseUrl}/en`,
      },
    },
  };

  // Blog listing pages
  const blogListingEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog`])
        ),
        "x-default": `${baseUrl}/en/blog`,
      },
    },
  }));

  // Individual blog post pages
  const posts = getAllPosts();
  const blogPostEntries = posts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`])
          ),
          "x-default": `${baseUrl}/en/blog/${post.slug}`,
        },
      },
    }))
  );

  return [rootEntry, ...localeEntries, ...blogListingEntries, ...blogPostEntries];
}

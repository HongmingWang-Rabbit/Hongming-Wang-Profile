import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { siteConfig, personalInfo } from "@/lib/constants";
import {
  getAllSlugs,
  getPostBySlug,
  getPostTitle,
  getPostSubtitle,
  getReadingTime,
} from "@/lib/blog";
import { BlogPostClient } from "@/components/sections/blog-post";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const post = getPostBySlug(slug);

  if (!post) return {};

  const dict = await getDictionary(validLocale);
  const title = getPostTitle(post, validLocale);
  const description = getPostSubtitle(post, validLocale);
  const readTime = getReadingTime(post, validLocale);

  return {
    title,
    description,
    authors: [{ name: personalInfo.name, url: siteConfig.url }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog/${slug}`,
      languages: {
        en: `${siteConfig.url}/en/blog/${slug}`,
        zh: `${siteConfig.url}/zh/blog/${slug}`,
        "x-default": `${siteConfig.url}/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      title,
      description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [personalInfo.name],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: title }]
        : [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@" + personalInfo.name.replace(/\s/g, ""),
    },
  };
}

// JSON-LD for blog article
function generateArticleJsonLd(
  slug: string,
  locale: string,
  post: NonNullable<ReturnType<typeof getPostBySlug>>,
  validLocale: Locale
) {
  const baseUrl = siteConfig.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${baseUrl}/${locale}/blog/${slug}/#article`,
    headline: getPostTitle(post, validLocale),
    description: getPostSubtitle(post, validLocale),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: personalInfo.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: personalInfo.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${slug}`,
    },
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    keywords: post.tags.join(", "),
    wordCount:
      post.content[validLocale].split(/\s+/).length,
    timeRequired: `PT${getReadingTime(post, validLocale)}M`,
    url: `${baseUrl}/${locale}/blog/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "zh" ? "首页" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "zh" ? "博客" : "Blog",
        item: `${baseUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: getPostTitle(post, validLocale),
        item: `${baseUrl}/${locale}/blog/${slug}`,
      },
    ],
  };

  return [articleSchema, breadcrumbSchema];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLdSchemas = generateArticleJsonLd(slug, locale, post, validLocale);

  return (
    <>
      {/* JSON-LD for Article */}
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogPostClient post={post} locale={validLocale} />
    </>
  );
}

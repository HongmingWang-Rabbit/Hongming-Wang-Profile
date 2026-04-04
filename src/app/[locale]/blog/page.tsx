import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { BlogListingClient } from "@/components/sections/blog-listing";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isValidLocale(locale) ? locale : "en");

  const title = `${dict.blog.title} ${dict.blog.titleHighlight}`;
  const description = dict.blog.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog`,
      languages: {
        en: `${siteConfig.url}/en/blog`,
        zh: `${siteConfig.url}/zh/blog`,
        "x-default": `${siteConfig.url}/en/blog`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: `${siteConfig.url}/${locale}/blog`,
      title,
      description,
      siteName: siteConfig.name,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const posts = getAllPosts();

  return <BlogListingClient posts={posts} locale={validLocale} />;
}

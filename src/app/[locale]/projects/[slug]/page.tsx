import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { siteConfig, personalInfo } from "@/lib/constants";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { ProjectDetailClient } from "@/components/sections/project-detail";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const title = `${project.title} — ${project.tagline[validLocale]}`;
  const description = project.description[validLocale];
  const ogImage = project.screenshots[0]?.src ?? siteConfig.ogImage;

  return {
    title,
    description,
    authors: [{ name: personalInfo.name, url: siteConfig.url }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/projects/${slug}`,
      languages: {
        en: `${siteConfig.url}/en/projects/${slug}`,
        zh: `${siteConfig.url}/zh/projects/${slug}`,
        "x-default": `${siteConfig.url}/en/projects/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `${siteConfig.url}/${locale}/projects/${slug}`,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@" + personalInfo.name.replace(/\s/g, ""),
    },
  };
}

function generateProjectJsonLd(
  slug: string,
  locale: string,
  project: NonNullable<ReturnType<typeof getProjectBySlug>>,
  validLocale: Locale
) {
  const baseUrl = siteConfig.url;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/${locale}/projects/${slug}/#project`,
    name: project.title,
    description: project.description[validLocale],
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: project.live ?? `${baseUrl}/${locale}/projects/${slug}`,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: personalInfo.name,
      url: baseUrl,
    },
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    keywords: project.technologies.join(", "),
    image: project.screenshots.map((s) => `${baseUrl}${s.src}`),
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
        name: locale === "zh" ? "项目" : "Projects",
        item: `${baseUrl}/${locale}#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/${locale}/projects/${slug}`,
      },
    ],
  };

  return [projectSchema, breadcrumbSchema];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLdSchemas = generateProjectJsonLd(slug, locale, project, validLocale);

  return (
    <>
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ProjectDetailClient project={project} locale={validLocale} />
    </>
  );
}

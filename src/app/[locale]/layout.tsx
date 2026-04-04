import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Chatbot } from "@/components/ui/chatbot";
import { DictionaryProvider } from "@/i18n/dictionary-provider";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { siteConfig, personalInfo } from "@/lib/constants";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

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

  const ogLocale = locale === "zh" ? "zh_CN" : "en_US";
  const alternateLocale = locale === "zh" ? "en_US" : "zh_CN";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.seo.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.seo.description,
    keywords:
      locale === "zh"
        ? [
            "全栈开发工程师",
            "React 开发者",
            "Next.js 开发者",
            "TypeScript",
            "Web3 开发者",
            "DeFi 开发",
            "前端开发工程师",
            "温哥华开发者",
            "软件工程师",
            "王弘铭",
            "区块链开发",
            "SaaS 开发",
          ]
        : [
            "Full-Stack Developer",
            "React Developer",
            "Next.js Developer",
            "TypeScript",
            "Web3 Developer",
            "DeFi Developer",
            "Frontend Developer",
            "Vancouver Developer",
            "Software Engineer",
            "Hongming Wang",
            "Blockchain Developer",
            "SaaS Developer",
          ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        "en": `${siteConfig.url}/en`,
        "zh": `${siteConfig.url}/zh`,
        "x-default": `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocale,
      url: `${siteConfig.url}/${locale}`,
      title: dict.seo.title,
      description: dict.seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: dict.seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.title,
      description: dict.seo.description,
      images: [{ url: siteConfig.ogImage, alt: dict.seo.ogImageAlt }],
      creator: "@" + personalInfo.name.replace(/\s/g, ""),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    category: "technology",
  };
}

// JSON-LD structured data for the page
function generateJsonLd(locale: string, dict: Awaited<ReturnType<typeof getDictionary>>) {
  const baseUrl = siteConfig.url;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: personalInfo.name,
    alternateName: locale === "zh" ? "王弘铭" : undefined,
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}${siteConfig.ogImage}`,
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    jobTitle: dict.seo.jsonLd.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: "Honeypot Finance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "British Columbia Institute of Technology (BCIT)",
    },
    knowsAbout: dict.seo.jsonLd.knowsAbout.split(", "),
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: personalInfo.name,
    description: dict.seo.description,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    author: { "@id": `${baseUrl}/#person` },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/${locale}/#webpage`,
    url: `${baseUrl}/${locale}`,
    name: dict.seo.title,
    description: dict.seo.description,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#person` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: dict.nav.home,
          item: `${baseUrl}/${locale}`,
        },
      ],
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/${locale}/#profilepage`,
    url: `${baseUrl}/${locale}`,
    name: dict.seo.title,
    mainEntity: { "@id": `${baseUrl}/#person` },
  };

  return [personSchema, websiteSchema, webPageSchema, profilePageSchema];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);
  const jsonLdSchemas = generateJsonLd(locale, dictionary);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <DictionaryProvider dictionary={dictionary} locale={locale as Locale}>
            <CustomCursor />
            {children}
            <Chatbot />
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

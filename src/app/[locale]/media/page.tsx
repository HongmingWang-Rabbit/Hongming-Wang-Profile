import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/i18n/config";
import { siteConfig, personalInfo } from "@/lib/constants";
import { getAllMedia, mediaChannelUrl, getYoutubeWatchUrl } from "@/lib/media";
import { MediaListingClient } from "@/components/sections/media-listing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(validLocale);

  const title = `${dict.media.title} ${dict.media.titleHighlight}`;
  const description = dict.media.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/media`,
      languages: {
        en: `${siteConfig.url}/en/media`,
        zh: `${siteConfig.url}/zh/media`,
        "x-default": `${siteConfig.url}/en/media`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `${siteConfig.url}/${locale}/media`,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@" + personalInfo.name.replace(/\s/g, ""),
    },
  };
}

function generateMediaJsonLd(locale: string, validLocale: Locale) {
  const baseUrl = siteConfig.url;
  const items = getAllMedia();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/${locale}/media/#videos`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: item.title[validLocale],
        description: item.description[validLocale],
        ...(item.date ? { uploadDate: item.date } : {}),
        thumbnailUrl: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
        contentUrl: getYoutubeWatchUrl(item.id),
        embedUrl: `https://www.youtube.com/embed/${item.id}`,
        author: {
          "@type": "Person",
          name: personalInfo.name,
          url: mediaChannelUrl,
        },
      },
    })),
  };

  return [itemList];
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const jsonLdSchemas = generateMediaJsonLd(locale, validLocale);

  return (
    <>
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <MediaListingClient locale={validLocale} />
    </>
  );
}

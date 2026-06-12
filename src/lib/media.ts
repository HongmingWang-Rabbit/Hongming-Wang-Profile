import type { Locale } from "@/i18n/config";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface MediaItem {
  /** YouTube video (or Short) id */
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** ISO date string (publish date) */
  date?: string;
  tags?: string[];
}

/** Channel the videos are pulled from. */
export const mediaChannelUrl = "https://www.youtube.com/@HongmingWang-tech";

// Selected videos — the single source of truth for the /media page.
// Add a new entry (newest first) by pasting the YouTube id and a bilingual
// title/description.
export const mediaItems: MediaItem[] = [
  {
    id: "JDXL3jpUmkE",
    date: "2026-06-11",
    tags: ["AI", "Entrepreneurship", "Business"],
    title: {
      en: "Most People Still Can't Use AI — That's Your Opportunity (Two Real Cases)",
      zh: "大部分人还不会用AI，这就是你的机会｜两个真实案例",
    },
    description: {
      en: "Why the AI cognitive gap is the clearest business opportunity since the early internet — with two real client cases: a WordPress rebuild with a 24/7 SEO agent, and an SMS marketing system built in half an hour.",
      zh: "为什么 AI 认知差是互联网早期以来最清晰的商业机会——两个真实客户案例：WordPress 重建 + 24/7 SEO 智能体，以及半小时搞定的短信营销系统。",
    },
  },

  {
    id: "pV_7era-jSI",
    date: "2026-01-10",
    tags: ["Three.js", "Next.js", "Portfolio"],
    title: {
      en: "3D Particle Effect Portfolio Site Built in Under an Hour!",
      zh: "不到一小时打造 3D 粒子特效作品集网站！",
    },
    description: {
      en: "A quick look at building a portfolio site with a 3D particle-effect hero — the same Three.js point cloud you see on this very site.",
      zh: "快速展示如何为作品集网站打造 3D 粒子特效 hero——正是你在本站看到的 Three.js 点云效果。",
    },
  },
];

// Helpers
export function getAllMedia(): MediaItem[] {
  return mediaItems;
}

export function getMediaThumbnail(id: string): string {
  // hqdefault always exists; maxresdefault is requested first in the UI with a fallback.
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function getYoutubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function localizedMedia(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

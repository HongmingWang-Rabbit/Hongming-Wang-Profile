"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Youtube, ExternalLink, Calendar } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useDictionary } from "@/i18n/dictionary-provider";
import type { Locale } from "@/i18n/config";
import {
  mediaItems,
  mediaChannelUrl,
  getYoutubeWatchUrl,
  type MediaItem,
} from "@/lib/media";
import { formatDate } from "@/lib/blog";

function MediaCard({
  item,
  locale,
  index,
}: {
  item: MediaItem;
  locale: Locale;
  index: number;
}) {
  const { dictionary: t } = useDictionary();
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="flex flex-col bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl overflow-hidden"
    >
      {/* Player / thumbnail */}
      <div className="relative aspect-video bg-neutral-900">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`}
            title={item.title[locale]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`${t.media.play} — ${item.title[locale]}`}
          >
            {/* hqdefault always exists (including for Shorts, where sd/maxres can return
                a gray placeholder). mqdefault is a final fallback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith("mqdefault.jpg")) {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`;
                }
              }}
              alt={item.title[locale]}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-2 text-xs text-neutral-500 dark:text-neutral-400">
          {item.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(item.date, locale)}
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold mb-2 leading-snug">{item.title[locale]}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
          {item.description[locale]}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span key={tag} className="skill-badge text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={getYoutubeWatchUrl(item.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:gap-2.5 transition-all"
        >
          <Youtube className="w-4 h-4" />
          {t.media.watchOnYoutube}
        </a>
      </div>
    </motion.div>
  );
}

export function MediaListingClient({ locale }: { locale: Locale }) {
  const { dictionary: t } = useDictionary();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            {/* Header */}
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t.media.title} <span className="gradient-text">{t.media.titleHighlight}</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                {t.media.subtitle}
              </p>
              <a
                href={mediaChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 mt-6"
              >
                <Youtube className="w-4 h-4" />
                {t.media.visitChannel}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {mediaItems.map((item, index) => (
                <MediaCard key={item.id} item={item} locale={locale} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

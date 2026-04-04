"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useDictionary } from "@/i18n/dictionary-provider";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog";
import {
  getPostTitle,
  getPostSubtitle,
  getReadingTime,
  formatDate,
} from "@/lib/blog";

interface BlogListingClientProps {
  posts: BlogPost[];
  locale: Locale;
}

export function BlogListingClient({ posts, locale }: BlogListingClientProps) {
  const { dictionary: t } = useDictionary();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <section className="section-padding">
          <div className="container-custom" ref={ref}>
            {/* Header */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {t.blog.title}{" "}
                <span className="gradient-text">{t.blog.titleHighlight}</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg">
                {t.blog.subtitle}
              </p>
            </motion.div>

            {/* Posts Grid */}
            {posts.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BookOpen className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                <p className="text-neutral-500 dark:text-neutral-400">
                  {t.blog.noPosts}
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-6 md:gap-8">
                {posts.map((post, index) => (
                  <motion.a
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className="group card p-6 sm:p-8 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                    whileHover={{ y: -2 }}
                    aria-label={`${t.aria.readBlogPost}: ${getPostTitle(post, locale)}`}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-medium bg-primary-500/10 text-primary-500 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
                          {getPostTitle(post, locale)}
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base line-clamp-2">
                          {getPostSubtitle(post, locale)}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date, locale)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {getReadingTime(post, locale)} {t.blog.readingTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {t.blog.readMore}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

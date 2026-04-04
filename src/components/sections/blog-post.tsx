"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useDictionary } from "@/i18n/dictionary-provider";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog";
import {
  getPostTitle,
  getPostSubtitle,
  getPostContent,
  getReadingTime,
  formatDate,
} from "@/lib/blog";

interface BlogPostClientProps {
  post: BlogPost;
  locale: Locale;
}

// Simple markdown → HTML converter (no external deps)
function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/g,
    (_match, _lang, code) =>
      `<pre class="blog-code-block"><code>${escapeHtml(code.trim())}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="blog-inline-code">$1</code>'
  );

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|.+\|(?:\n|$))+)/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n");
      if (rows.length < 2) return tableBlock;

      const headerCells = rows[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");

      // Skip separator row (row[1])
      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<div class="blog-table-wrapper"><table class="blog-table"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="blog-h1">$1</h1>');

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Ordered lists
  html = html.replace(
    /(?:^|\n)((?:\d+\.\s.+(?:\n|$))+)/g,
    (_match, listBlock: string) => {
      const items = listBlock
        .trim()
        .split(/\n(?=\d+\.)/)
        .map((item) => `<li>${item.replace(/^\d+\.\s/, "").trim()}</li>`)
        .join("");
      return `<ol class="blog-ol">${items}</ol>`;
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="blog-hr" />');

  // Paragraphs — wrap remaining text blocks
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Don't wrap blocks that are already HTML elements
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p class="blog-p">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function BlogPostClient({ post, locale }: BlogPostClientProps) {
  const { dictionary: t } = useDictionary();

  const contentHtml = useMemo(
    () => markdownToHtml(getPostContent(post, locale)),
    [post, locale]
  );

  const title = getPostTitle(post, locale);
  const subtitle = getPostSubtitle(post, locale);
  const readTime = getReadingTime(post, locale);
  const dateFormatted = formatDate(post.date, locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <article className="section-padding">
          <div className="container-custom max-w-3xl">
            {/* Back link */}
            <motion.a
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors mb-8"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              aria-label={t.blog.backToBlog}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backToBlog}
            </motion.a>

            {/* Article Header */}
            <motion.header
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-primary-500/10 text-primary-500 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {title}
              </h1>

              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-6">
                {subtitle}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500 pb-6 border-b border-neutral-200 dark:border-dark-border">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime} {t.blog.readingTime}
                </span>
              </div>
            </motion.header>

            {/* Article Content */}
            <motion.div
              className="blog-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Bottom navigation */}
            <motion.div
              className="mt-12 pt-8 border-t border-neutral-200 dark:border-dark-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href={`/${locale}/blog`}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.blog.allPosts}
              </a>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Check } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useDictionary } from "@/i18n/dictionary-provider";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/lib/projects";
import { getProjectIcon } from "@/lib/project-icons";
import { markdownToHtml } from "@/lib/markdown";

interface ProjectDetailClientProps {
  project: Project;
  locale: Locale;
}

export function ProjectDetailClient({ project, locale }: ProjectDetailClientProps) {
  const { dictionary: t } = useDictionary();
  const Icon = getProjectIcon(project.icon);

  const overviewHtml = useMemo(
    () => markdownToHtml(project.overview[locale]),
    [project, locale]
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <article className="section-padding">
          <div className="container-custom max-w-4xl">
            {/* Back link */}
            <motion.a
              href={`/${locale}#projects`}
              className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-500 transition-colors mb-8"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              aria-label={t.projectDetail.backToProjects}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.projectDetail.backToProjects}
            </motion.a>

            {/* Header */}
            <motion.header
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3.5 bg-primary-500/10 rounded-2xl">
                  <Icon className="w-8 h-8 text-primary-500" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.award && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full">
                      {project.award[locale]}
                    </span>
                  )}
                  {project.year && (
                    <span className="px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-500/10 rounded-full">
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl">
                {project.tagline[locale]}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.projectDetail.visitLive}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    {t.projectDetail.viewSource}
                  </a>
                )}
              </div>
            </motion.header>

            {/* Screenshots */}
            {project.screenshots.length > 0 && (
              <motion.section
                className="mb-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-8">
                  {project.screenshots.map((shot) => (
                    <figure key={shot.src}>
                      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-dark-border shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={shot.src}
                          alt={shot.caption[locale]}
                          loading="lazy"
                          className="w-full block"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-center text-neutral-500 dark:text-neutral-400">
                        {shot.caption[locale]}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Overview */}
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h2 className="text-2xl font-bold mb-5">{t.projectDetail.overview}</h2>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: overviewHtml }}
              />
            </motion.section>

            {/* Key features */}
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t.projectDetail.keyFeatures}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature) => (
                  <div
                    key={feature.title[locale]}
                    className="flex gap-3 p-5 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl"
                  >
                    <div className="shrink-0 mt-0.5 p-1.5 h-fit bg-primary-500/10 rounded-lg">
                      <Check className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title[locale]}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature.description[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Tech stack */}
            <motion.section
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h2 className="text-2xl font-bold mb-5">{t.projectDetail.techStack}</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="skill-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Bottom nav */}
            <motion.div
              className="mt-12 pt-8 border-t border-neutral-200 dark:border-dark-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href={`/${locale}#projects`}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.projectDetail.allProjects}
              </a>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

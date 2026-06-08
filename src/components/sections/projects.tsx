"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Star, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { getProjectIcon } from "@/lib/project-icons";
import { useDictionary } from "@/i18n/dictionary-provider";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { dictionary: t, locale } = useDictionary();

  return (
    <section id="projects" className="section-padding bg-neutral-50 dark:bg-dark-card/30">
      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.projects.title} <span className="gradient-text">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => {
            const Icon = getProjectIcon(project.icon);
            const href = `/${locale}/projects/${project.slug}`;
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <motion.a
                  href={href}
                  whileHover={{ y: -8 }}
                  aria-label={`${project.title} — ${t.projects.viewDetails}`}
                  className="group flex flex-col h-full p-4 sm:p-6 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500/40 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="flex items-center gap-1">
                      {project.github && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.github, "_blank", "noopener,noreferrer");
                          }}
                          className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          aria-label={t.aria.viewGithubRepo}
                        >
                          <Github className="w-5 h-5" />
                        </span>
                      )}
                      {project.live && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.live, "_blank", "noopener,noreferrer");
                          }}
                          className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          aria-label={t.aria.viewLiveSite}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-500/10 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        {t.projects.featured}
                      </span>
                    )}
                    {project.award && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full">
                        {project.award[locale]}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
                    {project.description[locale]}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="skill-badge text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View details */}
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 group-hover:gap-2.5 transition-all">
                    {t.projects.viewDetails}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/HongmingWang-Rabbit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <Github className="w-4 h-4" />
            {t.projects.viewMore}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Folder, Star } from "lucide-react";
import { projects } from "@/lib/constants";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A selection of projects I&apos;ve built that showcase my skills and passion for
            creating impactful applications.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="group h-full p-4 sm:p-6 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-xl group-hover:bg-primary-500/20 transition-colors">
                    <Folder className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.live && project.live !== "#" && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View live site"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-500/10 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
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
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

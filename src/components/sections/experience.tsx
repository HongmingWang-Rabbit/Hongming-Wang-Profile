"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import { experiences } from "@/lib/constants";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            My professional journey and the companies I&apos;ve had the pleasure to work with.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

            {/* Experience items */}
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative flex items-start gap-6 sm:gap-8 mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-500/10 border-2 border-primary-500 rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                  </div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex-1 p-5 sm:p-6 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500/30 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {experience.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-100 dark:bg-dark-bg px-3 py-1.5 rounded-full w-fit">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{experience.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2.5 text-neutral-600 dark:text-neutral-400 mb-5">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-dark-border">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Want to know more about my experience?
          </p>
          <a
            href="/Hongming_Wang_Resume.docx"
            download
            className="btn-secondary inline-flex"
          >
            <ExternalLink className="w-4 h-4" />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

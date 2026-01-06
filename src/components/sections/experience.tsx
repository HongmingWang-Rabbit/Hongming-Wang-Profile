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
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300 dark:from-primary-600 dark:via-primary-500 dark:to-primary-400" />

            {/* Experience items */}
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 border-4 border-white dark:border-dark-bg rounded-full z-10" />

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Company badge */}
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <div className="p-2 bg-primary-500/10 rounded-lg">
                        <Briefcase className="w-4 h-4 text-primary-500" />
                      </div>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        {experience.company}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">{experience.title}</h3>

                    {/* Period */}
                    <div
                      className={`flex items-center gap-2 text-sm text-neutral-500 mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>

                    {/* Description */}
                    <ul
                      className={`space-y-2 text-neutral-600 dark:text-neutral-400 mb-4 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className={`w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0 ${
                              index % 2 === 0 ? "md:order-1" : ""
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-dark-bg text-neutral-600 dark:text-neutral-400 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
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
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <ExternalLink className="w-4 h-4" />
            View Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Cloud, Blocks, Brain, Wallet, CreditCard, Link } from "lucide-react";
import { personalInfo, skills, education } from "@/lib/constants";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: skills.languages,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-t-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Frontend",
    icon: Blocks,
    skills: skills.frontend,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-t-purple-500",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Backend",
    icon: Database,
    skills: skills.backend,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-t-green-500",
    badgeColor: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Databases",
    icon: Database,
    skills: skills.databases,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-t-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Web3",
    icon: Link,
    skills: skills.web3,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-t-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "AI/LLM",
    icon: Brain,
    skills: skills.ai,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-t-pink-500",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    title: "DevOps & Infra",
    icon: Cloud,
    skills: skills.devops,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-t-cyan-500",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Payments & Auth",
    icon: CreditCard,
    skills: skills.payments,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-t-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-neutral-50 dark:bg-dark-card/30">
      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives me as a developer.
          </p>
        </motion.div>

        {/* About content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <p>{personalInfo.bio}</p>
              <p>
                Currently working at Honeypot Finance, I specialize in building Web3 applications
                and DeFi platforms. I enjoy tackling complex problems and turning ideas into
                reality through clean, efficient code.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing
                to open-source projects, or enjoying the beautiful outdoors of Vancouver.
              </p>
            </div>

            {/* Education */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">Education</h4>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl"
                >
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h5 className="font-medium">{edu.degree}</h5>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {edu.school}
                    </p>
                    <p className="text-sm text-neutral-500">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years of Experience", value: "4+" },
                { label: "Projects Completed", value: "20+" },
                { label: "Technologies", value: "40+" },
                { label: "Coffee Cups", value: "∞" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 sm:p-6 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl sm:rounded-2xl text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What I do */}
            <div className="p-6 bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20 rounded-2xl">
              <h4 className="text-lg font-semibold mb-3">What I Do</h4>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  Build scalable web applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  Develop Web3 & DeFi platforms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  Create responsive user interfaces
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  Integrate AI/LLM capabilities
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  Optimize performance & SEO
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Technical <span className="gradient-text">Skills</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-4 sm:p-5 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border border-t-2 ${category.borderColor} rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow duration-300 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2.5 rounded-xl ${category.bgColor}`}
                  >
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h4 className="font-semibold text-base">{category.title}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg ${category.badgeColor} transition-transform hover:scale-105`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

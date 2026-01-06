"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { personalInfo, navItems } from "@/lib/constants";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-dark-card/50 border-t border-neutral-200 dark:border-dark-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#home" className="text-xl font-bold gradient-text">
              {personalInfo.name.split(" ")[0]}
              <span className="text-neutral-900 dark:text-white">.dev</span>
            </a>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">
              Full-Stack Developer building modern web applications with a focus on performance
              and user experience.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              {personalInfo.email}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-200 dark:border-dark-border">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            &copy; {currentYear} {personalInfo.name}. Made with{" "}
            <Heart className="w-3 h-3 text-red-500 fill-current" /> in Vancouver
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

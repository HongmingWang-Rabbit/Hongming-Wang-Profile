"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import { useDictionary } from "@/i18n/dictionary-provider";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { dictionary: t, locale } = useDictionary();
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
    { name: t.nav.blog, href: `/${locale}/blog` },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-dark-card/50 border-t border-neutral-200 dark:border-dark-border">
      <div className="container-custom py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#home" className="text-xl font-bold gradient-text">
              {personalInfo.name.split(" ")[0]}
              <span className="text-neutral-900 dark:text-white">.dev</span>
            </a>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-2" aria-label={t.aria.footerNavigation}>
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
            <h4 className="font-semibold mb-4">{t.footer.connect}</h4>
            <div className="flex gap-3">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.aria.github}
              >
                <Github className="w-5 h-5 sm:w-4 sm:h-4" />
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.aria.linkedin}
              >
                <Linkedin className="w-5 h-5 sm:w-4 sm:h-4" />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 sm:p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.aria.emailLink}
              >
                <Mail className="w-5 h-5 sm:w-4 sm:h-4" />
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
            &copy; {currentYear} {personalInfo.name}. {t.footer.madeWith}{" "}
            <Heart className="w-3 h-3 text-red-500 fill-current" /> {t.footer.inVancouver}
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t.aria.backToTop}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

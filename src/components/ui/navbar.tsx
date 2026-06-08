"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import { useDictionary } from "@/i18n/dictionary-provider";
import { localeNames, type Locale } from "@/i18n/config";
import clsx from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dictionary: t, locale } = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page (/<locale> or /<locale>/)
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.blog, href: `/${locale}/blog` },
    { name: t.nav.media, href: `/${locale}/media` },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Non-hash links (e.g. /en/blog) — let normal navigation happen
      if (!href.startsWith("#")) return;

      e.preventDefault();
      setIsOpen(false);

      if (isHome) {
        // On homepage: smooth scroll to section
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", href);
        }
      } else {
        // On other pages (e.g. blog): navigate home with hash
        router.push(`/${locale}/${href}`);
      }
    },
    [isHome, router, locale]
  );

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      // Set cookie and navigate to the new locale URL
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
      const currentPath = window.location.pathname;
      // Replace current locale prefix with new one
      const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
      window.location.href = newPath + window.location.hash;
    },
    [locale]
  );

  const otherLocale = locale === "en" ? "zh" : "en";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-neutral-200 dark:border-dark-border"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom" aria-label={t.aria.mainNavigation}>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href={`/${locale}`}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${personalInfo.name} - ${t.nav.home}`}
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-neutral-900 dark:text-white">.dev</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href.startsWith("#") && !isHome ? `/${locale}/${item.href}` : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white link-underline transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Language toggle */}
              <motion.button
                onClick={() => switchLocale(otherLocale)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${t.aria.switchLanguage} ${localeNames[otherLocale]}`}
              >
                <Globe className="w-3.5 h-3.5" />
                {localeNames[otherLocale]}
              </motion.button>
            </div>

            {/* Mobile: language toggle + menu button */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                onClick={() => switchLocale(otherLocale)}
                className="p-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`${t.aria.switchLanguage} ${localeNames[otherLocale]}`}
              >
                <Globe className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t.aria.toggleMenu}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-white dark:bg-dark-bg border-b border-neutral-200 dark:border-dark-border shadow-lg">
              <nav className="container-custom py-4" aria-label={t.aria.mobileNavigation}>
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href.startsWith("#") && !isHome ? `/${locale}/${item.href}` : item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="px-4 py-4 text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-dark-card rounded-lg transition-colors active:bg-neutral-200 dark:active:bg-dark-border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

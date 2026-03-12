"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, personalInfo } from "@/lib/constants";
import clsx from "clsx";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

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
      // Non-hash links (e.g. /blog) — let normal navigation happen
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
        // On other pages: navigate home with hash
        router.push(`/${href}`);
      }
    },
    [isHome, router]
  );

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
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-neutral-900 dark:text-white">.dev</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href.startsWith("#") && !isHome ? `/${item.href}` : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white link-underline transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
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
              <nav className="container-custom py-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href.startsWith("#") && !isHome ? `/${item.href}` : item.href}
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

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, FileText } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import { useDictionary } from "@/i18n/dictionary-provider";

const SplatScene = dynamic(
  () => import("../ui/splat-scene").then((mod) => ({ default: mod.SplatScene })),
  { ssr: false }
);
import { LoadingScreen } from "../ui/loading-screen";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSceneLoad = useCallback(() => {
    // Small delay to ensure smooth transition
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Dismiss loading screen after 4s even if PLY hasn't finished (48MB file)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      // Set active on mouse move (handles case where mouse is already in section on load)
      if (!isActive) {
        setIsActive(true);
      }
    }
  }, [isActive]);

  const { dictionary: t } = useDictionary();

  return (
    <>
      <LoadingScreen isLoading={!isLoaded} />
      <section
        ref={sectionRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsActive(false)}
      >
        <SplatScene mousePosition={mousePosition} isActive={isActive} onLoad={handleSceneLoad} />

        <div className="container-custom pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mb-6"
          >
            {t.hero.greeting}
            <span className="gradient-text block">{personalInfo.name}</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 mb-4"
          >
            {t.hero.role}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-500 mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>{t.hero.location}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-4 sm:px-0"
          >
            <a href="#contact" className="btn-primary w-full sm:w-auto" data-cursor="contact" data-cursor-text="LET'S TALK">
              <Mail className="w-4 h-4" />
              {t.hero.getInTouch}
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
              data-cursor="button"
              data-cursor-text="VIEW"
              aria-label={t.aria.downloadResume}
            >
              <FileText className="w-4 h-4" />
              {t.hero.downloadResume}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t.aria.github}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t.aria.linkedin}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-neutral-100 dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-primary-500 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t.aria.emailLink}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="hidden sm:block absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
        >
          <span className="text-sm">{t.hero.scrollDown}</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
    </>
  );
}

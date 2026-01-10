"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorState {
  isHovering: boolean;
  text: string;
  variant: "default" | "link" | "button" | "contact";
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    text: "",
    variant: "default",
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed position for the outer circle (follows with delay)
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Add hover detection for interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const cursorText = el.getAttribute("data-cursor-text") || "";
          const cursorVariant =
            (el.getAttribute("data-cursor") as CursorState["variant"]) ||
            "link";

          setCursorState({
            isHovering: true,
            text: cursorText,
            variant: cursorVariant,
          });
        });

        el.addEventListener("mouseleave", () => {
          setCursorState({
            isHovering: false,
            text: "",
            variant: "default",
          });
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Initial setup and mutation observer for dynamic elements
    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const getOuterSize = () => {
    if (cursorState.text) return 80;
    if (cursorState.isHovering) return 50;
    return 32;
  };

  return (
    <>
      {/* Inner dot - follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorState.isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer circle - follows with smooth delay */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-2 border-primary-500 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: getOuterSize(),
          height: getOuterSize(),
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorState.text ? "#14b8a6" : "transparent",
          borderColor: cursorState.isHovering ? "#14b8a6" : "#14b8a6",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] font-bold text-white uppercase tracking-wider text-center leading-tight px-1"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

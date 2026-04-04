"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursor configuration - easy to customize
const CURSOR_CONFIG = {
  innerSize: 8, // pixels
  outerSize: {
    default: 32,
    hover: 50,
    withText: 80,
  },
  spring: {
    damping: 25,
    stiffness: 200,
  },
} as const;

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
  const smoothX = useSpring(mouseX, CURSOR_CONFIG.spring);
  const smoothY = useSpring(mouseY, CURSOR_CONFIG.spring);

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

    // Use event delegation on document.body instead of attaching to each element
    const handlePointerEnter = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      if (!target) return;
      const cursorText = target.getAttribute("data-cursor-text") || "";
      const cursorVariant =
        (target.getAttribute("data-cursor") as CursorState["variant"]) ||
        "link";
      setCursorState({ isHovering: true, text: cursorText, variant: cursorVariant });
    };

    const handlePointerLeave = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      if (!target) return;
      setCursorState({ isHovering: false, text: "", variant: "default" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseover", handlePointerEnter);
    document.body.addEventListener("mouseout", handlePointerLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseover", handlePointerEnter);
      document.body.removeEventListener("mouseout", handlePointerLeave);
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const getOuterSize = () => {
    if (cursorState.text) return CURSOR_CONFIG.outerSize.withText;
    if (cursorState.isHovering) return CURSOR_CONFIG.outerSize.hover;
    return CURSOR_CONFIG.outerSize.default;
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
          backgroundColor: cursorState.text ? "var(--primary)" : "transparent",
          borderColor: "var(--primary)",
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

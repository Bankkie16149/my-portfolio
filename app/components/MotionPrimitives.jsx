"use client";
import React from "react";
import { motion, MotionConfig } from "framer-motion";

export const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export function MotionRoot({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.55,
  className = "",
  immediate = false,
}) {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: SMOOTH_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: SMOOTH_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0.04,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 16 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: SMOOTH_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SkillBar({ percent, delay = 0 }) {
  return (
    <div className="h-[3px] w-full bg-surface-subtle rounded-full overflow-hidden">
      <motion.div
        className="h-full w-full bg-primary rounded-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: percent / 100 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, delay, ease: SMOOTH_EASE }}
      />
    </div>
  );
}

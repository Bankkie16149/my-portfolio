"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { profileData } from "@/app/data/portfolio";
import { SMOOTH_EASE } from "@/app/components/MotionPrimitives";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/#section-about", th: "เกี่ยวกับฉัน", en: "About" },
    { href: "/#section-skills", th: "ทักษะ", en: "Skills" },
    { href: "/#section-projects", th: "โปรเจกต์", en: "Projects" },
    { href: "/#section-personal-project", th: "โปรเจกต์ส่วนตัว", en: "Personal" },
    { href: "/#section-internship", th: "การฝึกงาน", en: "Internship" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/75 backdrop-blur-md border-b border-outline/60 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link
          href="/#section-hero"
          className="inline-flex items-center gap-2 text-on-surface hover:opacity-75 transition-opacity duration-150 shrink-0"
        >
          <span className="font-mono text-xs font-semibold tracking-wider uppercase">
            TANAKORN
          </span>
        </Link>

        {/* Desktop Navigation & Actions (lg+) */}
        <div className="hidden lg:flex items-center gap-5">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-on-surface-muted hover:text-on-surface transition-colors duration-150 whitespace-nowrap"
                  >
                    {language === "th" ? item.th : item.en}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 pl-4 border-l border-outline/80 shrink-0">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Thai"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[4px] border border-outline/80 bg-surface-panel/70 font-mono text-[11px] font-medium text-on-surface-muted hover:border-outline-strong transition-colors duration-150 cursor-pointer"
            >
              <span className={language === "en" ? "text-on-surface font-semibold" : "text-on-surface-muted"}>
                EN
              </span>
              <span className="text-outline-strong">/</span>
              <span className={language === "th" ? "text-on-surface font-semibold" : "text-on-surface-muted"}>
                TH
              </span>
            </button>

            {/* Primary Contact CTA */}
            

            {/* Subtle Admin Access */}
            <Link
              href="/admin/login"
              aria-label="Admin Login"
              title="Admin Login"
              className="inline-flex items-center justify-center w-8 h-8 rounded-[6px] border border-outline/80 bg-surface-panel/70 text-on-surface-muted hover:border-outline-strong hover:text-on-surface transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </Link>
          </div>
        </div>

        {/* Mobile & Tablet Controls (< lg) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="inline-flex items-center justify-center gap-1 px-3 min-h-[44px] rounded-[6px] border border-outline/80 bg-surface-panel/70 font-mono text-xs font-medium text-on-surface-muted"
          >
            <span className={language === "en" ? "text-on-surface font-semibold" : ""}>EN</span>
            <span className="text-outline-strong">/</span>
            <span className={language === "th" ? "text-on-surface font-semibold" : ""}>TH</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="inline-flex items-center justify-center w-11 h-11 rounded-[6px] border border-outline/80 bg-surface-panel/70 text-on-surface hover:border-outline-strong transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Bottom Soft Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-b from-surface/60 to-transparent"
      />

      {/* Mobile & Tablet Dropdown Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: SMOOTH_EASE }}
            className="lg:hidden bg-surface-panel/95 backdrop-blur-md border-t border-outline/70 overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col divide-y divide-outline/70">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3.5 text-sm font-medium text-on-surface-body hover:text-on-surface transition-colors flex items-center justify-between"
                >
                  <span>{language === "th" ? item.th : item.en}</span>
                  <span className="font-mono text-xs text-on-surface-muted">↗</span>
                </a>
              ))}
              <div className="pt-4 mt-1 flex flex-col sm:flex-row gap-2.5 border-t border-outline/70">
                
                <Link
                  href="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full sm:w-auto py-3 px-4 rounded-[6px] border border-outline text-on-surface-muted text-sm font-medium text-center hover:border-outline-strong hover:text-on-surface transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Admin Login</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

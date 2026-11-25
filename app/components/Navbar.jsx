"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { profileData } from "@/app/data/portfolio";

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
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-outline">
      <div className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link
          href="/#section-hero"
          className="inline-flex items-center gap-2.5 text-on-surface hover:text-primary transition-colors duration-150"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true"></span>
          <span className="font-mono text-xs font-medium tracking-wider uppercase">
            TT / TANAKORN
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-5 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-on-surface-body hover:text-primary transition-colors duration-150"
                  >
                    {language === "th" ? item.th : item.en}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 pl-4 border-l border-outline">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Thai"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[4px] border border-outline bg-surface font-mono text-[11px] font-medium text-on-surface-muted hover:border-outline-strong transition-colors duration-150 cursor-pointer"
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
            <a
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-[6px] border border-outline-strong bg-surface text-on-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-150"
            >
              {language === "th" ? "ติดต่ออีเมล" : "Get in touch"}
            </a>

            {/* Subtle Admin Access */}
            <Link
              href="/admin/login"
              aria-label="Admin Login"
              title="Admin Login"
              className="inline-flex items-center justify-center w-8 h-8 rounded-[6px] border border-outline text-on-surface-muted hover:border-outline-strong hover:text-on-surface transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </Link>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="inline-flex items-center gap-1 px-2.5 h-10 rounded-[4px] border border-outline bg-surface font-mono text-[11px] font-medium text-on-surface-muted"
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
            className="inline-flex items-center justify-center w-10 h-10 rounded-[6px] border border-outline text-on-surface hover:border-outline-strong transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline">
          <nav aria-label="Mobile navigation" className="max-w-5xl mx-auto px-6 py-4 flex flex-col divide-y divide-outline">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-sm font-medium text-on-surface-body hover:text-primary transition-colors flex items-center justify-between"
              >
                <span>{language === "th" ? item.th : item.en}</span>
                <span className="font-mono text-xs text-on-surface-muted">↗</span>
              </a>
            ))}
            <div className="pt-4 mt-1 flex flex-col gap-2.5 border-t border-outline">
              <a
                href={`mailto:${profileData.email}`}
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-[6px] bg-on-surface text-surface text-sm font-medium text-center hover:bg-primary transition-colors"
              >
                {language === "th" ? "ติดต่ออีเมล" : "Get in touch"}
              </a>
              <Link
                href="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-[6px] border border-outline text-on-surface-muted text-sm font-medium text-center hover:border-outline-strong hover:text-on-surface transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Admin Login</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

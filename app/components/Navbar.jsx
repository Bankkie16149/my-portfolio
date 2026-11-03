"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from 'next/link';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-teal-900/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 py-3 sm:py-4 flex items-center justify-between">
        
        {/* Site Logo / Title */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm group-hover:bg-teal-700 transition">
            TT
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-teal-700 transition">
            MY <span className="text-teal-600">PORTFOLIO</span>
          </span>
        </Link>

        {/* Navigation & Controls (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <nav className="flex items-center gap-1">
            <Link href="/" className="px-3.5 lg:px-4 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50/90 rounded-full border border-teal-200/60 hover:bg-teal-100/70 transition">
              {language === 'th' ? 'หน้าหลัก' : 'Home'}
            </Link>
          </nav>
          
          <div className="flex items-center gap-2.5 lg:gap-3 border-l border-teal-100 pl-4 lg:pl-6">
            {/* Language Switch */}
            <button 
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 transition text-sm font-semibold text-slate-600 border border-transparent hover:border-slate-200"
            >
              <span className="material-symbols-outlined text-[16px] text-teal-600">language</span>
              <span>{language === 'th' ? 'TH' : 'EN'}</span>
            </button>
            
            {/* Login for Admin */}
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-teal-200/80 text-xs font-medium text-slate-700 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 transition shadow-sm bg-white">
              <span className="material-symbols-outlined text-[16px] text-teal-600">lock</span>
              <span>Login for Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button & Quick Actions */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-teal-50/70 border border-teal-200/60 active:scale-95 transition"
            aria-label="Toggle language"
          >
            <span className="material-symbols-outlined text-[15px] text-teal-600">language</span>
            <span>{language === 'th' ? 'TH' : 'EN'}</span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-teal-900/10 absolute top-full left-0 w-full shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 space-y-3">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)} 
              className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-teal-800 bg-teal-50/80 rounded-xl border border-teal-100"
            >
              <span>{language === 'th' ? 'หน้าหลัก' : 'Home'}</span>
              <span className="material-symbols-outlined text-[18px] text-teal-600">home</span>
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link 
                href="/admin/login" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-teal-200/80 rounded-xl shadow-xs hover:bg-teal-50/50 transition"
              >
                <span className="material-symbols-outlined text-[18px] text-teal-600">lock</span>
                <span>Login for Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

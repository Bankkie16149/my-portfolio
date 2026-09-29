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
      <div className="max-w-6xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
        
        {/* Site Logo / Title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-display font-extrabold flex items-center justify-center text-sm shadow-sm group-hover:bg-teal-700 transition">
            TK
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-slate-900 group-hover:text-teal-700 transition">
            MY <span className="text-teal-600">PORTFOLIO</span>
          </span>
        </Link>

        {/* Navigation & Controls */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-1">
            <Link href="/" className="px-4 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50/90 rounded-full border border-teal-200/60 hover:bg-teal-100/70 transition">
              {language === 'th' ? 'หน้าหลัก' : 'Home'}
            </Link>
          </nav>
          
          <div className="flex items-center gap-3 border-l border-teal-100 pl-6">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-slate-600"
          >
            <span className="material-symbols-outlined text-[14px] text-teal-600">language</span>
            <span>{language === 'th' ? 'TH' : 'EN'}</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 focus:outline-none">
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-teal-900/10 absolute w-full shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm font-semibold text-teal-700 bg-teal-50 rounded-lg">
              {language === 'th' ? 'หน้าหลัก' : 'Home'}
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link href="/admin/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-teal-700 bg-white border border-teal-200 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-teal-600">lock</span>
                <span>Login for Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

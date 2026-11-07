"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { personalProjectData } from "@/app/data/portfolio";

export default function PersonalProjectSection() {
  const { language } = useLanguage();
  const project = personalProjectData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!project) return null;

  const projectImage = project.image || "/fintrack/fintrack.jpg";

  return (
    <>
      <section 
        id="section-personal-project" 
        className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 border border-teal-900/10 shadow-card-soft relative overflow-hidden"
      >
        {/* Soft Decorative Ambient Background */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-purple-100/60 to-teal-100/40 rounded-full blur-3xl pointer-events-none opacity-60"></div>
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-gradient-to-tr from-teal-100/50 to-cyan-100/40 rounded-full blur-3xl pointer-events-none opacity-50"></div>

        <div className="relative z-10 space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-teal-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900">
                    {language === 'th' ? "โปรเจกต์ส่วนตัว" : "Personal Project"}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/80">
                    Spotlight
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">Personal Full-stack Project</p>
              </div>
            </div>

            {/* Infrastructure Hosting Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Backend Render Badge */}
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 hover:bg-purple-100/80 text-purple-900 border border-purple-200/90 shadow-2xs transition-colors"
                title="Backend API hosted on Render"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-purple-600 font-bold">●</span>
                  <span>Backend: Hosted on Render</span>
                </span>
              </div>

              {/* Frontend Vercel Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white shadow-2xs"
                title="Frontend Web hosted on Vercel"
              >
                <span className="text-[10px] leading-none">▲</span>
                <span>Frontend: Vercel</span>
              </div>

              {/* PWA Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs"
                title="Progressive Web App"
              >
                <span className="material-symbols-outlined text-[15px] text-teal-600">install_mobile</span>
                <span>PWA Ready</span>
              </div>
            </div>
          </div>

          {/* Project Hero Card with Actual Screenshot */}
          <div className="bg-gradient-to-br from-[#f8fcfb] via-white to-purple-50/30 p-5 sm:p-7 rounded-2xl border border-teal-100/80 space-y-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  <span>{language === 'th' ? project.taglineTh : project.taglineEn}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  {project.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-teal-200/80 rounded-xl text-sm font-semibold shadow-2xs transition duration-200"
                >
                  <span className="material-symbols-outlined text-[18px] text-teal-600">visibility</span>
                  <span>{language === 'th' ? "ดูภาพตัวอย่าง" : "View Preview"}</span>
                </button>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-teal-glow transition duration-200 group"
                >
                  <span>{language === 'th' ? "เยี่ยมชมเว็บไซต์ (Live Demo)" : "Visit Live Demo"}</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>

            {/* Actual Screenshot in Beautiful Aspect Ratio */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-[#f8fbfb] border border-teal-100/90 shadow-sm cursor-pointer group hover:border-teal-300 transition-all duration-300 flex items-center justify-center"
            >
              <Image 
                src={projectImage} 
                alt={project.title}
                fill
                className="object-contain p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-800 shadow-md">
                  <span className="material-symbols-outlined text-[16px] text-teal-600">zoom_in</span>
                  <span>{language === 'th' ? "คลิกดูภาพขยาย" : "Click to view image"}</span>
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === 'th' ? project.descriptionTh : project.descriptionEn}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-teal-100/60">
              <span className="text-xs font-semibold text-slate-400 mr-1">Tech Stack:</span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-teal-100 text-slate-700 shadow-2xs hover:border-teal-200 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Highlights Grid (The 6 modules) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>{language === 'th' ? "ฟังก์ชันและความสามารถเด่นของระบบ" : "Key System Capabilities"}</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">6 Core Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {project.features.map((feat, idx) => (
                <div 
                  key={idx}
                  className="bg-[#fbfcfa] hover:bg-white p-4 sm:p-4.5 rounded-xl border border-teal-100/70 hover:border-teal-300/80 shadow-2xs hover:shadow-card-soft transition duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition duration-200">
                      <span className="material-symbols-outlined text-[20px]">{feat.icon}</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {language === 'th' ? feat.titleTh : feat.titleEn}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {language === 'th' ? feat.descTh : feat.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Modal Popup (Centered on Screen, style identical to other project modals) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto" 
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
          
          {/* Modal Content */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 z-10 my-auto"
          >
            {/* Close 'X' Button Only */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-95"
              aria-label="Close modal"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image Gallery with Real Screenshot */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] bg-[#f8fbfb] shrink-0 border-b border-slate-100 p-2 sm:p-4 flex items-center justify-center">
              <Image 
                src={projectImage} 
                alt={project.title} 
                fill 
                className="object-contain p-2 sm:p-4 transition-all duration-500" 
                priority
              />
            </div>

            {/* Modal Body & Action */}
            <div className="p-5 sm:p-7 space-y-4 overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs text-teal-700 font-medium mt-0.5">
                    {language === 'th' ? project.taglineTh : project.taglineEn}
                  </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 bg-purple-50 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                  Host on Render
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-[#f7fcfb] p-4 rounded-xl border border-teal-100/70">
                {language === 'th' ? project.descriptionTh : project.descriptionEn}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 text-xs bg-slate-50 text-slate-600 rounded-lg border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition"
                >
                  <span>{language === 'th' ? "เยี่ยมชมเว็บไซต์" : "Visit Website"}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

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

  const highlights = language === 'th' ? project.highlightsTh : project.highlightsEn;

  return (
    <>
      <section 
        id="section-personal-project" 
        className="bg-white rounded-2xl p-5 sm:p-8 border border-teal-900/10 shadow-card-soft flex flex-col"
      >
        {/* Section Header (Consistent with Projects & Internship sections) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-teal-50 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/80 shrink-0">
              <span className="material-symbols-outlined text-[22px]">savings</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900">
                {language === 'th' ? "โปรเจกต์ส่วนตัว" : "Personal Project"}
              </h2>
              <p className="text-xs text-slate-400 font-mono">Personal Project</p>
            </div>
          </div>

          {/* Clean Host on Render Badge */}
          <div className="self-start sm:self-auto flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f7fcfb] text-slate-700 text-xs font-semibold rounded-full border border-teal-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>Host on Render (Backend)</span>
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Project Screenshot Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#f8fbfb] border border-teal-100/80 shadow-sm cursor-pointer group hover:border-teal-300 transition-all duration-300"
            >
              <Image 
                src={project.image || "/fintrack/fintrack.jpg"} 
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-slate-700 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-slate-200/80">
                  Full-stack App
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-teal-800 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-teal-200/80">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 mb-px"></span>
                  PWA Ready
                </span>
              </div>

              {/* Click to Expand Overlay */}
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-800 shadow-md">
                  <span className="material-symbols-outlined text-[16px] text-teal-600">zoom_in</span>
                  <span>{language === 'th' ? "คลิกเพื่อดูรูปขยาย" : "Click to view image"}</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono text-center mt-2">
              {language === 'th' ? "ภาพตัวอย่างระบบ FinTrack (Responsive & PWA)" : "FinTrack system preview (Responsive & PWA)"}
            </p>
          </div>

          {/* Right Column: Project Details & Features */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Title & Tagline */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-medium mb-2 border border-teal-100">
                <span>{language === 'th' ? project.taglineTh : project.taglineEn}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Description (Natural Tone) */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-[#f7fcfb] p-3.5 sm:p-4 rounded-xl border border-teal-100/70">
              {language === 'th' ? project.descriptionTh : project.descriptionEn}
            </p>

            {/* Highlights List */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                {language === 'th' ? "จุดเด่นและการทำงานของระบบ" : "Key Highlights"}
              </h4>
              <ul className="space-y-1.5">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <span className="material-symbols-outlined text-[16px] text-teal-600 shrink-0 mt-0.5">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2 border-t border-teal-50">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Tech Stack:</span>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow-teal-glow transition duration-200 w-full sm:w-auto"
              >
                <span>{language === 'th' ? "เยี่ยมชมเว็บไซต์" : "Visit Website"}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-50/70 hover:bg-teal-100/80 text-teal-800 border border-teal-200/70 rounded-xl text-xs sm:text-sm font-medium transition w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-[16px] text-teal-600">visibility</span>
                <span>{language === 'th' ? "ดูภาพตัวอย่าง" : "View Preview"}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Centered Modal (Consistent with ProjectCard modal) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
          
          {/* Modal Card */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 z-10 my-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-95"
              aria-label="Close modal"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-56 sm:h-80 md:h-96 bg-[#f8fbfb] border-b border-slate-100">
              <Image 
                src={project.image || "/fintrack/fintrack.jpg"} 
                alt={project.title} 
                fill 
                className="object-contain p-4" 
              />
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {project.title}
                </h3>
                <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-200/80">
                  Host on Render
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-[#f7fcfb] p-4 rounded-xl border border-teal-100/70">
                {language === 'th' ? project.descriptionTh : project.descriptionEn}
              </p>

              <div className="pt-2 flex justify-end">
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

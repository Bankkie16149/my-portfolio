"use client";
import React, { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { personalProjectData } from "@/app/data/portfolio";

export default function PersonalProjectSection() {
  const { language } = useLanguage();
  const project = personalProjectData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isModalOpen && dialog.open) {
      dialog.close();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setIsModalOpen(false);
    dialog.addEventListener("close", handleClose);

    let cleanupPointer = () => {};
    if (typeof HTMLDialogElement !== "undefined" && !("closedBy" in HTMLDialogElement.prototype)) {
      const isOutside = (e) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      const onPointerDown = (e) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e) => {
        if (pressedOutside && isOutside(e)) dialog.close();
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupPointer = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupPointer();
    };
  }, []);

  if (!project) return null;

  const highlights = language === "th" ? project.highlightsTh : project.highlightsEn;
  const projectImage = project.image || "/fintrack/fintrack-dashboard.jpg";

  return (
    <>
      <section
        id="section-personal-project"
        className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24"
      >
        {/* Section Index Header */}
        <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
              {language === "th" ? "04 / โปรเจกต์ส่วนตัว" : "04 / PERSONAL PROJECT"}
            </span>
            <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface">
              {language === "th" ? "โปรเจกต์ส่วนตัว" : "Personal Project"}
            </h2>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-on-surface-muted uppercase tracking-wider">
            PRODUCTION WEB APP
          </span>
        </div>

        {/* 50/50 Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 50%: Minimal Browser Mockup with Hover Zoom */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label={`Zoom ${project.title} screenshot`}
              className="group w-full text-left rounded-[8px] border border-outline bg-surface-subtle overflow-hidden block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Minimal Browser Top Bar */}
              <div className="px-4 py-2.5 border-b border-outline bg-surface flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full border border-outline-strong"></span>
                  <span className="w-2 h-2 rounded-full border border-outline-strong"></span>
                  <span className="w-2 h-2 rounded-full border border-outline-strong"></span>
                </div>
                <span className="font-mono text-[11px] text-on-surface-muted truncate">
                  expensetracker-tan-delta.vercel.app
                </span>
                <span
                  className="material-symbols-outlined text-[16px] text-on-surface-muted group-hover:text-primary transition-colors duration-150 shrink-0"
                  aria-hidden="true"
                >
                  zoom_in
                </span>
              </div>

              {/* Clean Unobstructed Screenshot */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  className="object-contain p-1.5 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </div>
            </button>
          </div>

          {/* Right 50%: Project Narrative & Architecture */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-on-surface-muted">
                Personal Full-Stack Project
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-primary/25 bg-accent-subtle text-primary font-mono text-[11px] font-medium">
                Backend: Hosted on Render
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] leading-snug text-on-surface">
              {project.title}
            </h3>

            <p className="text-[15px] leading-[1.65] text-on-surface-body">
              {language === "th" ? project.descriptionTh : project.descriptionEn}
            </p>

            {/* Clean Check-list Highlights */}
            <ul className="space-y-2 py-1">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-on-surface-body">
                  <span
                    className="material-symbols-outlined text-[18px] text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    check
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Minimalist Monospace Tech Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-outline bg-surface text-on-surface-body font-mono text-[11px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-on-surface text-surface text-sm font-medium hover:bg-primary transition-colors duration-150"
              >
                <span>{language === "th" ? "เยี่ยมชมเว็บไซต์จริง" : "Visit Live Web App"}</span>
                <span className="font-mono text-xs" aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[6px] border border-outline-strong bg-surface text-on-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  visibility
                </span>
                <span>{language === "th" ? "ดูภาพขยาย" : "View Screenshot"}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Native <dialog> Lightbox Modal */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby={titleId}
        className="m-auto p-0 bg-transparent border-0 max-w-4xl w-[calc(100%-2rem)] max-h-[90vh] overflow-visible"
      >
        {isModalOpen && (
          <div className="relative bg-surface rounded-[12px] border border-outline w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Close 'X' Button Only */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              autoFocus
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-on-surface/75 hover:bg-on-surface text-surface flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Full Screenshot */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] bg-surface-subtle border-b border-outline shrink-0">
              <Image
                src={projectImage}
                alt={project.title}
                fill
                className="object-contain p-3 sm:p-5"
                priority
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 id={titleId} className="font-display text-lg sm:text-xl font-semibold text-on-surface">
                    {project.title}
                  </h3>
                  <p className="text-xs text-primary font-mono mt-0.5">
                    {language === "th" ? project.taglineTh : project.taglineEn}
                  </p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-[4px] border border-primary/25 bg-accent-subtle text-primary font-mono text-[11px] font-medium">
                  Backend: Hosted on Render
                </span>
              </div>

              <p className="text-[15px] leading-[1.65] text-on-surface-body">
                {language === "th" ? project.descriptionTh : project.descriptionEn}
              </p>

              <div className="pt-4 border-t border-outline flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] border border-outline bg-surface text-on-surface-muted font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[6px] bg-on-surface text-surface text-sm font-medium hover:bg-primary transition-colors duration-150"
                >
                  <span>{language === "th" ? "เยี่ยมชมเว็บไซต์จริง" : "Visit Live Web App"}</span>
                  <span className="font-mono text-xs" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

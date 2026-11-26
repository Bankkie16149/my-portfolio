"use client";
import React, { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { MdZoomIn, MdCheckCircleOutline, MdVisibility, MdClose } from "react-icons/md";
import { useLanguage } from "@/app/context/LanguageContext";
import { personalProjectData } from "@/app/data/portfolio";
import { Reveal } from "@/app/components/MotionPrimitives";

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
        className="bg-obsidian text-on-obsidian border-y border-obsidian-border"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Section Index Header */}
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 sm:mb-8 md:mb-10">
              <span className="font-mono text-xs font-medium text-teal-bright uppercase tracking-wider">
                {language === "th" ? "05 / โปรเจกต์ส่วนตัว" : "05 / PERSONAL PROJECT"}
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-on-obsidian-muted uppercase tracking-wider">
                PRODUCTION WEB APP
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            
            {/* Left 50%: Dark-Framed Browser Window */}
            <Reveal delay={0.05} className="lg:col-span-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                aria-label={`Zoom ${project.title} screenshot`}
                className="group w-full text-left rounded-[8px] border border-obsidian-border bg-obsidian-surface overflow-hidden block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-bright"
              >
                <div className="px-3 sm:px-4 py-2.5 border-b border-obsidian-border bg-obsidian flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full border border-obsidian-border bg-obsidian-surface"></span>
                    <span className="w-2.5 h-2.5 rounded-full border border-obsidian-border bg-obsidian-surface"></span>
                    <span className="w-2.5 h-2.5 rounded-full border border-obsidian-border bg-obsidian-surface"></span>
                  </div>
                  <span className="font-mono text-[11px] text-on-obsidian-muted truncate min-w-0 flex-1 text-center">
                    expensetracker-tan-delta.vercel.app
                  </span>
                  <MdZoomIn
                    className="text-[16px] text-on-obsidian-muted group-hover:text-teal-bright transition-colors duration-150 shrink-0"
                    aria-hidden="true"
                  />
                </div>

                {/* Clean Unobstructed Screenshot */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-obsidian-surface">
                  <Image
                    src={projectImage}
                    alt={project.title}
                    fill
                    className="object-contain p-1.5 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    priority
                  />
                </div>
              </button>
            </Reveal>

            {/* Right 50%: Narrative, Highlights, Dark Tech Tags, Bright Teal CTA */}
            <Reveal delay={0.12} className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-on-obsidian-muted">
                  {language === "th" ? "โปรเจกต์ส่วนตัว Full-Stack" : "Personal Full-Stack Project"}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] border border-teal-bright/30 bg-teal-bright/10 text-teal-bright font-mono text-[11px] font-medium">
                  Backend: Hosted on Render
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-snug text-on-obsidian text-balance">
                {project.title}
              </h2>

              <p className="text-[15px] leading-[1.65] text-on-obsidian-muted text-pretty">
                {language === "th" ? project.descriptionTh : project.descriptionEn}
              </p>

              <ul className="space-y-2 py-1">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-on-obsidian">
                    <MdCheckCircleOutline
                      className="text-[18px] text-teal-bright mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-obsidian-border bg-obsidian-surface text-on-obsidian-muted font-mono text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-teal-bright text-on-teal-bright text-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors duration-150 w-full sm:w-auto"
                >
                  <span>{language === "th" ? "เยี่ยมชมเว็บไซต์จริง" : "Visit Live Web App"}</span>
                  <span className="font-mono text-xs" aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[6px] border border-obsidian-border bg-obsidian-surface text-on-obsidian text-sm font-medium hover:border-teal-bright hover:text-teal-bright transition-colors duration-150 cursor-pointer w-full sm:w-auto"
                >
                  <MdVisibility className="text-[16px]" aria-hidden="true" />
                  <span>{language === "th" ? "ดูภาพขยาย" : "View Screenshot"}</span>
                </button>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Native <dialog> Lightbox Modal */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby={titleId}
        className="m-auto p-0 bg-transparent border-0 max-w-xl lg:max-w-2xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-h-[82dvh] overflow-visible"
      >
        {isModalOpen && (
          <div className="relative bg-obsidian text-on-obsidian rounded-[12px] border border-obsidian-border w-full max-h-[82dvh] flex flex-col overflow-hidden">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              autoFocus
              className="absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full bg-obsidian-surface/90 hover:bg-teal-bright hover:text-on-teal-bright text-on-obsidian border border-obsidian-border flex items-center justify-center transition-colors cursor-pointer"
            >
              <MdClose className="text-[16px]" aria-hidden="true" />
            </button>

            <div className="relative w-full h-44 sm:h-56 md:h-64 bg-obsidian-surface border-b border-obsidian-border shrink-0">
              <Image
                src={projectImage}
                alt={project.title}
                fill
                className="object-contain p-2.5 sm:p-4"
                priority
              />
            </div>

            <div className="p-4 sm:p-5 md:p-6 overflow-y-auto space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 id={titleId} className="font-display text-base sm:text-lg font-semibold text-on-obsidian">
                    {project.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-teal-bright font-mono mt-0.5">
                    {language === "th" ? project.taglineTh : project.taglineEn}
                  </p>
                </div>
                <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] border border-teal-bright/30 bg-teal-bright/10 text-teal-bright font-mono text-[10px] sm:text-[11px] font-medium shrink-0">
                  Backend: Hosted on Render
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-on-obsidian-muted">
                {language === "th" ? project.descriptionTh : project.descriptionEn}
              </p>

              <div className="pt-3 border-t border-obsidian-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] border border-obsidian-border bg-obsidian-surface text-on-obsidian-muted font-mono text-[10px] sm:text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-[6px] bg-teal-bright text-on-teal-bright text-xs sm:text-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors duration-150 shrink-0 w-full sm:w-auto"
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

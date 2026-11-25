"use client";
import { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

const ProjectCard = ({
  title,
  imageSrc,
  images,
  description,
  course,
  link,
  type,
  status,
  hostingTag,
  multipleLinks,
}) => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dialogRef = useRef(null);
  const titleId = useId();

  const galleryImages =
    images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];

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

  useEffect(() => {
    let interval;
    if (isModalOpen && galleryImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isModalOpen, galleryImages.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const resolvedLinks =
    multipleLinks && multipleLinks.length > 0
      ? multipleLinks
      : link && link !== "#"
        ? [
            {
              url: link,
              labelTh: type === "github" ? "GitHub" : type === "figma" ? "Figma" : "เว็บไซต์",
              labelEn: type === "github" ? "GitHub" : type === "figma" ? "Figma" : "Website",
              type,
            },
          ]
        : [];

  return (
    <>
      <article className="group bg-surface-panel border border-outline rounded-[8px] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-outline-strong hover:-translate-y-0.5 transition-[transform,border-color] duration-150 flex flex-col">
        {/* Clean 16:10 Screenshot Area */}
        {imageSrc && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Preview ${title}`}
            className="relative w-full aspect-[16/10] overflow-hidden border-b border-outline bg-surface-subtle cursor-pointer block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain p-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </button>
        )}

        {/* Card Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            {/* Course Metadata & Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-muted truncate max-w-full">
                {course || (language === "th" ? "โปรเจกต์รายวิชา" : "COURSEWORK")}
              </span>
              {status === "in-progress" ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-outline bg-surface text-on-surface-body font-mono text-[11px] shrink-0">
                  {language === "th" ? "กำลังดำเนินการ" : "In Progress"}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-accent-subtle text-primary font-mono text-[11px] shrink-0">
                  {language === "th" ? "เสร็จสมบูรณ์" : "Completed"}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-left font-display text-lg font-semibold tracking-[-0.01em] text-on-surface group-hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              {title}
            </button>

            {hostingTag && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border border-primary/25 bg-accent-subtle text-primary font-mono text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
                  <span>{hostingTag}</span>
                </span>
              </div>
            )}

            <p className="text-[15px] leading-[1.6] text-on-surface-body line-clamp-3">
              {description}
            </p>
          </div>

          {/* Footer Links */}
          <div className="pt-3 border-t border-outline flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1 text-sm font-medium text-on-surface-body hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              <span>{language === "th" ? "ดูรายละเอียด" : "Details"}</span>
              {galleryImages.length > 1 && (
                <span className="font-mono text-[11px] text-on-surface-muted">
                  ({galleryImages.length})
                </span>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-3.5">
              {resolvedLinks.map((item, idx) => {
                const shortLabel =
                  item.type === "github"
                    ? resolvedLinks.filter((l) => l.type === "github").length > 1
                      ? item.labelTh.includes("frontend")
                        ? "Frontend"
                        : item.labelTh.includes("backend")
                          ? "Backend"
                          : "GitHub"
                      : "GitHub"
                    : item.type === "figma"
                      ? "Figma"
                      : language === "th"
                        ? item.labelTh
                        : item.labelEn;

                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <span>{shortLabel}</span>
                    <span className="font-mono text-xs" aria-hidden="true">↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </article>

      {/* Native <dialog> Modal Popup */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby={titleId}
        className="m-auto p-0 bg-transparent border-0 max-w-xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-h-[82dvh] overflow-visible"
      >
        {isModalOpen && (
          <div className="relative bg-surface-panel rounded-[12px] border border-outline w-full max-h-[82dvh] flex flex-col overflow-hidden">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              autoFocus
              className="absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full bg-on-surface/80 hover:bg-on-surface text-on-primary flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>

            {galleryImages.length > 0 && (
              <div className="relative w-full h-44 sm:h-56 md:h-64 bg-surface-subtle border-b border-outline shrink-0">
                <Image
                  src={galleryImages[currentImageIndex]}
                  alt={title}
                  fill
                  className="object-contain p-2.5 sm:p-4"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-panel/90 hover:bg-surface-panel border border-outline text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-panel/90 hover:bg-surface-panel border border-outline text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-surface-panel/95 px-2 py-1 rounded-full border border-outline">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          aria-label={`View image ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === currentImageIndex
                              ? "w-4 bg-primary"
                              : "w-1.5 bg-outline-strong hover:bg-on-surface-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-4 sm:p-5 md:p-6 overflow-y-auto space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-0.5">
                  {course && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      {course}
                    </span>
                  )}
                  <h3
                    id={titleId}
                    className="font-display text-base sm:text-lg md:text-xl font-semibold tracking-[-0.02em] text-on-surface"
                  >
                    {title}
                  </h3>
                </div>
                {hostingTag && (
                  <span className="self-start inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border border-primary/25 bg-accent-subtle text-primary font-mono text-[10px] sm:text-[11px] font-medium shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
                    <span>{hostingTag}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-body whitespace-pre-line">
                {description}
              </p>

              {resolvedLinks.length > 0 && (
                <div className="pt-3 border-t border-outline flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
                  {resolvedLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-[6px] text-xs sm:text-sm font-medium transition-colors duration-150 ${
                        idx === 0
                          ? "bg-slate-cta text-on-primary hover:bg-primary"
                          : "border border-outline-strong text-on-surface hover:border-primary hover:text-primary"
                      }`}
                    >
                      <span>{language === "th" ? item.labelTh : item.labelEn}</span>
                      <span className="font-mono text-xs" aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default ProjectCard;

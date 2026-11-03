"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub, FaGlobe, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaFigma } from "react-icons/fa"; 
import Link from "next/link"; 
import { useLanguage } from "@/app/context/LanguageContext";

const ProjectCard = ({ id, title, imageSrc, images, description, course, link, buttonText, type, status, multipleLinks }) => {
  const isExternal = link ? link.startsWith("http") : false;
  const { language } = useLanguage();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use 'images' array if provided, otherwise fallback to a single array with 'imageSrc'
  const galleryImages = images && images.length > 0 ? images : (imageSrc ? [imageSrc] : []);

  // Handle auto-scroll for modal images
  useEffect(() => {
    let interval;
    if (isModalOpen && galleryImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 3000); // change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isModalOpen, galleryImages.length]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isModalOpen]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
    
  return (
    <>
      {/* Main Card (Clickable) */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-teal-900/10 dark:border-teal-500/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f8fbfb] dark:bg-slate-700 border-b border-slate-100 dark:border-slate-700/50">
          {imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}

          {course && (
            <div className="absolute top-3 left-3 z-10 max-w-[60%]">
              <span className="inline-block truncate px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-slate-700 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-slate-200/80 dark:bg-slate-900/90 dark:text-slate-200 dark:border-slate-700">
                {language === 'th' ? 'รายวิชา' : 'Course'}: {course}
              </span>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            {status === 'success' && (
              <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-teal-800 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-teal-200/70 dark:bg-teal-900/90 dark:text-teal-300 dark:border-teal-700">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 mb-px"></span>
                {language === 'th' ? 'เสร็จสมบูรณ์' : 'Success'}
              </span>
            )}
            {status === 'in-progress' && (
              <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-yellow-800 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-yellow-200/70 dark:bg-yellow-900/90 dark:text-yellow-300 dark:border-yellow-700">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5 mb-px"></span>
                {language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1 justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Action trigger button */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl transition font-semibold text-xs sm:text-sm w-full shadow-2xs ${
                type === 'github' 
                  ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                  : type === 'website'
                    ? 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200/80 dark:bg-teal-900/30 dark:hover:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/50'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/50'
              }`}
            >
              <span>{language === 'th' ? 'อ่านเพิ่มเติม' : 'Read More'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup (Centered on Screen) */}
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
            className="relative bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700 z-10 my-auto"
          >
            {/* Close 'X' Button Only */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-95"
              aria-label="Close modal"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="relative w-full h-48 sm:h-64 md:h-72 bg-[#f8fbfb] dark:bg-slate-900 shrink-0 group/gallery border-b border-slate-100 dark:border-slate-700/60">
                <Image 
                  src={galleryImages[currentImageIndex]} 
                  alt={title} 
                  fill 
                  className="object-contain p-3 sm:p-5 transition-all duration-500" 
                />
                
                {/* Carousel Controls (only if more than 1 image) */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur shadow-md opacity-90 sm:opacity-0 sm:group-hover/gallery:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="text-xs" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur shadow-md opacity-90 sm:opacity-0 sm:group-hover/gallery:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="text-xs" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {galleryImages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-teal-500 w-4' : 'bg-slate-300 dark:bg-slate-600 w-1.5'}`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Modal Body Details (Scrollable) */}
            <div className="p-5 sm:p-7 overflow-y-auto custom-scrollbar flex-1 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {course && (
                    <span className="px-3 py-0.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full border border-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600">
                      {language === 'th' ? 'รายวิชา' : 'Course'}: {course}
                    </span>
                  )}
                  {status === 'success' && (
                    <span className="px-3 py-0.5 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full border border-teal-200/60 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 mb-px"></span>
                      {language === 'th' ? 'เสร็จสมบูรณ์' : 'Success'}
                    </span>
                  )}
                  {status === 'in-progress' && (
                    <span className="px-3 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-50 rounded-full border border-yellow-200/60 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5 mb-px"></span>
                      {language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {title}
                </h2>
              </div>

              {/* Description styled card */}
              <div className="bg-[#f8fbfb] dark:bg-slate-700/30 p-4 sm:p-5 rounded-2xl border border-teal-100/60 dark:border-slate-700/50">
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions (Links Only, No duplicate close button) */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700/80 bg-white dark:bg-slate-800 flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
              {multipleLinks && multipleLinks.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end">
                  {multipleLinks.map((ml, idx) => (
                    <Link
                      key={idx}
                      href={ml.url || '#'}
                      target={ml.url.startsWith("http") ? "_blank" : "_self"} 
                      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition font-semibold text-xs sm:text-sm shadow-sm ${
                        ml.type === 'github' 
                          ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                        : ml.type === 'figma'
                          ? 'bg-[#F24E1E] hover:bg-[#F24E1E]/90 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      {ml.type === 'github' && <FaGithub className="text-[15px]" />}
                      {ml.type === 'figma' && <FaFigma className="text-[15px]" />}
                      {ml.type === 'website' && <FaGlobe className="text-[15px]" />}
                      <span>{language === 'th' ? (ml.labelTh || ml.labelEn) : (ml.labelEn || ml.labelTh)}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={link || '#'}
                  target={isExternal ? "_blank" : "_self"} 
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl transition font-semibold text-xs sm:text-sm shadow-sm w-full sm:w-auto ${
                    type === 'github' 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {type === 'github' && <FaGithub className="text-[15px]" />}
                  {type === 'website' && <FaGlobe className="text-[15px]" />}
                  <span>{buttonText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;

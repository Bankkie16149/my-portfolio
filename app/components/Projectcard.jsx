"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub, FaGlobe, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import Link from "next/link"; 
import { useLanguage } from "@/app/context/LanguageContext";

const ProjectCard = ({ id, title, imageSrc, images, description, link, buttonText, type, status }) => {
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
        className="bg-white dark:bg-slate-800 rounded-2xl border border-teal-900/10 dark:border-teal-500/10 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f0f4f8] dark:bg-slate-700">
          {imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-contain p-2" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            {status === 'success' && (
              <span className="px-3 py-1 text-xs font-semibold text-teal-800 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-teal-100 dark:bg-teal-900/80 dark:text-teal-300 dark:border-teal-700">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 mb-px"></span>
                {language === 'th' ? 'เสร็จสมบูรณ์' : 'Success'}
              </span>
            )}
            {status === 'in-progress' && (
              <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-yellow-100 dark:bg-yellow-900/80 dark:text-yellow-300 dark:border-yellow-700">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5 mb-px"></span>
                {language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
              {description}
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition font-semibold text-sm w-full ${
              type === 'github' 
                ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                : type === 'website'
                  ? 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200/80 dark:bg-teal-900/30 dark:hover:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/50'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/50'
            }`}
          >
            {language === 'th' ? 'อ่านเพิ่มเติม' : 'Read More'}
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
          
          {/* Modal Content */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white dark:bg-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 rounded-full backdrop-blur-md transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Modal Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-[#f0f4f8] dark:bg-slate-900 shrink-0 group/gallery">
                <Image 
                  src={galleryImages[currentImageIndex]} 
                  alt={title} 
                  fill 
                  className="object-contain p-4 transition-all duration-500" 
                />
                
                {/* Carousel Controls (only if more than 1 image) */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/60 hover:bg-white text-slate-800 rounded-full backdrop-blur shadow-md opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/60 hover:bg-white text-slate-800 rounded-full backdrop-blur shadow-md opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                    >
                      <FaChevronRight />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-teal-500 w-4' : 'bg-slate-300/80 dark:bg-slate-600'}`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Modal Body Details (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h2>
                {status === 'success' && (
                  <span className="px-3 py-1 text-xs font-semibold text-teal-800 bg-teal-50 rounded-full border border-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700">
                    {language === 'th' ? 'เสร็จสมบูรณ์' : 'Success'}
                  </span>
                )}
                {status === 'in-progress' && (
                  <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-50 rounded-full border border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700">
                    {language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
                  </span>
                )}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 shrink-0 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              >
                {language === 'th' ? 'ปิด' : 'Close'}
              </button>
              <Link
                href={link || '#'}
                target={isExternal ? "_blank" : "_self"} 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition font-semibold text-sm shadow-sm ${
                  type === 'github' 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {type === 'github' && <FaGithub className="text-[16px]" />}
                {type === 'website' && <FaGlobe className="text-[16px]" />}
                <span>{buttonText}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;

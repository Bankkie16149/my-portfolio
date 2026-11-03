import React from 'react';
import Image from 'next/image';

const InternshipSection = ({ role, company, duration, responsibilities, logoSrc }) => {
  return (
    <div className="relative pl-6 sm:pl-8 md:pl-10 mt-6 first:mt-0">
      {/* Timeline Line */}
      <div className="absolute left-2.5 sm:left-3 top-2 bottom-0 w-px bg-teal-100 dark:bg-slate-700"></div>
      
      {/* Timeline Dot */}
      <div className="absolute left-[5px] sm:left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-teal-500 ring-4 ring-white dark:ring-slate-900 z-10 shadow-sm"></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-100 hover:border-teal-200 shadow-sm transition-all duration-300">
        
        {/* Header Layout */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-xl sm:rounded-lg p-1.5 border border-slate-100 dark:border-slate-600">
              {logoSrc ? (
                <Image 
                  src={logoSrc} 
                  alt={`${company} logo`} 
                  fill 
                  className="object-contain p-1 rounded-md"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-[20px]">business</span>
                </div>
              )}
            </div>
            
            <div className="pt-0.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">
                {role}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">corporate_fare</span>
                {company}
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto sm:text-right shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-[11px] font-semibold border border-slate-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-[14px] text-teal-600">date_range</span>
              {duration}
            </span>
          </div>
        </div>
        
        {/* Details / Responsibilities Layout */}
        <div className="pl-0 sm:pl-[4.5rem] pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700/60">
          <ul className="space-y-2 sm:space-y-2.5">
            {responsibilities.map((task, index) => {
              if (!task.trim()) return null;
              return (
                <li key={index} className="flex items-start gap-2 sm:gap-2.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-teal-500 shrink-0 mt-0.5">play_arrow</span>
                  <span className="pt-[1px]">{task}</span>
                </li>
              );
            })}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default InternshipSection;

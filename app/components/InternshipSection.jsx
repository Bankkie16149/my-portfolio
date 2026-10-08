import React from 'react';
import Image from 'next/image';

const InternshipSection = ({ role, company, duration, responsibilities, logoSrc }) => {
  return (
    <div className="relative pl-8 md:pl-10 mt-6 first:mt-0">
      {/* Timeline Line */}
      <div className="absolute left-3 top-2 bottom-0 w-px bg-teal-100 dark:bg-slate-700"></div>
      
      {/* Timeline Dot */}
      <div className="absolute left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-teal-500 ring-4 ring-white dark:ring-slate-900 z-10 shadow-sm"></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 hover:border-teal-200 shadow-sm transition-all duration-300">
        
        {/* Header Layout */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-lg p-1.5 border border-slate-100 dark:border-slate-600">
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
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">
                {role}
              </h3>
              <p className="text-sm font-medium text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">corporate_fare</span>
                {company}
              </p>
            </div>
          </div>

          <div className="sm:text-right shrink-0 pt-0.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md text-[11px] font-semibold border border-slate-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-[14px]">date_range</span>
              {duration}
            </span>
          </div>
        </div>
        
        {/* Details / Responsibilities Layout */}
        <div className="pl-[4.5rem]">
          <ul className="space-y-2.5">
            {responsibilities.map((task, index) => {
              if (!task.trim()) return null;
              return (
                <li key={index} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  <span className="material-symbols-outlined text-[16px] text-teal-400 shrink-0 mt-0.5">play_arrow</span>
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

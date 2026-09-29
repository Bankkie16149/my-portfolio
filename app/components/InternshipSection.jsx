import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const InternshipSection = ({ id, role, company, duration, responsibilities, techStack, logoSrc }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-teal-900/10 dark:border-teal-500/10 shadow-sm flex flex-col group hover:shadow-md transition duration-300">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-[#f7fcfb] dark:bg-slate-700/50 rounded-xl p-2 border border-teal-100/70 dark:border-teal-800/50">
            {logoSrc ? (
              <Image 
                src={logoSrc} 
                alt={`${company} logo`} 
                fill 
                className="object-contain p-2 rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                Logo
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {role}
            </h3>
            <p className="text-base font-semibold text-teal-600 dark:text-teal-400">
              {company}
            </p>
          </div>
        </div>

        <div className="whitespace-nowrap flex-shrink-0">
          <span className="inline-flex items-center px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
            {duration}
          </span>
        </div>
      </div>
      
      <div className="mt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Responsibilities
        </h4>
        <ul className="space-y-2">
          {responsibilities.map((task, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-teal-400 shrink-0"></span>
              {task}
            </li>
          ))}
        </ul>

        {techStack && techStack.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs font-medium bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipSection;

import React from "react";
import Image from "next/image";

const InternshipSection = ({ role, company, duration, responsibilities, logoSrc }) => {
  return (
    <article className="bg-surface-panel border border-outline rounded-[8px] p-4 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col gap-4 sm:gap-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-outline">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          {logoSrc ? (
            <div className="relative w-11 h-11 shrink-0 rounded-[6px] border border-outline bg-surface-subtle overflow-hidden">
              <Image
                src={logoSrc}
                alt={`${company} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="w-11 h-11 shrink-0 rounded-[6px] border border-outline bg-surface-subtle flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">business</span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-semibold text-on-surface leading-snug">
              {company}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-on-surface-muted mt-0.5">
              {role}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-[4px] border border-outline bg-surface text-on-surface font-mono text-[11px] font-medium tabular-nums self-start sm:self-auto shrink-0">
          {duration}
        </span>
      </div>

      {/* Responsibilities List */}
      <ul className="space-y-2.5 text-on-surface-body">
        {responsibilities.map((task, index) => {
          if (!task.trim()) return null;
          return (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-[1.65]"
            >
              <span className="font-mono text-xs text-primary mt-1 shrink-0" aria-hidden="true">
                —
              </span>
              <span>{task}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default InternshipSection;

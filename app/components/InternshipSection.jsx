import React from "react";
import Image from "next/image";

const InternshipSection = ({ role, company, duration, responsibilities, logoSrc }) => {
  return (
    <article className="pt-6 border-t border-outline flex flex-col gap-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div className="flex items-center gap-3.5">
          {logoSrc && (
            <div className="relative w-11 h-11 shrink-0 rounded-[6px] border border-outline bg-surface-subtle overflow-hidden">
              <Image
                src={logoSrc}
                alt={`${company} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-semibold text-on-surface leading-snug">
              {company}
            </h3>
            <p className="text-sm font-medium text-on-surface-muted mt-0.5">
              {role}
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-medium text-primary tabular-nums shrink-0">
          {duration}
        </span>
      </div>

      {/* Responsibilities List */}
      <ul className="space-y-2.5 sm:pl-[3.625rem]">
        {responsibilities.map((task, index) => {
          if (!task.trim()) return null;
          return (
            <li
              key={index}
              className="flex items-start gap-2.5 text-[15px] leading-[1.65] text-on-surface-body"
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

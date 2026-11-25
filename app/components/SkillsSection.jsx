"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Reveal, StaggerGroup, StaggerItem, SkillBar } from "@/app/components/MotionPrimitives";

export default function SkillsSection() {
  const { language } = useLanguage();

  const skillsGroups = [
    {
      title: "Front-end",
      icon: "desktop_windows",
      skills: [
        { name: "HTML", percent: 80 },
        { name: "CSS", percent: 85 },
        { name: "JavaScript", percent: 65 },
      ],
    },
    {
      title: "Back-end",
      icon: "dns",
      skills: [
        { name: "Node.js", percent: 50 },
        { name: "MySQL", percent: 75 },
      ],
    },
    {
      title: "Framework",
      icon: "widgets",
      skills: [
        { name: "React.js", percent: 80 },
        { name: "Vite", percent: 70 },
        { name: "Tailwind", percent: 65 },
      ],
    },
    {
      title: "Version Control",
      icon: "fork_right",
      skills: [
        { name: "Git", percent: 70 },
        { name: "GitHub", percent: 70 },
      ],
    },
  ];

  return (
    <section
      id="section-skills"
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 border-t border-outline"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div>
            <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
              03 / SKILLS
            </span>
            <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface mt-1">
              {language === "th" ? "ทักษะและความสามารถ" : "Skills"}
            </h2>
          </div>
          <span className="font-mono text-[11px] text-on-surface-muted uppercase tracking-wider">
            {language === "th" ? "ระดับความถนัด" : "PROFICIENCY"}
          </span>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {skillsGroups.map((group, gIdx) => (
          <StaggerItem key={group.title} className="h-full">
            <div className="h-full bg-surface-panel border border-outline rounded-[8px] p-4 sm:p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-outline-strong transition-colors duration-200 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-outline">
                <span
                  className="material-symbols-outlined text-[18px] text-primary"
                  aria-hidden="true"
                >
                  {group.icon}
                </span>
                <h3 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-3.5">
                {group.skills.map((skill, sIdx) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-on-surface">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-on-surface-muted tabular-nums shrink-0">
                        {skill.percent}%
                      </span>
                    </div>
                    <SkillBar percent={skill.percent} delay={gIdx * 0.06 + sIdx * 0.05} />
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

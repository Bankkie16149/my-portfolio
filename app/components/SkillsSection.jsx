"use client";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function SkillsSection() {
  const { language } = useLanguage();

  const skillsGroups = [
    {
      title: "Front-end",
      skills: [
        { name: "HTML5 & Semantic Markup", percent: 80 },
        { name: "CSS3 & Modern Layout", percent: 85 },
        { name: "JavaScript (ES6+)", percent: 65 },
        { name: "Progressive Web Apps", percent: 70 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React.js", percent: 80 },
        { name: "Next.js", percent: 75 },
        { name: "Vite", percent: 70 },
        { name: "Tailwind CSS", percent: 75 },
        { name: "Flutter & Dart", percent: 65 },
      ],
    },
    {
      title: "Back-end & Tools",
      skills: [
        { name: "Node.js & Express", percent: 60 },
        { name: "MySQL & Firebase", percent: 75 },
        { name: "Git & GitHub", percent: 75 },
        { name: "Docker & Cypress", percent: 60 },
      ],
    },
    {
      title: "Design & Methodology",
      skills: [
        { name: "UI/UX Systems & Figma", percent: 80 },
        { name: "Material Design", percent: 75 },
        { name: "Agile & Scrum", percent: 75 },
        { name: "System Modeling (DFD)", percent: 75 },
      ],
    },
  ];

  return (
    <section
      id="section-skills"
      className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24"
    >
      <div className="mb-8 md:mb-10">
        <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
          02 / CAPABILITIES
        </span>
        <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface mt-1">
          {language === "th" ? "ทักษะและความสามารถ" : "Core Skills & Arsenal"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillsGroups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col gap-4 pt-4 border-t border-outline"
          >
            <h3 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
              {group.title}
            </h3>
            <ul className="space-y-2.5">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-baseline justify-between gap-2 text-[15px] leading-6 text-on-surface-body"
                >
                  <span>{skill.name}</span>
                  <span className="font-mono text-[11px] text-on-surface-muted tabular-nums shrink-0">
                    {skill.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

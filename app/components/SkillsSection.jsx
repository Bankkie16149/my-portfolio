"use client";
import React from "react";
import { FaLaptopCode } from "react-icons/fa";

export default function SkillsSection() {
  const skillsData = [
    {
      title: "Front-end",
      icon: "desktop_windows",
      colorClass: "text-teal-600",
      skills: [
        { name: "HTML", percent: 80 },
        { name: "CSS", percent: 85 },
        { name: "JavaScript", percent: 65 },
      ]
    },
    {
      title: "Back-end",
      icon: "dns",
      colorClass: "text-teal-700",
      skills: [
        { name: "Node.js", percent: 50 },
        { name: "MySQL", percent: 75 },
      ]
    },
    {
      title: "Framework",
      icon: "widgets",
      colorClass: "text-cyan-600",
      skills: [
        { name: "React.js", percent: 80 },
        { name: "Next.js", percent: 80 },
        { name: "Vite", percent: 70 },
      ]
    },
    {
      title: "Version Control",
      icon: "fork_right",
      colorClass: "text-teal-600",
      skills: [
        { name: "Git", percent: 70 },
        { name: "GitHub", percent: 70 },
      ]
    }
  ];

  return (
    <section id="section-skills" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft">
      <div className="flex items-center gap-3 pb-6 border-b border-teal-50 mb-8">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/80">
          <FaLaptopCode className="text-[20px]" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">SKILLS</h2>
          <p className="text-xs text-slate-400 font-mono">ทักษะและความสามารถ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((group, idx) => (
          <div key={idx} className="bg-[#f8fbfb] rounded-xl p-5 border border-teal-100/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`material-symbols-outlined text-lg ${group.colorClass}`}>
                  {group.icon}
                </span>
                <h3 className="font-display font-bold text-slate-800 text-base">{group.title}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{skill.name}</span>
                      <span className={`font-mono font-semibold ${group.colorClass}`}>{skill.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" 
                        style={{ width: `${skill.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

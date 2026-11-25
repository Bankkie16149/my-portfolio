"use client";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import SkillsSection from "@/app/components/SkillsSection";
import ProjectCard from "@/app/components/Projectcard";
import InternshipSection from "@/app/components/InternshipSection";
import PersonalProjectSection from "@/app/components/PersonalProjectSection";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { profileData, projectsData, internshipsData, educationData } from "@/app/data/portfolio";

export default function Home() {
  const { language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const profile = profileData;
  const educations = educationData || [];
  const projects = projectsData || [];
  const internships = internshipsData || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            let sectionName = "หน้าแรก (Home Overview)";

            if (sectionId === "section-hero") sectionName = "หน้าแรก (Home Overview)";
            if (sectionId === "section-about") sectionName = "ประวัติการศึกษา & แนะนำตัว (About)";
            if (sectionId === "section-education") sectionName = "ประวัติการศึกษา (Education)";
            if (sectionId === "section-skills") sectionName = "ทักษะ & ผลงาน Front-end";
            if (sectionId === "section-projects") sectionName = "โปรเจกต์ของฉัน (Projects)";
            if (sectionId === "section-personal-project") sectionName = "โปรเจกต์ส่วนตัว (Personal Project - FinTrack)";
            if (sectionId === "section-internship") sectionName = "ประสบการณ์ & การฝึกงาน (Internship)";

            const visitorId = sessionStorage.getItem("visitorId");
            if (visitorId) {
              fetch("/api/visitors", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: visitorId, sectionViewed: sectionName }),
              }).catch((e) => console.log(e));
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('section[id^="section-"]').forEach((section) => {
        observer.observe(section);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div id="top" className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION (Editorial & Asymmetric) */}
        <section
          id="section-hero"
          className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Right on Desktop, Top on Mobile: Profile Portrait */}
            <div className="order-1 lg:order-2 lg:col-span-4 flex flex-col gap-2">
              <div className="relative w-52 sm:w-64 lg:w-full aspect-[3/4] rounded-[8px] border border-outline overflow-hidden bg-surface-subtle">
                <Image
                  src="/20241009_083423_368.JPG"
                  alt="Portrait of Tanakorn Tipwarreerattana"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="w-52 sm:w-64 lg:w-full flex items-center justify-between text-on-surface-muted pt-1">
                <span className="font-mono text-[11px] uppercase">
                  {language === "th" ? "ชั้นปีที่ 3 • D.S.T." : "YEAR 3 • B.SC. D.S.T."}
                </span>
                <span className="font-mono text-[11px] uppercase">MAHIDOL ICT</span>
              </div>
            </div>

            {/* Left on Desktop, Below Portrait on Mobile: Statement & Intro */}
            <div className="order-2 lg:order-1 lg:col-span-8 flex flex-col gap-5 sm:gap-6">
              <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                {language === "th"
                  ? "นักพัฒนา Front-end & UI Designer — กรุงเทพฯ"
                  : "Front-end Developer & UI Designer — Bangkok, TH"}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl md:text-[50px] font-bold tracking-[-0.025em] leading-[1.15] text-on-surface text-balance">
                {language === "th" ? (
                  <>
                    สวัสดีครับ ผม{" "}
                    <span className="text-primary">{profile.name}</span>
                  </>
                ) : (
                  "Front-end Developer crafting precise, high-performance web applications."
                )}
              </h1>

              <p className="text-base sm:text-[17px] leading-[1.7] text-on-surface-body max-w-2xl text-pretty">
                {language === "th" ? profile.bio : profile.bioEn}
              </p>

              {/* Direct Inline Action Links */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-on-surface hover:text-primary border-b border-outline-strong hover:border-primary pb-0.5 transition-colors duration-150"
                >
                  <span>{language === "th" ? "ติดต่ออีเมล" : "Email"}</span>
                  <span className="font-mono text-xs text-primary" aria-hidden="true">↗</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-on-surface hover:text-primary border-b border-outline-strong hover:border-primary pb-0.5 transition-colors duration-150"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono text-xs text-primary" aria-hidden="true">↗</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-on-surface hover:text-primary border-b border-outline-strong hover:border-primary pb-0.5 transition-colors duration-150"
                >
                  <span>GitHub</span>
                  <span className="font-mono text-xs text-primary" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* HAIRLINE DIVIDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <hr className="border-t border-outline" />
        </div>

        {/* 2. ABOUT ME & EDUCATION (Clean Two-Column Editorial Grid) */}
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="mb-8 md:mb-10">
            <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
              01 / BACKGROUND
            </span>
            <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface mt-1">
              {language === "th" ? "เกี่ยวกับฉันและการศึกษา" : "About & Education"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: About Me */}
            <section id="section-about" className="flex flex-col gap-4">
              <div className="pb-2 border-b border-outline flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
                  {language === "th" ? "ข้อมูลส่วนตัว" : "Personal Information"}
                </h3>
                <span className="font-mono text-[11px] text-on-surface-muted">PROFILE</span>
              </div>

              <dl className="divide-y divide-outline">
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">
                    {language === "th" ? "ชื่อ" : "Name"}
                  </dt>
                  <dd className="text-sm sm:text-[15px] font-medium text-on-surface text-right">
                    {language === "th" ? profile.name : profile.nameEn}
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">
                    {language === "th" ? "คณะ" : "Faculty"}
                  </dt>
                  <dd className="text-sm sm:text-[15px] text-on-surface-body text-right">
                    {language === "th" ? profile.faculty : profile.facultyEn}
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">
                    {language === "th" ? "เบอร์โทร" : "Phone"}
                  </dt>
                  <dd className="text-right">
                    <a
                      href={`tel:${profile.phone}`}
                      className="font-mono text-sm text-on-surface hover:text-primary transition-colors tabular-nums"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">
                    {language === "th" ? "อีเมล" : "Email"}
                  </dt>
                  <dd className="text-right min-w-0">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm text-primary hover:underline truncate block"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">LinkedIn</dt>
                  <dd className="text-right">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <span>Tanakorn Tipwarreerattana</span>
                      <span className="font-mono text-xs" aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-on-surface-muted shrink-0">GitHub</dt>
                  <dd className="text-right">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <span>Bankkie16149</span>
                      <span className="font-mono text-xs" aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            {/* Right Column: Education */}
            <section id="section-education" className="flex flex-col gap-4">
              <div className="pb-2 border-b border-outline flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
                  {language === "th" ? "ประวัติการศึกษา" : "Education"}
                </h3>
                <span className="font-mono text-[11px] text-on-surface-muted">ACADEMIC</span>
              </div>

              <div className="divide-y divide-outline">
                {educations.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className={`${idx === 0 ? "pb-5" : "py-5"} flex flex-col gap-1.5`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-lg font-semibold text-on-surface">
                        {language === "th" ? edu.schoolTh : edu.schoolEn}
                      </h4>
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          idx === 0 ? "text-primary font-medium" : "text-on-surface-muted"
                        }`}
                      >
                        {language === "th" ? edu.yearsTh : edu.yearsEn}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-on-surface-body">
                      {language === "th" ? edu.degreeTh : edu.degreeEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* HAIRLINE DIVIDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <hr className="border-t border-outline" />
        </div>

        {/* 3. SKILLS SECTION */}
        <SkillsSection />

        {/* HAIRLINE DIVIDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <hr className="border-t border-outline" />
        </div>

        {/* 4. MY PROJECTS (Academic & Engineering Projects) */}
        <section
          id="section-projects"
          className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24"
        >
          <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
                03 / SELECTED WORK
              </span>
              <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface">
                {language === "th" ? "โปรเจกต์ของฉัน" : "Academic & Engineering Projects"}
              </h2>
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-on-surface-body hover:text-primary transition-colors duration-150 shrink-0"
            >
              <span>{language === "th" ? "ดู GitHub ทั้งหมด" : "All repositories"}</span>
              <span className="font-mono text-xs" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {projects.map((project) => {
              const type = project.tags?.[0] || "website";
              const defaultLink = project.projectUrl || project.githubUrl || "#";

              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  imageSrc={project.imageUrl || project.image}
                  images={project.images}
                  description={
                    language === "th"
                      ? project.descriptionTh || project.description
                      : project.descriptionEn || project.description
                  }
                  course={language === "th" ? project.courseTh : project.courseEn}
                  link={defaultLink}
                  type={type}
                  status={project.tags?.[1] || "success"}
                  multipleLinks={project.links}
                />
              );
            })}
          </div>
        </section>

        {/* HAIRLINE DIVIDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <hr className="border-t border-outline" />
        </div>

        {/* 5. PERSONAL PROJECT (FinTrack — Placed directly before Internship) */}
        <PersonalProjectSection />

        {/* HAIRLINE DIVIDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <hr className="border-t border-outline" />
        </div>

        {/* 6. INTERNSHIP SECTION */}
        <section
          id="section-internship"
          className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
                05 / EXPERIENCE
              </span>
              <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface">
                {language === "th" ? "ประสบการณ์และการฝึกงาน" : "Internship & Experience"}
              </h2>
            </div>

            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-primary uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true"></span>
              <span>
                {language === "th"
                  ? "พร้อมสำหรับการฝึกงาน / สหกิจศึกษา"
                  : "OPEN FOR FRONT-END INTERNSHIP"}
              </span>
            </span>
          </div>

          {/* Subtle Editorial Availability Note */}
          <div className="pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[15px] leading-[1.65] text-on-surface-body max-w-2xl">
              {language === "th"
                ? "สนใจร่วมฝึกงานในตำแหน่ง Front-end Developer พร้อมนำทักษะการออกแบบและพัฒนา UI ด้วย Modern Web Framework มาประยุกต์ใช้ในการทำงานจริง"
                : "Looking for Front-end Developer internships to apply modern UI engineering and web framework skills in collaborative production teams."}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[6px] border border-outline-strong bg-surface text-on-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-150 shrink-0 self-start sm:self-auto"
            >
              <span>{language === "th" ? "ส่งข้อความติดต่อ" : "Send Message"}</span>
              <span className="font-mono text-xs" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="space-y-8">
            {internships.map((internship) => (
              <InternshipSection
                key={internship.id}
                role={
                  language === "th"
                    ? internship.roleTh || internship.role
                    : internship.roleEn || internship.role
                }
                company={
                  language === "th"
                    ? internship.companyTh || internship.company
                    : internship.companyEn || internship.company
                }
                duration={
                  language === "th"
                    ? `${internship.startDateTh || internship.startDate} – ${internship.endDateTh || internship.endDate}`
                    : `${internship.startDateEn || internship.startDate} – ${internship.endDateEn || internship.endDate}`
                }
                responsibilities={
                  (language === "th"
                    ? internship.descriptionTh || internship.description
                    : internship.descriptionEn || internship.description
                  )?.split("\n") || []
                }
                logoSrc={internship.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 7. MINIMAL EDITORIAL FOOTER */}
      <footer className="border-t border-outline bg-surface">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-outline">
            <div className="flex flex-col gap-2 max-w-lg">
              <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                {language === "th"
                  ? "เปิดรับโอกาสฝึกงานและร่วมงาน"
                  : "OPEN FOR FRONT-END INTERNSHIP & CO-OP"}
              </span>
              <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] text-on-surface">
                {language === "th"
                  ? "มาร่วมสร้างผลงานไปด้วยกัน"
                  : "Let's build something together."}
              </h2>
              <p className="text-[15px] leading-relaxed text-on-surface-body">
                {language === "th"
                  ? "ติดต่อสอบถามหรือพูดคุยเรื่องตำแหน่งฝึกงาน Front-end Developer และโปรเจกต์ด้านเว็บแอปพลิเคชันได้ตลอดเวลาครับ"
                  : "Available for Front-end Developer internships, collaborative engineering teams, and modern web interface projects."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] border border-outline-strong bg-surface text-on-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {copiedEmail ? "check" : "content_copy"}
                </span>
                <span>
                  {copiedEmail
                    ? language === "th"
                      ? "คัดลอกอีเมลแล้ว"
                      : "Copied to clipboard"
                    : profile.email}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="font-mono text-[11px] text-on-surface-muted">
                © 2026 Tanakorn Tipwarreerattana
              </span>
              <span className="font-mono text-[11px] text-on-surface-muted">
                Built with Next.js &amp; Tailwind CSS
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-on-surface-body hover:text-primary transition-colors duration-150"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-on-surface-body hover:text-primary transition-colors duration-150"
              >
                GitHub ↗
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="font-mono text-[11px] text-on-surface-body hover:text-primary transition-colors duration-150 tabular-nums"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

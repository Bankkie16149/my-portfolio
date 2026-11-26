"use client";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import SkillsSection from "@/app/components/SkillsSection";
import ProjectCard from "@/app/components/Projectcard";
import InternshipSection from "@/app/components/InternshipSection";
import PersonalProjectSection from "@/app/components/PersonalProjectSection";
import { MotionRoot, Reveal, StaggerGroup, StaggerItem } from "@/app/components/MotionPrimitives";
import { MdArrowForward, MdPersonOutline, MdSchool, MdCheck, MdContentCopy } from "react-icons/md";
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
    <MotionRoot>
      <div id="top" className="min-h-screen bg-surface text-on-surface flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* 1. HERO SECTION (Asymmetric + Subtle 28px Architectural Grid) */}
          <section
            id="section-hero"
            className="relative overflow-hidden border-b border-outline"
          >
            <div className="hero-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Right on Desktop, Top on Mobile: Portrait in Subtle White Frame */}
                <Reveal immediate delay={0.1} y={20} className="order-1 lg:order-2 lg:col-span-4 flex flex-col items-center lg:items-stretch gap-2">
                  <div className="w-48 sm:w-60 lg:w-full p-1.5 rounded-[8px] border border-outline bg-surface-panel shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                    <div className="relative aspect-[3/4] rounded-[6px] overflow-hidden bg-surface-subtle">
                      <Image
                        src="/20241009_083423_368.JPG"
                        alt="Portrait of Tanakorn Tipwarreerattana"
                        fill
                        priority
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="w-48 sm:w-60 lg:w-full flex items-center justify-between text-on-surface-muted px-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase">
                      {language === "th" ? "ชั้นปีที่ 3 • D.S.T." : "B.SC. D.S.T."}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase">MAHIDOL ICT</span>
                  </div>
                </Reveal>

                {/* Left on Desktop, Below Portrait on Mobile */}
                <div className="order-2 lg:order-1 lg:col-span-8 flex flex-col gap-4 sm:gap-6">
                  <Reveal immediate delay={0} y={14}>
                    <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                      {language === "th"
                        ? "ชั้นปีที่ 3 • คณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)"
                        : "Year 3 • Faculty of ICT, Mahidol University"}
                    </span>
                  </Reveal>

                  <Reveal immediate delay={0.07} y={16}>
                    <h1 className="font-display text-2xl sm:text-4xl md:text-[48px] font-bold tracking-[-0.025em] leading-[1.2] sm:leading-[1.18] text-on-surface text-balance">
                      {language === "th" ? (
                        <>
                          สวัสดีครับ ผมชื่อ{" "}
                          <span className="text-primary">{profile.name}</span>
                        </>
                      ) : (
                        <>
                          Hello, I&apos;m{" "}
                          <span className="text-primary">{profile.nameEn}</span>
                        </>
                      )}
                    </h1>
                  </Reveal>

                  <Reveal immediate delay={0.14} y={16}>
                    <p className="text-sm sm:text-base md:text-[17px] leading-[1.7] text-on-surface-body max-w-2xl text-pretty">
                      {language === "th" ? profile.bio : profile.bioEn}
                    </p>
                  </Reveal>

                  {/* Primary CTA + Bordered Secondary Links */}
                  <Reveal immediate delay={0.2} y={14}>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 pt-1">
                      <a
                        href={`mailto:${profile.email}`}
                        className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-slate-cta text-on-primary text-sm font-medium hover:bg-primary transition-colors duration-150"
                      >
                        <span>{language === "th" ? "ติดต่ออีเมล" : "Contact Email"}</span>
                        <MdArrowForward className="text-[16px]" aria-hidden="true" />
                      </a>

                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[6px] border border-outline-strong bg-surface-panel text-on-surface text-sm font-medium hover:border-on-surface hover:text-primary transition-colors duration-150"
                      >
                        <span>LinkedIn</span>
                        <span className="font-mono text-xs text-primary" aria-hidden="true">↗</span>
                      </a>

                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[6px] border border-outline-strong bg-surface-panel text-on-surface text-sm font-medium hover:border-on-surface hover:text-primary transition-colors duration-150"
                      >
                        <span>GitHub</span>
                        <span className="font-mono text-xs text-primary" aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </Reveal>

                  {/* 3-Item Horizontal Highlight Strip */}
                  <Reveal immediate delay={0.26} y={12}>
                    <div className="pt-4 mt-1 border-t border-outline flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-0 sm:divide-x sm:divide-outline">
                      <div className="sm:pr-5">
                        <span className="font-mono text-xs font-medium text-on-surface">
                          {language === "th" ? "มหาวิทยาลัยมหิดล (ICT ปี 3)" : "Mahidol University (ICT Year 3)"}
                        </span>
                      </div>
                      <div className="sm:px-5">
                        <span className="font-mono text-xs font-medium text-on-surface">
                          {language === "th" ? "5 โปรเจกต์เว็บ & มือถือ" : "5 Web & Mobile Projects"}
                        </span>
                      </div>
                      <div className="sm:pl-5">
                        <span className="font-mono text-xs font-medium text-on-surface">
                          {language === "th" ? "Front-end & Full-Stack" : "Front-end & Full-Stack"}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </div>

              </div>
            </div>
          </section>

          {/* 2. ABOUT & EDUCATION (Side-by-Side Crisp White Panels on #f8fafc) */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Left Panel: About / Personal Info */}
              <StaggerItem className="h-full">
                <section
                  id="section-about"
                  className="h-full bg-surface-panel border border-outline rounded-[8px] p-4 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col gap-4"
                >
              <div className="flex items-center justify-between pb-3 border-b border-outline">
                <div className="flex items-center gap-2">
                  <MdPersonOutline className="text-[18px] text-primary" aria-hidden="true" />
                  <h2 className="font-display text-base sm:text-lg font-semibold text-on-surface">
                    {language === "th" ? "เกี่ยวกับฉัน" : "About Me"}
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-on-surface-muted">01 / PROFILE</span>
              </div>

              <dl className="divide-y divide-outline">
                <div className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
                  <dt className="font-mono text-[11px] text-on-surface-muted uppercase shrink-0">
                    {language === "th" ? "ชื่อ" : "Name"}
                  </dt>
                  <dd className="text-sm sm:text-[15px] font-medium text-on-surface sm:text-right">
                    {language === "th" ? profile.name : profile.nameEn}
                  </dd>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
                  <dt className="font-mono text-[11px] text-on-surface-muted uppercase shrink-0">
                    {language === "th" ? "คณะ" : "Faculty"}
                  </dt>
                  <dd className="text-sm sm:text-[15px] text-on-surface sm:text-right">
                    {language === "th" ? profile.faculty : profile.facultyEn}
                  </dd>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
                  <dt className="font-mono text-[11px] text-on-surface-muted uppercase shrink-0">
                    {language === "th" ? "อีเมล" : "Email"}
                  </dt>
                  <dd className="sm:text-right min-w-0">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm sm:text-[15px] text-primary hover:underline break-all sm:break-normal"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11px] text-on-surface-muted uppercase shrink-0">
                    {language === "th" ? "เบอร์โทร" : "Phone"}
                  </dt>
                  <dd className="text-right">
                    <a
                      href={`tel:${profile.phone}`}
                      className="font-mono text-sm text-on-surface hover:text-primary tabular-nums transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div className="pt-3 flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[11px] text-on-surface-muted uppercase shrink-0">
                    {language === "th" ? "โซเชียล" : "Social"}
                  </dt>
                  <dd className="flex items-center gap-4 text-right">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      GitHub ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
              </StaggerItem>

              {/* Right Panel: Education */}
              <StaggerItem className="h-full">
                <section
                  id="section-education"
                  className="h-full bg-surface-panel border border-outline rounded-[8px] p-4 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-outline">
                    <div className="flex items-center gap-2">
                      <MdSchool className="text-[18px] text-primary" aria-hidden="true" />
                      <h2 className="font-display text-base sm:text-lg font-semibold text-on-surface">
                        {language === "th" ? "การศึกษา" : "Education"}
                      </h2>
                    </div>
                    <span className="font-mono text-[11px] text-on-surface-muted">02 / ACADEMIC</span>
                  </div>

                  <div className="divide-y divide-outline">
                    {educations.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className={`${idx === 0 ? "pb-4" : "pt-4"} flex flex-col gap-1.5`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-base sm:text-lg font-semibold text-on-surface">
                            {language === "th" ? edu.schoolTh : edu.schoolEn}
                          </h3>
                          <span
                            className={`font-mono text-[11px] tabular-nums ${
                              idx === 0 ? "text-primary font-medium" : "text-on-surface-muted"
                            }`}
                          >
                            {language === "th" ? edu.yearsTh : edu.yearsEn}
                          </span>
                        </div>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-on-surface-body">
                          {language === "th" ? edu.degreeTh : edu.degreeEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </StaggerItem>

            </StaggerGroup>
          </div>

        {/* 3. SKILLS SECTION */}
        <SkillsSection />

        {/* 4. ACADEMIC & ENGINEERING PROJECTS */}
        <section
          id="section-projects"
          className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 border-t border-outline"
        >
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
                  04 / PROJECTS
                </span>
                <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface">
                  {language === "th" ? "โปรเจกต์ของฉัน" : "My Projects"}
                </h2>
              </div>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-on-surface-body hover:text-primary transition-colors duration-150 shrink-0 self-start sm:self-auto"
              >
                <span>{language === "th" ? "ดู GitHub ทั้งหมด" : "View all on GitHub"}</span>
                <span className="font-mono text-xs" aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project) => {
              const type = project.tags?.[0] || "website";
              const defaultLink = project.projectUrl || project.githubUrl || "#";

              return (
                <StaggerItem key={project.id} className="h-full">
                  <ProjectCard
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
                    hostingTag={project.hostingTag}
                    multipleLinks={project.links}
                  />
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* 5. PERSONAL PROJECT — FINTRACK (High-Contrast Dark Obsidian Showcase Band) */}
        <PersonalProjectSection />

        {/* 6. INTERNSHIP & EXPERIENCE (Return to #f8fafc Canvas) */}
        <section
          id="section-internship"
          className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20"
        >
          <Reveal>
            <div className="mb-6 sm:mb-8">
              <span className="font-mono text-xs font-medium text-on-surface-muted uppercase tracking-wider">
                06 / INTERNSHIP
              </span>
              <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] leading-tight text-on-surface mt-1">
                {language === "th" ? "การฝึกงาน" : "Internship"}
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Open for Front-end Internship Status Bar (Left Teal Accent) */}
            

            {/* Experience Cards */}
            {internships.map((internship, idx) => (
              <Reveal key={internship.id} delay={0.1 + idx * 0.06}>
                <InternshipSection
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
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-outline bg-surface-panel">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 border-b border-outline">
              <div className="flex flex-col gap-2 max-w-lg">
                <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                  {language === "th" ? "ช่องทางการติดต่อ" : "CONTACT"}
                </span>
                <h2 className="font-display text-2xl sm:text-[32px] font-semibold tracking-[-0.02em] text-on-surface">
                  {language === "th" ? "ติดต่อร่วมงานหรือฝึกงาน" : "Get in Touch"}
                </h2>
                <p className="text-sm sm:text-[15px] leading-relaxed text-on-surface-body">
                  {language === "th"
                    ? "สามารถติดต่อได้ทางอีเมล เบอร์โทรศัพท์ หรือช่องทางโซเชียลด้านล่างครับ"
                    : "Feel free to reach out via email, phone, or the social links below."}
                </p>
              </div>

              <div className="w-full md:w-auto flex items-center">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-slate-cta text-on-primary text-xs sm:text-sm font-medium hover:bg-primary transition-colors duration-150 cursor-pointer w-full sm:w-auto max-w-full"
                >
                  {copiedEmail ? (
                    <MdCheck className="text-[16px] shrink-0" aria-hidden="true" />
                  ) : (
                    <MdContentCopy className="text-[16px] shrink-0" aria-hidden="true" />
                  )}
                  <span className="truncate">
                    {copiedEmail
                      ? language === "th"
                        ? "คัดลอกอีเมลแล้ว"
                        : "Copied to clipboard"
                      : profile.email}
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="font-mono text-[11px] text-on-surface-muted">
                © 2026 Tanakorn Tipwarreerattana
              </span>
              <span className="font-mono text-[11px] text-on-surface-muted">
                Built with Next.js &amp; Tailwind CSS
              </span>
            </div>

          
          </div>
        </div>
      </footer>
      </div>
    </MotionRoot>
  );
}

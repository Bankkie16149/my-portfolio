"use client";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import SkillsSection from "@/app/components/SkillsSection";
import ProjectCard from "@/app/components/Projectcard";
import InternshipSection from '@/app/components/InternshipSection';
import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { profileData, projectsData, internshipsData, educationData } from "@/app/data/portfolio";
import { FaLinkedin } from "react-icons/fa";

export default function Home() {
  const { language } = useLanguage();
  const profile = profileData;
  const educations = educationData || [];
  const projects = projectsData || [];
  const internships = internshipsData || [];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          let sectionName = "หน้าแรก (Home Overview)";
          
          if (sectionId === 'section-hero') sectionName = "หน้าแรก (Home Overview)";
          if (sectionId === 'section-about') sectionName = "ประวัติการศึกษา & แนะนำตัว (About)";
          if (sectionId === 'section-education') sectionName = "ประวัติการศึกษา (Education)";
          if (sectionId === 'section-skills') sectionName = "ทักษะ & ผลงาน Front-end";
          if (sectionId === 'section-projects') sectionName = "โปรเจกต์ของฉัน (Projects)";
          if (sectionId === 'section-internship') sectionName = "ประสบการณ์ & การฝึกงาน (Internship)";

          const visitorId = sessionStorage.getItem('visitorId');
          if (visitorId) {
            fetch('/api/visitors', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: visitorId, sectionViewed: sectionName })
            }).catch(e => console.log(e));
          }
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    setTimeout(() => {
      document.querySelectorAll('section[id^="section-"]').forEach(section => {
        observer.observe(section);
      });
    }, 1000); // Give DOM time to render

    return () => observer.disconnect();
  }, []);


  return (
    <div className="bg-[#f4fbf9] min-h-screen text-slate-800 font-sans selection:bg-teal-500/30">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 space-y-12">
        
        {/* HERO SECTION */}
        <section id="section-hero" className="bg-white rounded-2xl p-8 md:p-12 border border-teal-900/10 shadow-card-soft relative overflow-hidden">
          {/* Decorative Teal/Cyan soft blur glow */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-teal-100/70 rounded-full blur-3xl pointer-events-none opacity-60"></div>
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-cyan-100/50 rounded-full blur-2xl pointer-events-none opacity-40"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Headings and Intro */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>{language === 'th' ? "Front-end Developer Portfolio" : "Front-end Developer Portfolio"}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-semibold text-slate-800 flex items-center gap-2">
                  <span>{language === 'th' ? "สวัสดีครับ" : "Hello"}</span>
                  <span className="text-2xl">👋</span>
                </h2>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                  {language === 'th' ? "ผมชื่อ" : "I'm"} <span className="text-teal-600">{language === 'th' ? profile.name : profile.nameEn}</span>
                </h1>
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal bg-[#f7fcfb] p-5 rounded-2xl border border-teal-100/70">
                {language === 'th' ? profile.bio : profile.bioEn}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-teal-glow transition duration-200" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                  <span>LinkedIn Profile</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-50/70 text-teal-800 border border-teal-200/70 rounded-xl text-sm font-medium hover:bg-teal-100/80 transition" href={`mailto:${profile.email}`}>
                  <span className="material-symbols-outlined text-[18px] text-teal-600">mail</span>
                  <span>ติดต่ออีเมล</span>
                </a>
              </div>
            </div>
            {/* Right: Profile Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded-3xl blur-md opacity-30 group-hover:opacity-45 transition duration-300"></div>
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-white border-4 border-white shadow-xl">
                  <Image alt="Profile" className="w-full h-full object-cover object-top hover:scale-105 transition duration-500" src="/20241009_083423_368.JPG" fill />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two-column Section: About Me & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* เกี่ยวกับฉัน */}
          <section id="section-about" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-teal-50">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/80">
                  <span className="material-symbols-outlined text-[22px]">person</span>
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900">{language === 'th' ? "เกี่ยวกับฉัน" : "About Me"}</h2>
                  <p className="text-xs text-slate-400 font-mono">Personal Information</p>
                </div>
              </div>
              <div className="divide-y divide-teal-50/70 mt-4">
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-medium text-slate-400">{language === 'th' ? "ชื่อ" : "Name"}</span>
                  <span className="text-base font-semibold text-slate-800">{language === 'th' ? profile.name : profile.nameEn}</span>
                </div>
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-medium text-slate-400">{language === 'th' ? "คณะ" : "Faculty"}</span>
                  <span className="text-base font-medium text-slate-800 text-right">{language === 'th' ? profile.faculty : profile.facultyEn}</span>
                </div>
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-medium text-slate-400">{language === 'th' ? "เบอร์โทร" : "Phone"}</span>
                  <a className="text-base font-mono font-medium text-teal-600 hover:text-teal-700 hover:underline" href={`tel:${profile.phone}`}>{profile.phone}</a>
                </div>
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-medium text-slate-400">{language === 'th' ? "อีเมล" : "Email"}</span>
                  <a className="text-sm md:text-base font-medium text-teal-600 hover:text-teal-700 hover:underline truncate" href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-medium text-slate-400">LinkedIn</span>
                  <a className="inline-flex items-center gap-1.5 text-base font-medium text-teal-600 hover:text-teal-700" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                    <span>Tanakorn Tipwarreerattana</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* การศึกษา */}
          <section id="section-education" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-teal-50">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100/80">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900">{language === 'th' ? "การศึกษา" : "Education"}</h2>
                  <p className="text-xs text-slate-400 font-mono">Education History</p>
                </div>
              </div>
              <div className="mt-8 relative pl-6 border-l-2 border-teal-200/80 space-y-8">
                {educations.map((edu, idx) => (
                  <div key={edu.id} className="relative">
                    <span className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm ${idx === 0 ? 'bg-teal-600' : 'bg-slate-300'}`}></span>
                    <div className="bg-[#f7fcfb] p-4 rounded-xl border border-teal-100/70">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium mb-1.5 ${idx === 0 ? 'bg-teal-100/80 text-teal-800' : 'bg-slate-100 text-slate-700'}`}>
                        {language === 'th' ? edu.yearsTh : edu.yearsEn}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {language === 'th' ? edu.schoolTh : edu.schoolEn}
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        {language === 'th' ? edu.degreeTh : edu.degreeEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <SkillsSection />

        {/* Two-column: โปรเจกต์ของฉัน & การฝึกงาน */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* โปรเจกต์ของฉัน */}
          <section id="section-projects" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">
            <div className="flex items-center gap-3 pb-6 border-b border-teal-50 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/80">
                <span className="material-symbols-outlined text-[22px]">folder_special</span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">{language === 'th' ? "โปรเจกต์ของฉัน" : "My Projects"}</h2>
                <p className="text-xs text-slate-400 font-mono">My Projects</p>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              {projects.map((project) => {
                const type = project.tags?.[0] || 'website';
                let defaultLink = project.projectUrl || project.githubUrl || '#';
                let defaultButtonText = type === 'github' ? "View on GitHub" : (language === 'th' ? "เยี่ยมชมเว็บไซต์" : "Visit Website");
                
                return (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    imageSrc={project.imageUrl || project.image}
                    images={project.images}
                    description={project.description}
                    link={defaultLink}
                    buttonText={defaultButtonText}
                    type={type}
                    status={project.tags?.[1] || 'success'}
                  />
                );
              })}
            </div>
          </section>

          {/* การฝึกงาน */}
          <section id="section-internship" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">
            <div className="flex items-center gap-3 pb-6 border-b border-teal-50 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/80">
                <span className="material-symbols-outlined text-[22px]">work_outline</span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">{language === 'th' ? "การฝึกงาน" : "Internship"}</h2>
                <p className="text-xs text-slate-400 font-mono">Internship & Cooperative Education</p>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              {/* Ready for internship banner */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-teal-50/70 to-cyan-50/50 border border-teal-100">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/90 text-teal-800 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                    <span>{language === 'th' ? "พร้อมสำหรับการฝึกงาน / สหกิจศึกษา" : "Available for Internship"}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === 'th' ? "สนใจร่วมฝึกงานในตำแหน่ง Front-end Developer" : "Looking for Front-end Developer Internship"}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'th' ? "พร้อมนำทักษะการออกแบบและพัฒนาส่วนต่อประสาน (UI) ด้วย modern web framework มาประยุกต์ใช้ในการทำงานจริง พร้อมเรียนรู้และเติบโตไปร่วมกับทีมพัฒนาซอฟต์แวร์" : "Ready to apply UI design and modern web framework skills in a real-world environment, and eager to learn and grow with the software development team."}
                  </p>
                </div>
                <div className="pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-teal-100/80 mt-4">
                  <span className="text-xs font-medium text-slate-500">{language === 'th' ? "ติดต่อได้ทางอีเมลและโทรศัพท์" : "Contact via email or phone"}</span>
                  <a className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition shadow-sm" href={`mailto:${profile.email}`}>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>{language === 'th' ? "ส่งข้อความติดต่อ" : "Send Message"}</span>
                  </a>
                </div>
              </div>

              {internships.map((internship) => (
                <InternshipSection 
                  key={internship.id}
                  id={internship.id}
                  role={internship.role}
                  company={internship.company}
                  duration={`${internship.startDate} - ${internship.endDate}`}
                  responsibilities={internship.description?.split('\n') || []}
                  techStack={[]}
                  logoSrc={internship.imageUrl}
                />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

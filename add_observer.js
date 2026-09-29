const fs = require('fs');

const path = 'app/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure we have useEffect imported
if (!content.includes('import { useEffect')) {
  content = content.replace('import { useLanguage }', 'import { useEffect } from "react";\nimport { useLanguage }');
}

// Add IDs to sections
content = content.replace('<section className="bg-white rounded-2xl p-8 md:p-12', '<section id="section-hero" className="bg-white rounded-2xl p-8 md:p-12');
content = content.replace('<section className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">', '<section id="section-about" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">');
content = content.replace('<section className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">', '<section id="section-education" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col justify-between">');
content = content.replace('<section className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">', '<section id="section-projects" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">');
content = content.replace('<section className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">', '<section id="section-internship" className="bg-white rounded-2xl p-8 border border-teal-900/10 shadow-card-soft flex flex-col">');

const observerHook = `
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
`;

// Insert the hook inside the Home component
content = content.replace('const internships = internshipsData || [];', 'const internships = internshipsData || [];\n' + observerHook);

fs.writeFileSync(path, content);
console.log("Added observer to page.jsx");

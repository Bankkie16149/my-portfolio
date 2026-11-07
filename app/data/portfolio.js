export const profileData = {
  name: "นายธนกร ทิพย์วารีรัตนะ",
  nameEn: "Tanakorn Tipwarreerattana",
  bio: "โดยผมมีความสนใจทางด้านการพัฒนาด้านเว็บแอพพลิเคชั่นทางด้าน Front-end เพราะผมมีทักษะทางด้านการดีไซน์และการใช้ framework ทางด้าน front-end เป็นหลักและพร้อมเรียนรู้ framework ใหม่ๆในอนาคตครับ",
  bioEn: "I am interested in Front-end web application development because I have skills in design and using Front-end frameworks, and I am ready to learn new frameworks in the future.",
  faculty: "เทคโนโลยีสารสนเทศและการสื่อสาร",
  facultyEn: "Faculty of ICT",
  phone: "083-251-1456",
  email: "tanakorn.tip@student.mahidol.edu",
  linkedin: "https://www.linkedin.com/in/tanakorn-tipwarreerattana-1a6053364",
  github: "https://github.com/Bankkie16149"

};

export const educationData = [
  {
    id: 1,
    schoolTh: "มหาวิทยาลัยมหิดล",
    schoolEn: "Mahidol University",
    degreeTh: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร — สาขาวิทยาการและเทคโนโลยีดิจิทัล",
    degreeEn: "Faculty of ICT — D.S.T. (Digital Science and Technology)",
    yearsTh: "2567 – ปัจจุบัน",
    yearsEn: "2024 – Present",
    color: "indigo"
  },
  {
    id: 2,
    schoolTh: "โรงเรียนเทพศิรินทร์ นนทบุรี",
    schoolEn: "Debsirin Nonthaburi School",
    degreeTh: "แผนการเรียน ภาษาอังกฤษ – คณิตศาสตร์",
    degreeEn: "English - Mathematics Program",
    yearsTh: "2560 – 2566",
    yearsEn: "2017 – 2023",
    color: "purple"
  }
];

export const projectsData = [
  {
    id: "project-1",
    title: "LINE GIRL",
    descriptionTh: "โปรเจกต์นี้จะเกี่ยวข้องกับงานภายในคลาสเรียนของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man แต่เป็นการสั่งอาหารและรับที่สาขาเท่านั้น ซึ่งผมรับผิดชอบในส่วน front-end โดยการออกแบบให้สอดคล้องกับ UX/UI ของเว็บไซต์ในต้นแบบ และเชื่อมต่อกับ back-end เพื่อให้เว็บไซต์สามารถใช้งานได้จริง สิ่งที่พิเศษของโปรเจกต์นี้คือการจัดการระบบที่ง่ายและการจัดการผู้ใช้งานอย่างเป็นระบบ มีการแยกบทบาทในแอพที่ชัดเจน รวมถึงการใช้โมเดล Agile ในการทำงานของทีมพัฒนา ดูรายละเอียดเพิ่มเติมได้ที่ลิงก์ GitHub",
    descriptionEn: "This project is part of my coursework. It involves designing a web application modeled after the Line Man business, but specifically for ordering food and picking it up at the branch. I was responsible for the front-end, designing it in alignment with the prototype's UX/UI and integrating it with the back-end to make it functional. A key feature of this project is its easy system management and systematic user handling, with clearly separated roles. We also utilized the Agile model in our development team's workflow. See more details on GitHub.",
    imageUrl: "/ภาพถ่ายหน้าจอ 2568-11-09 เวลา 20.17.49.png",
    images: ["/ภาพถ่ายหน้าจอ 2568-11-09 เวลา 20.17.49.png","/figma-linegirl/Screenshot 2568-12-16 at 13.45.58.png","/figma-linegirl/Screenshot 2568-12-16 at 13.51.06.png","/figma-linegirl/Screenshot 2568-12-16 at 14.04.59.png","/figma-linegirl/Screenshot 2568-12-16 at 14.08.58.png","/figma-linegirl/Screenshot 2568-12-16 at 14.13.16.png","/figma-linegirl/Screenshot 2568-12-16 at 14.17.21.png"],
    projectUrl: "",
    githubUrl: "",
    links: [
      { url: "https://github.com/Bankkie16149/Line-Girl", labelTh: "ดูซอร์สโค้ดบน GitHub", labelEn: "View on GitHub", type: "github" }
    ],
    tags: ["github", "success"],
    courseTh: "การพัฒนาเว็บแอปพลิเคชัน",
    courseEn: "Web Application Development",
    order: 1
  },
  {
    id: "project-2",
    title: "Software engineering (Booking room)",
    descriptionTh: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การทำระบบการจัดการจองห้องประชุมและห้องเรียนภายในมหาวิทยาลัย เพื่อแก้ปัญหาการจองห้องที่ซับซ้อนและลดความผิดพลาดในการจัดการตารางเวลา โดยมีการใช้ Use Case Diagram และ Data Flow Diagram (DFD Level 0-2) เพื่อจำลองการไหลของข้อมูลและการทำงานของระบบ มีการจัดทำ Structure Chart เพื่อวางโครงสร้างโมดูลการทำงาน เช่น การจอง และยังมีการออกแบบระบบให้รองรับการทำงานผ่าน Web Application และมีการเชื่อมต่อฐานข้อมูล (เช่น Google Firebase)",
    descriptionEn: "This project is part of my coursework. It involves creating a management system for booking meeting rooms and classrooms within the university to solve complex booking issues and reduce scheduling errors. It utilizes Use Case Diagrams and Data Flow Diagrams (DFD Level 0-2) to simulate data flow and system operations. A Structure Chart was developed to outline module operations, such as reservations. The system was designed to support Web Application operations and connects to a database (e.g., Google Firebase).",
    imageUrl: "/Screenshot 2568-12-06 at 20.23.54.png",
    images: ["/Screenshot 2568-12-06 at 20.23.54.png","/figma/Screenshot 2568-12-06 at 19.47.15.png","/figma/Screenshot 2568-12-06 at 19.52.36.png","/figma/Screenshot 2568-12-06 at 20.01.50.png","/figma/Screenshot 2568-12-06 at 20.09.38.png","/figma/Screenshot 2568-12-06 at 20.14.26.png","/figma/Screenshot 2568-12-06 at 20.21.40.png"],
    projectUrl: "https://www.figma.com/design/6BnLg0uEN9Jymy5dwv2y0K/library-systems?t=bcFUBj0hIgf7xvNF-0",
    githubUrl: "",
    links: [
      { url: "https://www.figma.com/design/6BnLg0uEN9Jymy5dwv2y0K/library-systems?t=bcFUBj0hIgf7xvNF-0", labelTh: "ดูดีไซน์บน Figma", labelEn: "View on Figma", type: "figma" }
    ],
    courseTh: "วิศวกรรมซอฟต์แวร์",
    courseEn: "Software Engineering",
    tags: ["figma", "success"],
    order: 2
  },
  {
    id: "project-3",
    title: "Mobile application 'PetPoint'",
    descriptionTh: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ พัฒนาแอปพลิเคชันมือถือด้วย Flutter และ Dart โดยเน้นการสร้างส่วนติดต่อผู้ใช้ (UI) ตามหลัก Material Design และพัฒนาฟีเจอร์ต่างๆ เช่น แบบทดสอบ (Quiz), ข้อมูลโปรไฟล์, การบริจาค และข้อมูลศูนย์พักพิง นอกจากนี้ยังได้ออกแบบโครงสร้างฐานข้อมูล (Database Schema), ทำ Normalization และวางโครงสร้างสถาปัตยกรรมระบบ รวมถึงพัฒนาและเชื่อมต่อ REST API เพื่อรองรับระบบยืนยันตัวตนและฟังก์ชันการทำงานต่างๆ ของแอปพลิเคชัน ทั้งยังใช้ GitHub ในการจัดการซอร์สโค้ด และใช้ Jira สำหรับการบริหารจัดการโครงการและการทำงานร่วมกันภายในทีม",
    descriptionEn: "This project is part of my coursework. It involves developing a mobile application using Flutter and Dart, focusing on creating a user interface (UI) based on Material Design principles. I developed various features such as quizzes, profile information, donation functionalities, and shelter information. Additionally, I designed the database schema, performed normalization, and structured the system architecture. I also developed and integrated REST APIs to support authentication and various app functionalities. GitHub was used for source code management, and Jira was utilized for project management and team collaboration.",
    imageUrl: "/figma-petpoint/Screenshot 2569-09-29 at 12.57.41.png",
    images: ["/figma-petpoint/Screenshot 2569-09-29 at 12.57.41.png","/figma-petpoint/All score.png","/figma-petpoint/Quiz.png","/figma-petpoint/Quiz Detail.png","/figma-petpoint/Take action Quiz.png","/figma-petpoint/Score after Quiz.png","/figma-petpoint/Foster.png","/figma-petpoint/Profile.png"],
    projectUrl: "https://github.com/PuthoPutho/PetPoint",
    githubUrl: "",
    links: [
      { url: "https://www.figma.com/design/k0dAeq8b5gQoGPCvkM7lS9/Untitled?t=2D7sK7CzG0iYDZLC-0", labelTh: "ดูดีไซน์บน Figma", labelEn: "View on Figma", type: "figma" },
      { url: "https://github.com/PuthoPutho/PetPoint", labelTh: "ดูซอร์สโค้ดบน GitHub", labelEn: "View on GitHub", type: "github" }
    ],
    tags: ["github", "success"],
    courseTh: "การพัฒนาแอปพลิเคชัน",
    courseEn: "Mobile Application Development",
    order: 5
  } ,
  {
    id: "project-4",
    title: "Aomaoi - Sugarcane Farm Accounting System",
    descriptionTh: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือระบบจัดการและบัญชีฟาร์มอ้อยครบวงจร พัฒนาขึ้นเพื่อรองรับสถาปัตยกรรมการจัดการข้อมูลฟาร์มยุคใหม่ ตัวระบบประกอบด้วยระบบบันทึกงาน ฟังก์ชันลงบัญชีรายรับ-รายจ่าย และโมดูลประเมินผลงาน (Performance Evaluation) โดยมีการควบคุมสิทธิ์การเข้าถึงข้อมูลแยกตาม 3 บทบาทหลัก (Super Admin, Admin, Worker) พร้อมโครงสร้างฐานข้อมูลที่ออกแบบมาเพื่อความถูกต้องแม่นยำทางบัญชีโดยเฉพาะ โดยมีการทำ Database Migration ด้วย Liquibase, การทำ Containerization ด้วย Multi-stage Docker, และการวางระบบ Automated E2E Testing ด้วย Cypress ที่มีระบบจัดการ Lifecycle ทำความสะอาดข้อมูลทดสอบในฐานข้อมูลอัตโนมัติ ทำให้ระบบมี Reliability สูงและสามารถส่งมอบงานได้อย่างต่อเนื่อง",
    descriptionEn: "This project is part of my coursework. An end-to-end sugarcane farm management and accounting system developed to support modern farm data management architecture. The system consists of a task logging system, income-expense accounting functions, and a performance evaluation module. It features role-based access control (RBAC) across three primary roles (Super Admin, Admin, and Worker), along with a database structure specifically designed for accounting precision. Backed by Liquibase for database migration, multi-stage Docker for containerization, and Cypress for automated E2E testing with an automated database lifecycle management system to clean up test data, the system ensures high reliability and enables continuous delivery.",
    imageUrl: "/figma-aomaoi/Dashboard 9.png",
    images: ["/figma-aomaoi/Dashboard 8.png","/figma-aomaoi/History.png","/figma-aomaoi/History-1.png","/figma-aomaoi/Frame 1.png","/figma-aomaoi/Frame 2.png","/figma-aomaoi/Frame 3.png","/figma-aomaoi/Frame 4.png","/figma-aomaoi/Frame 5.png","/figma-aomaoi/Frame 6.png"],
    projectUrl: "https://www.figma.com/design/k0dAeq8b5gQoGPCvkM7lS9/Untitled?t=2D7sK7CzG0iYDZLC-0",
    githubUrl: "",
    links: [
      { url: "https://www.figma.com/design/kDj28o0xpoZvBY1sENi6J7/aoiaoi?node-id=312-2&t=te3cOzu79iALOnps-1", labelTh: "ดูดีไซน์บน Figma", labelEn: "View on Figma", type: "figma" } ,
      { url: "https://github.com/MUDST-2026-aomaoi/aomaoi-frontend", labelTh: "ดูซอร์สโค้ดบน GitHub สำหรับ frontend", labelEn: "View on GitHub", type: "github" } ,
      { url: "https://github.com/MUDST-2026-aomaoi/aomaoi-backend", labelTh: "ดูซอร์สโค้ดบน GitHub สำหรับ backend", labelEn: "View on GitHub", type: "github" }
    ],
    tags: ["figma", "in-progress"],
    courseTh: "DevOps และการพัฒนาแอปพลิเคชันที่นำไปใช้ได้จริง",
    courseEn: "DevOps and Real-world Application Development",
    order: 6
  }
];

export const internshipsData = [
  {
    id: "intern-1",
    companyTh: "บริษัท เอ็กซ์ซี จำกัด",
    companyEn: "EXZY Co., Ltd.",
    roleTh: "นักศึกษาฝึกงาน IT Support",
    roleEn: "IT Support Intern",
    startDateTh: "20 พฤษภาคม 2569",
    endDateTh: "31 กรกฎาคม 2569",
    startDateEn: "May 20, 2026",
    endDateEn: "July 31, 2026",
    descriptionTh: "สนับสนุนการติดตั้งและตั้งค่าระบบ Smart Office และ Smart Workplace เช่น ระบบ Attendance และ Co-Desk พร้อมทดสอบระบบก่อนนำไปใช้งานจริง\nร่วมปฏิบัติงาน On-site Support กับพี่เลี้ยง เพื่อช่วยติดตั้ง ตรวจสอบ และแก้ไขปัญหาเบื้องต้นของระบบและอุปกรณ์ ณ สถานที่ของลูกค้า\nเพัฒนาทักษะการแก้ไขปัญหาและการทำงานร่วมกับทีม ผ่านการเรียนรู้จากสถานการณ์จริงและการปฏิบัติงานทั้งภายในและนอกสถานที่",
    descriptionEn: "Support the installation and configuration of Smart Office and Smart Workplace systems—such as attendance and desk-sharing (Co-Desk) systems—and conduct pre-deployment testing.\nWork alongside a mentor to provide on-site support, assisting with installation, system checks, and basic troubleshooting of systems and equipment at client sites.\nDevelop problem-solving and teamwork skills through real-world scenarios and practical experience in both on-site and off-site environments.",
    imageUrl: "/internship/logo exzy.jpg",
  }
];

export const skillsData = [];

export const personalProjectData = {
  id: "fintrack",
  title: "FinTrack",
  taglineTh: "เว็บบันทึกรายรับ-รายจ่าย พร้อมระบบพยากรณ์และวิเคราะห์สุขภาพทางการเงิน",
  taglineEn: "Personal Finance & Expense Tracker with Predictive Analytics",
  badgeTh: "โปรเจกต์ส่วนตัว",
  badgeEn: "Personal Project",
  descriptionTh: "เว็บแอปพลิเคชันบริหารจัดการการเงินและบันทึกรายรับ-รายจ่ายส่วนบุคคล พัฒนาในรูปแบบ Full-stack Application โดยมีจุดเด่นคือ Dashboard สรุปภาพรวมการเงินแบบเรียลไทม์ พร้อมโมดูลพยากรณ์ทางการเงิน (Predictive Forecast) และ Smart Insights ที่ช่วยวิเคราะห์สัดส่วนรายรับ-รายจ่าย ประเมินประสิทธิภาพการออม (Financial Efficiency) และคำนวณงบประมาณค่าใช้จ่ายที่แนะนำต่อวัน นอกจากนี้ยังมีเครื่องคำนวณโครงการไทยช่วยไทย (Co-pay Calculator 60/40) ระบบสมาชิกพร้อมระบบอัปโหลดสลิปโอนเงิน (Canvas Image Processing) การแจ้งเตือนในแอปและอีเมล และรองรับการติดตั้งใช้งานบนมือถือในรูปแบบ Progressive Web App (PWA)",
  descriptionEn: "A full-stack personal finance and expense management web application designed to help users track cash flows and gain financial clarity. Features a real-time financial dashboard with predictive forecasting and smart insights to analyze income-to-expense ratios, evaluate savings efficiency, and calculate recommended daily spending limits. It also includes a Thai Chuy Thai co-pay calculator (60/40), user membership with slip verification via client-side canvas image compression, in-app and email notifications, and full Progressive Web App (PWA) support for mobile installation.",
  projectUrl: "https://expensetracker-tan-delta.vercel.app",
  hosting: {
    frontend: "Vercel",
    backend: "Render"
  },
  techStack: [
    "React",
    "Vite",
    "Node.js",
    "Express",
    "PWA",
    "Tailwind CSS",
    "JWT Auth",
    "REST API"
  ],
  features: [
    {
      icon: "dashboard",
      titleTh: "Dashboard สรุปภาพรวมการเงิน",
      titleEn: "Financial Overview Dashboard",
      descTh: "แสดงยอดเงินคงเหลือสุทธิ (Total Balance), รายรับ-รายจ่ายประจำเดือน และกราฟวิเคราะห์สัดส่วนค่าใช้จ่ายตามหมวดหมู่",
      descEn: "Real-time net balance, monthly income vs expenses, and category-based spending breakdown charts."
    },
    {
      icon: "trending_up",
      titleTh: "ระบบพยากรณ์ & Smart Insights",
      titleEn: "Predictive Forecast & Insights",
      descTh: "คำนวณคาดการณ์เงินออมสุทธิล่วงหน้า ประเมินดัชนีประสิทธิภาพทางการเงิน (Efficiency %) และคำนวณงบใช้จ่ายรายวัน",
      descEn: "Forecasts expected savings, evaluates financial efficiency index, and provides daily spending limits."
    },
    {
      icon: "receipt_long",
      titleTh: "บันทึกและจัดการรายการ",
      titleEn: "Transaction & Wallet Management",
      descTh: "บันทึกรายรับ-รายจ่าย ระบุแหล่งเงิน (KBank, SCB, เงินสด) หมวดหมู่ วันที่ และระบบค้นหาประวัติย้อนหลัง",
      descEn: "Log transactions with custom categories, payment sources (banks/cash), and historical search filtering."
    },
    {
      icon: "calculate",
      titleTh: "เครื่องคำนวณไทยช่วยไทย",
      titleEn: "Co-pay Calculator (60/40)",
      descTh: "เครื่องมือคำนวณสัดส่วนค่าใช้จ่ายตามสิทธิ์นโยบายร่วมจ่าย 60/40 (รัฐช่วยออกสูงสุด 200 บ./วัน) ช่วยวางแผนงบประมาณ",
      descEn: "Calculates 60/40 co-pay discounts up to 200 THB/day to assist with daily budget planning."
    },
    {
      icon: "verified_user",
      titleTh: "ระบบสมาชิก & อัปโหลดสลิป",
      titleEn: "Membership & Slip Processing",
      descTh: "ระบบยืนยันตัวตนด้วย JWT พร้อมฟังก์ชันอัปโหลดและประมวลผลลดขนาดภาพสลิปบน Client-side ด้วย HTML5 Canvas",
      descEn: "JWT authentication with client-side HTML5 canvas image compression for slip verification."
    },
    {
      icon: "install_mobile",
      titleTh: "รองรับ PWA & การแจ้งเตือน",
      titleEn: "PWA & Notifications",
      descTh: "ติดตั้งลงบนหน้าจอมือถือได้เสมือนแอป Native พร้อมศูนย์แจ้งเตือนภายในแอปและระบบส่งอีเมลสรุปยอด",
      descEn: "Installable on mobile devices via PWA with an in-app notification center and email alerts."
    }
  ]
};

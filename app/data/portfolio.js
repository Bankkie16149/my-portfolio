export const profileData = {
  name: "นายธนกร ทิพย์วารีรัตนะ",
  nameEn: "Tanakorn Tipwarreerattana",
  bio: "โดยผมมีความสนใจทางด้านการพัฒนาด้านเว็บแอพพลิเคชั่นทางด้าน Front-end เพราะผมมีทักษะทางด้านการดีไซน์และการใช้ framework ทางด้าน front-end เป็นหลักและพร้อมเรียนรู้ framework ใหม่ๆในอนาคตครับ",
  bioEn: "I am interested in Front-end web application development because I have skills in design and using Front-end frameworks, and I am ready to learn new frameworks in the future.",
  faculty: "เทคโนโลยีสารสนเทศและการสื่อสาร",
  facultyEn: "Faculty of ICT",
  phone: "083-251-1456",
  email: "tanakorn.tip@student.mahidol.edu",
  linkedin: "https://www.linkedin.com/in/tanakorn-tipwarreerattana-1a6053364"
};

export const educationData = [
  {
    id: 1,
    schoolTh: "โรงเรียนเทพศิรินทร์ นนทบุรี",
    schoolEn: "Debsirin Nonthaburi School",
    degreeTh: "แผนการเรียน ภาษาอังกฤษ – คณิตศาสตร์",
    degreeEn: "English - Mathematics Program",
    yearsTh: "2560 – 2566",
    yearsEn: "2017 – 2023",
    color: "purple"
  },
  {
    id: 2,
    schoolTh: "มหาวิทยาลัยมหิดล",
    schoolEn: "Mahidol University",
    degreeTh: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร — สาขาวิทยาการและเทคโนโลยีดิจิทัล",
    degreeEn: "Faculty of ICT — D.S.T. (Digital Science and Technology)",
    yearsTh: "2567 – ปัจจุบัน",
    yearsEn: "2024 – Present",
    color: "indigo"
  }
];

export const projectsData = [
  {
    id: "project-1",
    title: "LINE GIRL",
    description: "โปรเจกต์นี้จะเกี่ยวข้องกับงานภายในคลาสเรียนของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man แต่เป็นการสั่งอาหารและรับที่สาขาเท่านั้น ซึ่งผมรับผิดชอบในส่วน front-end โดยการออกแบบให้สอดคล้องกับ UX/UI ของเว็บไซต์ในต้นแบบ และเชื่อมต่อกับ back-end เพื่อให้เว็บไซต์สามารถใช้งานได้จริง สิ่งที่พิเศษของโปรเจกต์นี้คือการจัดการระบบที่ง่ายและการจัดการผู้ใช้งานอย่างเป็นระบบ มีการแยกบทบาทในแอพที่ชัดเจน รวมถึงการใช้โมเดล Agile ในการทำงานของทีมพัฒนา ดูรายละเอียดเพิ่มเติมได้ที่ลิงก์ GitHub",
    imageUrl: "/ภาพถ่ายหน้าจอ 2568-11-09 เวลา 20.17.49.png",
    images: ["/ภาพถ่ายหน้าจอ 2568-11-09 เวลา 20.17.49.png","/figma-linegirl/Screenshot 2568-12-16 at 13.45.58.png","/figma-linegirl/Screenshot 2568-12-16 at 13.51.06.png","/figma-linegirl/Screenshot 2568-12-16 at 14.04.59.png","/figma-linegirl/Screenshot 2568-12-16 at 14.08.58.png","/figma-linegirl/Screenshot 2568-12-16 at 14.13.16.png","/figma-linegirl/Screenshot 2568-12-16 at 14.17.21.png"],
    projectUrl: "",
    githubUrl: "https://github.com/Tanakorn12345/testweb",
    tags: ["github", "success"],
    order: 1
  },
  {
    id: "project-2",
    title: "Software engineering (Booking room)",
    description: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การทำระบบการจัดการจองห้องประชุมและห้องเรียนภายในมหาวิทยาลัย เพื่อแก้ปัญหาการจองห้องที่ซับซ้อนและลดความผิดพลาดในการจัดการตารางเวลา โดยมีการใช้ Use Case Diagram และ Data Flow Diagram (DFD Level 0-2) เพื่อจำลองการไหลของข้อมูลและการทำงานของระบบ มีการจัดทำ Structure Chart เพื่อวางโครงสร้างโมดูลการทำงาน เช่น การจอง และยังมีการออกแบบระบบให้รองรับการทำงานผ่าน Web Application และมีการเชื่อมต่อฐานข้อมูล (เช่น Google Firebase)",
    imageUrl: "/Screenshot 2568-12-06 at 20.23.54.png",
    images: ["/Screenshot 2568-12-06 at 20.23.54.png"],
    projectUrl: "https://www.figma.com/design/6BnLg0uEN9Jymy5dwv2y0K/library-systems?t=bcFUBj0hIgf7xvNF-0",
    githubUrl: "",
    tags: ["figma", "success"],
    order: 2
  },
  {
    id: "project-3",
    title: "Mobile application 'PetPoint'",
    description: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man โดยในส่วนนี้คือการออกแบบ UX/UI ของเว็บก่อนนำไป implement ดีไซน์ที่ดูสบายตา ใช้งานง่าย ไม่ซับซ้อน พร้อมระบบจัดการหลังบ้านที่ชัดเจน เพื่อให้มั่นใจในประสิทธิภาพของ Flow การทำงานก่อนเริ่มเขียนโค้ดจริง",
    imageUrl: "/figma-petpoint/Screenshot 2569-09-29 at 12.57.41.png",
    images: ["/figma-petpoint/Screenshot 2569-09-29 at 12.57.41.png"],
    projectUrl: "https://github.com/PuthoPutho/PetPoint",
    githubUrl: "",
    tags: ["github", "success"],
    order: 5
  }
];

export const internshipsData = [
  {
    id: "intern-1",
    company: "บริษัท เอ็กซ์ซี จำกัด",
    role: "IT Support Intern",
    startDate: "20 พฤษภาคม 2569",
    endDate: "31 กรกฎาคม 2569",
    description: "พัฒนาระบบและแอปพลิเคชันภายในของกระทรวงฯ เพื่อเพิ่มประสิทธิภาพในการดำเนินงาน\nทำงานร่วมกับทีมผู้เชี่ยวชาญด้าน IT ในการจัดการระบบฐานข้อมูลและการรักษาความปลอดภัยของข้อมูล (Cybersecurity)\nเรียนรู้และประยุกต์ใช้เทคโนโลยีสมัยใหม่ในการแก้ปัญหาจริงระดับองค์กร",
    imageUrl: "/internship/logo exzy.jpg",
  }
];

export const skillsData = [];

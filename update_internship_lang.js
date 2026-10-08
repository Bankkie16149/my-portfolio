const fs = require('fs');

const path = 'app/data/portfolio.js';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `export const internshipsData = [
  {
    id: "intern-1",
    company: "บริษัท เอ็กซ์ซี จำกัด",
    role: "IT Support Intern",
    startDate: "20 พฤษภาคม 2569",
    endDate: "31 กรกฎาคม 2569",
    description: "พัฒนาระบบและแอปพลิเคชันภายในของกระทรวงฯ เพื่อเพิ่มประสิทธิภาพในการดำเนินงาน\\nทำงานร่วมกับทีมผู้เชี่ยวชาญด้าน IT ในการจัดการระบบฐานข้อมูลและการรักษาความปลอดภัยของข้อมูล (Cybersecurity)\\nเรียนรู้และประยุกต์ใช้เทคโนโลยีสมัยใหม่ในการแก้ปัญหาจริงระดับองค์กร",
    imageUrl: "/internship/logo exzy.jpg",
  }
];`;

const replaceStr = `export const internshipsData = [
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
    descriptionTh: "พัฒนาระบบและแอปพลิเคชันภายในของกระทรวงฯ เพื่อเพิ่มประสิทธิภาพในการดำเนินงาน\\nทำงานร่วมกับทีมผู้เชี่ยวชาญด้าน IT ในการจัดการระบบฐานข้อมูลและการรักษาความปลอดภัยของข้อมูล (Cybersecurity)\\nเรียนรู้และประยุกต์ใช้เทคโนโลยีสมัยใหม่ในการแก้ปัญหาจริงระดับองค์กร",
    descriptionEn: "Developed internal systems and applications for the ministry to improve operational efficiency.\\nCollaborated with IT experts in database management and cybersecurity.\\nLearned and applied modern technologies to solve real-world enterprise problems.",
    imageUrl: "/internship/logo exzy.jpg",
  }
];`;

if (content.includes('บริษัท เอ็กซ์ซี จำกัด')) {
    // If the exact string match fails due to formatting, I'll use regex or replace parts
    content = content.replace(/export const internshipsData = \[\s*\{\s*id: "intern-1",\s*company: "บริษัท เอ็กซ์ซี จำกัด",[\s\S]*?\}\s*\];/, replaceStr);
    fs.writeFileSync(path, content);
    console.log("Updated internshipsData");
} else {
    console.log("Could not find internshipsData");
}

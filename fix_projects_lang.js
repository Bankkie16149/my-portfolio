const fs = require('fs');
const path = 'app/data/portfolio.js';
let content = fs.readFileSync(path, 'utf8');

// Replace project 1
content = content.replace(
  'description: "โปรเจกต์นี้จะเกี่ยวข้องกับงานภายในคลาสเรียนของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man แต่เป็นการสั่งอาหารและรับที่สาขาเท่านั้น ซึ่งผมรับผิดชอบในส่วน front-end โดยการออกแบบให้สอดคล้องกับ UX/UI ของเว็บไซต์ในต้นแบบ และเชื่อมต่อกับ back-end เพื่อให้เว็บไซต์สามารถใช้งานได้จริง สิ่งที่พิเศษของโปรเจกต์นี้คือการจัดการระบบที่ง่ายและการจัดการผู้ใช้งานอย่างเป็นระบบ มีการแยกบทบาทในแอพที่ชัดเจน รวมถึงการใช้โมเดล Agile ในการทำงานของทีมพัฒนา ดูรายละเอียดเพิ่มเติมได้ที่ลิงก์ GitHub",',
  `descriptionTh: "โปรเจกต์นี้จะเกี่ยวข้องกับงานภายในคลาสเรียนของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man แต่เป็นการสั่งอาหารและรับที่สาขาเท่านั้น ซึ่งผมรับผิดชอบในส่วน front-end โดยการออกแบบให้สอดคล้องกับ UX/UI ของเว็บไซต์ในต้นแบบ และเชื่อมต่อกับ back-end เพื่อให้เว็บไซต์สามารถใช้งานได้จริง สิ่งที่พิเศษของโปรเจกต์นี้คือการจัดการระบบที่ง่ายและการจัดการผู้ใช้งานอย่างเป็นระบบ มีการแยกบทบาทในแอพที่ชัดเจน รวมถึงการใช้โมเดล Agile ในการทำงานของทีมพัฒนา ดูรายละเอียดเพิ่มเติมได้ที่ลิงก์ GitHub",
    descriptionEn: "This project is part of my coursework. It involves designing a web application modeled after the Line Man business, but specifically for ordering food and picking it up at the branch. I was responsible for the front-end, designing it in alignment with the prototype's UX/UI and integrating it with the back-end to make it functional. A key feature of this project is its easy system management and systematic user handling, with clearly separated roles. We also utilized the Agile model in our development team's workflow. See more details on GitHub.",`
);

// Replace project 2
content = content.replace(
  'description: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การทำระบบการจัดการจองห้องประชุมและห้องเรียนภายในมหาวิทยาลัย เพื่อแก้ปัญหาการจองห้องที่ซับซ้อนและลดความผิดพลาดในการจัดการตารางเวลา โดยมีการใช้ Use Case Diagram และ Data Flow Diagram (DFD Level 0-2) เพื่อจำลองการไหลของข้อมูลและการทำงานของระบบ มีการจัดทำ Structure Chart เพื่อวางโครงสร้างโมดูลการทำงาน เช่น การจอง และยังมีการออกแบบระบบให้รองรับการทำงานผ่าน Web Application และมีการเชื่อมต่อฐานข้อมูล (เช่น Google Firebase)",',
  `descriptionTh: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การทำระบบการจัดการจองห้องประชุมและห้องเรียนภายในมหาวิทยาลัย เพื่อแก้ปัญหาการจองห้องที่ซับซ้อนและลดความผิดพลาดในการจัดการตารางเวลา โดยมีการใช้ Use Case Diagram และ Data Flow Diagram (DFD Level 0-2) เพื่อจำลองการไหลของข้อมูลและการทำงานของระบบ มีการจัดทำ Structure Chart เพื่อวางโครงสร้างโมดูลการทำงาน เช่น การจอง และยังมีการออกแบบระบบให้รองรับการทำงานผ่าน Web Application และมีการเชื่อมต่อฐานข้อมูล (เช่น Google Firebase)",
    descriptionEn: "This project is part of my coursework. It involves creating a management system for booking meeting rooms and classrooms within the university to solve complex booking issues and reduce scheduling errors. It utilizes Use Case Diagrams and Data Flow Diagrams (DFD Level 0-2) to simulate data flow and system operations. A Structure Chart was developed to outline module operations, such as reservations. The system was designed to support Web Application operations and connects to a database (e.g., Google Firebase).",`
);

// Replace project 3
content = content.replace(
  'description: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man โดยในส่วนนี้คือการออกแบบ UX/UI ของเว็บก่อนนำไป implement ดีไซน์ที่ดูสบายตา ใช้งานง่าย ไม่ซับซ้อน พร้อมระบบจัดการหลังบ้านที่ชัดเจน เพื่อให้มั่นใจในประสิทธิภาพของ Flow การทำงานก่อนเริ่มเขียนโค้ดจริง",',
  `descriptionTh: "โปรเจ็กต์นี้เกี่ยวกับงานภายในคลาสของผมครับ คือ การออกแบบเว็บแอปพลิเคชัน ซึ่งมีต้นแบบเป็นธุรกิจ Line Man โดยในส่วนนี้คือการออกแบบ UX/UI ของเว็บก่อนนำไป implement ดีไซน์ที่ดูสบายตา ใช้งานง่าย ไม่ซับซ้อน พร้อมระบบจัดการหลังบ้านที่ชัดเจน เพื่อให้มั่นใจในประสิทธิภาพของ Flow การทำงานก่อนเริ่มเขียนโค้ดจริง",
    descriptionEn: "This project is part of my coursework. It involves designing a web application modeled after the Line Man business. This specific part focuses on the UX/UI design of the web app before implementation, featuring a clean, easy-to-use, and uncomplicated design, along with a clear back-office management system to ensure efficient workflow before actual coding begins.",`
);

fs.writeFileSync(path, content);
console.log("Updated projects in portfolio.js");

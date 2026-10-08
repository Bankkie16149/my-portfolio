const fs = require('fs');

const path = 'app/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// The projects and internship are wrapped in:
// {/* Two-column: โปรเจกต์ของฉัน & การฝึกงาน */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// I want to remove the grid wrapper around them so they stack vertically.
// I will just replace the grid opening and closing tags.

const target = `<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* โปรเจกต์ของฉัน */}`;
          
const replacement = `<div className="space-y-12">
          
          {/* โปรเจกต์ของฉัน */}`;
          
content = content.replace(target, replacement);

// Wait, if I just stack them, Projects might look too wide if they are single cards.
// If Projects is full width, we should make the project cards form a grid!
// Currently project cards are in `<div className="flex-1 flex flex-col gap-6">`
// Let's change the project cards container to a grid if it's full width:
// `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">`

const projectsContainerTarget = `<div className="flex-1 flex flex-col gap-6">
              {projects.map((project) => {`;
const projectsContainerReplacement = `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => {`;

content = content.replace(projectsContainerTarget, projectsContainerReplacement);

// For Internship, it's also `<div className="flex-1 flex flex-col gap-6">`.
// Actually, Internship cards can stay stacked in a column if they are wide, or we can use a grid too.
// Let's leave Internship as a stack, but constrain max-width or let it be wide.
// Let's see what happens if I run this.

fs.writeFileSync(path, content);
console.log("Fixed layout.");

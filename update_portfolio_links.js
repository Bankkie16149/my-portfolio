const fs = require('fs');

const path = 'app/data/portfolio.js';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `    githubUrl: "",
    tags: ["figma", "success"],`;

const replaceStr = `    githubUrl: "",
    links: [
      { url: "https://www.figma.com/design/6BnLg0uEN9Jymy5dwv2y0K/library-systems?t=bcFUBj0hIgf7xvNF-0", labelTh: "ดูดีไซน์บน Figma", labelEn: "View on Figma", type: "figma" },
      { url: "https://github.com/Tanakorn12345/testweb", labelTh: "ดูโค้ดบน GitHub", labelEn: "View on GitHub", type: "github" }
    ],
    tags: ["figma", "success"],`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync(path, content);
console.log("Added multiple links to Booking Room project");

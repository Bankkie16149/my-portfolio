const fs = require('fs');

const path = 'app/page.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                <InternshipSection 
                  key={internship.id}
                  id={internship.id}
                  role={internship.role}
                  company={internship.company}
                  duration={\`\${internship.startDate} - \${internship.endDate}\`}
                  responsibilities={internship.description?.split('\\n') || []}
                  techStack={[]}
                  logoSrc={internship.imageUrl}
                />`;

const replaceStr = `                <InternshipSection 
                  key={internship.id}
                  id={internship.id}
                  role={language === 'th' ? (internship.roleTh || internship.role) : (internship.roleEn || internship.role)}
                  company={language === 'th' ? (internship.companyTh || internship.company) : (internship.companyEn || internship.company)}
                  duration={language === 'th' ? \`\${internship.startDateTh || internship.startDate} - \${internship.endDateTh || internship.endDate}\` : \`\${internship.startDateEn || internship.startDate} - \${internship.endDateEn || internship.endDate}\`}
                  responsibilities={language === 'th' ? (internship.descriptionTh || internship.description)?.split('\\n') || [] : (internship.descriptionEn || internship.description)?.split('\\n') || []}
                  techStack={[]}
                  logoSrc={internship.imageUrl}
                />`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync(path, content);
console.log("Fixed page.jsx internship language");

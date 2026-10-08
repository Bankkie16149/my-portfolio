const fs = require('fs');

const path = 'app/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// Wrap the mapping of internships in a div to ensure the timeline container is solid
const searchStr = `{internships.map((internship) => (`;
const replaceStr = `<div className="mt-8 relative">\n                {internships.map((internship) => (`;

content = content.replace(searchStr, replaceStr);

// Close the div
const searchEndStr = `/>\n              ))}\n            </div>\n          </section>`;
const replaceEndStr = `/>\n              ))}\n              </div>\n            </div>\n          </section>`;

content = content.replace(searchEndStr, replaceEndStr);

fs.writeFileSync(path, content);
console.log("Timeline wrapper added to page.jsx");

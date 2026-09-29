const fs = require('fs');
const path = 'app/(admin)/admin/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// Fix timezone parsing
content = content.replace(
  'const date = new Date(log.visitedAt);',
  `let ds = log.visitedAt;
                  if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
                  const date = new Date(ds);`
);

// We also should fix todayVisits calculation
content = content.replace(
  'const logDate = new Date(log.visitedAt).toDateString();',
  `let ds = log.visitedAt;
    if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
    const logDate = new Date(ds).toDateString();`
);

// And Chart Data calculation
content = content.replace(
  'const count = logs.filter(log => new Date(log.visitedAt).toDateString() === date.toDateString()).length;',
  `const count = logs.filter(log => {
      let ds = log.visitedAt;
      if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
      return new Date(ds).toDateString() === date.toDateString();
    }).length;`
);

fs.writeFileSync(path, content);
console.log("Fixed dates.");

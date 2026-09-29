const fs = require('fs');
const path = 'app/(admin)/admin/page.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldCard = `{/* Card 4: Top Browser */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">เบราว์เซอร์ยอดนิยม</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-display font-bold text-slate-900 truncate">
              {chromePct >= safariPct && chromePct >= directPct ? 'Google Chrome' : 
               safariPct >= chromePct && safariPct >= directPct ? 'Apple Safari' : 'อื่นๆ (Others)'}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            คิดเป็น {Math.max(chromePct, safariPct, directPct)}% ของผู้ชมทั้งหมด
          </div>
        </div>`;

const newCard = `{/* Card 4: Most Viewed Section */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-teal-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">ส่วนที่คนสนใจมากที่สุด</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">star_outline</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-display font-bold text-slate-900 truncate">
              {mostViewedSection}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">อัปเดตอัตโนมัติตามการเลื่อนหน้าจอ</div>
        </div>`;

content = content.replace(oldCard, newCard);

// Add the mostViewedSection calculation
const mostViewedLogic = `
  const sectionCounts = logs.reduce((acc, log) => {
    const sec = log.sectionViewed || 'หน้าแรก (Home Overview)';
    acc[sec] = (acc[sec] || 0) + 1;
    return acc;
  }, {});
  let mostViewedSection = 'กำลังเก็บข้อมูล...';
  let maxSectionCount = 0;
  for (const [sec, count] of Object.entries(sectionCounts)) {
    if (count > maxSectionCount) {
      maxSectionCount = count;
      mostViewedSection = sec;
    }
  }
`;

content = content.replace('const directPct = Math.round((direct / originTotal) * 100);', 'const directPct = Math.round((direct / originTotal) * 100);\n' + mostViewedLogic);

// Ensure the table renders the correct sectionViewed value
content = content.replace(
  '<td className="py-3.5 px-6">\n                        <span className="font-medium text-slate-900">หน้าแรก (Home Overview)</span>\n                      </td>',
  '<td className="py-3.5 px-6">\n                        <span className="font-medium text-slate-900">{log.sectionViewed || "หน้าแรก (Home Overview)"}</span>\n                      </td>'
);

fs.writeFileSync(path, content);
console.log("Reverted card 4 and updated logic");

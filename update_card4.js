const fs = require('fs');
const path = 'app/(admin)/admin/page.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldCard = `{/* Card 4: Most Viewed Section */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-teal-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">ส่วนที่คนสนใจมากที่สุด</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">star_outline</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-display font-bold text-slate-900 truncate">Skills & Frameworks</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">ตามด้วยผลงาน และ การศึกษา</div>
        </div>`;

const newCard = `{/* Card 4: Top Browser */}
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

if (content.includes('ส่วนที่คนสนใจมากที่สุด')) {
  content = content.replace(oldCard, newCard);
  fs.writeFileSync(path, content);
  console.log("Updated card 4");
} else {
  console.log("Could not find card 4");
}

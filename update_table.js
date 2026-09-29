const fs = require('fs');

const path = 'app/(admin)/admin/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// We need to replace the Visitor Log Table section.
const tableStart = content.indexOf('{/* Visitor Log Table */}');
if (tableStart === -1) {
  console.log("Could not find table start");
  process.exit(1);
}

const newTableCode = `{/* Visitor Log Table */}
      <div className="bg-white rounded-2xl border border-teal-900/10 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-teal-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">บันทึกการเข้าชมล่าสุด (Recent Logs)</h2>
          <button onClick={fetchLogs} className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            รีเฟรชข้อมูล
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-teal-50/40 border-b border-slate-100 text-xs font-semibold text-slate-600">
                <th className="py-3 px-6">เวลา (Timestamp)</th>
                <th className="py-3 px-6">หมายเลข IP (IP Address)</th>
                <th className="py-3 px-6">หน้าที่เปิดดู (Section Viewed)</th>
                <th className="py-3 px-6">อุปกรณ์ & เบราว์เซอร์</th>
                <th className="py-3 px-6 text-right">ตำแหน่งคร่าว ๆ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">กำลังโหลดข้อมูล...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">ยังไม่มีข้อมูลผู้เข้าชม</td>
                </tr>
              ) : (
                logs.map((log) => {
                  const date = new Date(log.visitedAt);
                  const timeString = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
                  
                  // Calc time ago
                  const diff = Math.floor((new Date() - date) / 1000);
                  let timeAgo = '';
                  if (diff < 60) timeAgo = 'เมื่อสักครู่';
                  else if (diff < 3600) timeAgo = Math.floor(diff/60) + ' นาทีที่แล้ว';
                  else if (diff < 86400) timeAgo = Math.floor(diff/3600) + ' ชม. ที่แล้ว';
                  else timeAgo = Math.floor(diff/86400) + ' วันที่แล้ว';

                  const isMobile = log.device === 'Mobile' || log.os === 'Android' || log.os === 'iOS';
                  const deviceIcon = isMobile ? 'smartphone' : 'desktop_windows';

                  return (
                    <tr key={log.id} className="hover:bg-teal-50/20 transition-colors">
                      <td className="py-3.5 px-6 font-mono text-slate-600">
                        <span className="font-semibold text-teal-700">{timeAgo}</span>
                        <span className="block text-[10px] text-slate-400">{timeString}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium font-mono text-[11px] border border-slate-200/50">
                            {log.ipAddress || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="font-medium text-slate-900">หน้าแรก (Home Overview)</span>
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-slate-400">{deviceIcon}</span>
                          <span>{log.os || 'Unknown'} • {log.browser || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right font-medium text-slate-600">
                        {log.ipAddress === '::1' || log.ipAddress === '127.0.0.1' ? 'Local Network' : 'Unknown'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination Note */}
        <div className="px-6 py-4 bg-teal-50/30 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>ข้อมูลถูกจัดเก็บบนฐานข้อมูลแบบปลอดภัย (Anonymous Analytics)</span>
          <button className="font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors" type="button">
            <span>ดาวน์โหลดรายงานเป็น CSV</span>
            <span className="material-symbols-outlined text-[14px]">download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`;

const newContent = content.substring(0, tableStart) + newTableCode;
fs.writeFileSync(path, newContent);
console.log("Updated table successfully.");

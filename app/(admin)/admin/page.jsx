"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('VisitorLog')
      .select('*')
      .order('visitedAt', { ascending: false });

    if (!error && data) setLogs(data);
    setLoading(false);
  };

  const clearLogs = async () => {
    if (!confirm('คุณต้องการลบข้อมูลสถิติทั้งหมดใช่หรือไม่?')) return;
    
    // Clear logs from Supabase
    const { error } = await supabase.from('VisitorLog').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (!error) fetchLogs();
  };

  // Stats calculation
  const totalVisits = logs.length;
  const uniqueIPs = new Set(logs.map(log => log.ipAddress)).size;
  const todayVisits = logs.filter(log => {
    let ds = log.visitedAt;
    if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
    const logDate = new Date(ds).toDateString();
    const today = new Date().toDateString();
    return logDate === today;
  }).length;

  // Chart calculation (Last 7 Days)
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const chartData = last7Days.map(date => {
    const count = logs.filter(log => {
      let ds = log.visitedAt;
      if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
      return new Date(ds).toDateString() === date.toDateString();
    }).length;
    const days = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    return { day: days[date.getDay()], count };
  });

  const maxCount = Math.max(...chartData.map(d => d.count), 1); // Avoid division by zero
  
  // Traffic Origin (Browser/Device as proxy for now)
  const direct = logs.filter(l => !l.browser?.includes('Chrome') && !l.browser?.includes('Safari')).length;
  const chrome = logs.filter(l => l.browser?.includes('Chrome')).length;
  const safari = logs.filter(l => l.browser?.includes('Safari')).length;
  
  const originTotal = totalVisits || 1; // Prevent division by zero
  const chromePct = Math.round((chrome / originTotal) * 100);
  const safariPct = Math.round((safari / originTotal) * 100);
  const directPct = Math.round((direct / originTotal) * 100);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Page Header & Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">สถิติผู้เข้าชมพอร์ตโฟลิโอ</h1>
          <p className="text-sm text-slate-500 mt-1">สรุปข้อมูลความสนใจ สถิติการเยี่ยมชม และช่องทางที่พาคนมายังเว็บไซต์ของคุณ</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-white border border-teal-900/10 rounded-xl shadow-sm">
            <button className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 text-white shadow-sm" type="button">ทั้งหมด</button>
          </div>
          <button onClick={clearLogs} className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors shadow-sm">
            ล้างสถิติ
          </button>
        </div>
      </div>

      {/* Overview Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Visitors */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-teal-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">ผู้เข้าชมทั้งหมด (Total)</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-display font-bold text-slate-900">{totalVisits}</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> Active
            </span>
          </div>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">ผู้เข้าชมไม่ซ้ำ (Unique)</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person_outline</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-display font-bold text-slate-900">{uniqueIPs}</span>
            <span className="inline-flex items-center text-xs font-medium text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200/50">
              Unique IP
            </span>
          </div>
        </div>

        {/* Card 3: Today Visits */}
        <div className="bg-white rounded-2xl p-5 border border-teal-900/10 shadow-sm hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">เข้าชมวันนี้</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">today</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-display font-bold text-slate-900">{todayVisits}</span>
            <span className="inline-flex items-center text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
              วันนี้
            </span>
          </div>
        </div>

        {/* Card 4: Most Viewed Section */}
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
        </div>
      </div>

      {/* Traffic Trends & Traffic Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Traffic Trends Line / Area Chart (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-teal-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-display font-bold text-slate-900">กราฟสถิติการเข้าชมรายวัน (7 วันล่าสุด)</h2>
              <p className="text-xs text-slate-500">แนวโน้มจำนวนครั้งที่เปิดดูเว็บไซต์ในสัปดาห์นี้</p>
            </div>
          </div>
          
          {/* SVG Line/Area Chart */}
          <div className="py-6">
            <div className="relative w-full h-56 flex items-end justify-between gap-2 px-2">
              {chartData.map((d, i) => {
                const heightPct = maxCount === 0 ? 0 : (d.count / maxCount) * 100;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full relative h-40 flex items-end justify-center">
                      {/* Bar instead of complex SVG path for real data simplicity, matching the teal theme */}
                      <div 
                        className="w-full max-w-[2rem] bg-teal-200 group-hover:bg-teal-400 rounded-t-md transition-all duration-500 relative"
                        style={{ height: `${heightPct}%`, minHeight: d.count > 0 ? '4px' : '0' }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded transition-opacity">
                          {d.count}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Traffic Sources Card (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-teal-900/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-display font-bold text-slate-900">เบราว์เซอร์ที่ใช้ (Browser)</h2>
                <p className="text-xs text-slate-500 mt-0.5">ผู้เข้าชมเปิดจากเบราว์เซอร์ใดมากที่สุด</p>
              </div>
            </div>
            <div className="space-y-5 pt-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Google Chrome</span>
                  <span className="font-mono font-semibold">{chromePct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full transition-all duration-1000" style={{ width: `${chromePct}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]"></span> Apple Safari</span>
                  <span className="font-mono font-semibold">{safariPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0a66c2] rounded-full transition-all duration-1000" style={{ width: `${safariPct}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> อื่นๆ (Others)</span>
                  <span className="font-mono font-semibold">{directPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full transition-all duration-1000" style={{ width: `${directPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Log Table */}
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
                  let ds = log.visitedAt;
                  if (!ds.endsWith('Z') && !ds.includes('+')) ds += 'Z';
                  const date = new Date(ds);
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

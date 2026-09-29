'use client'

import Link from 'next/link'

export default function AdminClientLayout({ user, children }) {
  return (
    <div className="bg-[#f4fbf9] font-sans text-slate-800 antialiased min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-900/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left: Logo & Context */}
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2 group" href="/admin">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-display font-bold text-sm shadow-sm group-hover:bg-teal-700 transition-colors">
                TK
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-display font-bold text-slate-900 tracking-tight">MY PORTFOLIO</span>
                <span className="text-teal-200">/</span>
                <span className="font-medium text-slate-500">Admin Analytics</span>
              </div>
            </Link>
            
            {/* Live Active Counter Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span>กำลังดูหน้าเว็บ: <strong className="text-teal-900 font-bold">Live</strong> (Real-time)</span>
            </div>
          </div>
          
          {/* Right: Action Button & Profile */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-teal-900 bg-teal-50/80 hover:bg-teal-100 hover:text-teal-950 rounded-lg transition-colors border border-teal-200/60"
            >
              <span className="material-symbols-outlined text-[16px] text-teal-700">arrow_back</span>
              <span className="hidden sm:inline">กลับสู่หน้าหลัก</span>
            </Link>
            
            <div className="h-5 w-[1px] bg-teal-100 hidden sm:block"></div>
            
            {/* Admin Profile */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm ring-2 ring-teal-500/25 shadow-sm">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">{user?.email || 'Admin'}</div>
                <div className="text-[10px] text-teal-700 font-medium">Admin Owner</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}

'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fcfb] dark:bg-slate-900 font-sans p-6">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-100/40 dark:bg-cyan-900/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 p-8 md:p-10 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-teal-900/10 dark:border-teal-500/10 text-center max-w-sm w-full">
        
        <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center border border-teal-100/80 dark:border-teal-800/50 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-teal-600 dark:text-teal-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Admin Login</h1>
        <p className="text-slate-500 text-sm mb-8">ลงชื่อเข้าใช้เพื่อจัดการระบบหลังบ้าน</p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7fcfb] dark:bg-slate-700/50 border border-teal-100/70 dark:border-teal-800/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 dark:text-white outline-none transition-all placeholder:text-slate-400 text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7fcfb] dark:bg-slate-700/50 border border-teal-100/70 dark:border-teal-800/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 dark:text-white outline-none transition-all placeholder:text-slate-400 text-sm"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <a href="/" className="inline-block mt-8 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
          &larr; กลับหน้าเว็บไซต์
        </a>
      </div>
    </div>
  )
}

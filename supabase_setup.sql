-- Run this in your Supabase SQL Editor to create the VisitorLog table
CREATE TABLE IF NOT EXISTS public."VisitorLog" (
  "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "ipAddress" TEXT,
  "browser" TEXT,
  "device" TEXT,
  "os" TEXT,
  "visitedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public."VisitorLog" ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so the public website can log visitors)
CREATE POLICY "Allow anonymous inserts" ON public."VisitorLog"
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view logs (so your admin dashboard can read them)
CREATE POLICY "Allow authenticated selects" ON public."VisitorLog"
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to delete logs (for the clear logs feature)
CREATE POLICY "Allow authenticated deletes" ON public."VisitorLog"
  FOR DELETE TO authenticated
  USING (true);

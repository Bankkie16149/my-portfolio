import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const supabase = await createClient();
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    const os = userAgent.includes('Win') ? 'Windows' 
             : userAgent.includes('Mac') ? 'MacOS' 
             : userAgent.includes('Linux') ? 'Linux' 
             : userAgent.includes('Android') ? 'Android'
             : userAgent.includes('like Mac') ? 'iOS' : 'Unknown';

    const browser = userAgent.includes('Chrome') ? 'Chrome'
                  : userAgent.includes('Safari') ? 'Safari'
                  : userAgent.includes('Firefox') ? 'Firefox'
                  : userAgent.includes('Edge') ? 'Edge' : 'Unknown';

    // Insert into Supabase with explicit ID
    const { error } = await supabase
      .from('VisitorLog')
      .insert([
        { 
          id: crypto.randomUUID(),
          ipAddress: ip, 
          browser: browser, 
          os: os, 
          device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop' 
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error.message);
      return NextResponse.json({ error: 'Failed to log visitor' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visitor logging error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const supabase = await createClient();
    
    const { data: visitors, error } = await supabase
      .from('VisitorLog')
      .select('*')
      .order('visitedAt', { ascending: false });
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(visitors);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('VisitorLog')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

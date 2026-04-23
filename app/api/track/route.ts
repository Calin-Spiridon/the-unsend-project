import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  const { data: capsule, error } = await supabaseAdmin
    .from('capsules')
    .select('unique_token, status, open_date, title, mood, is_paid')
    .eq('unique_token', token)
    .single();

  if (error || !capsule) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!capsule.is_paid) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(capsule);
}
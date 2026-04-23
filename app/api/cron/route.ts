import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendOpenEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  const { data: capsules, error } = await supabaseAdmin
    .from('capsules')
    .select('*')
    .eq('is_paid', true)
    .eq('status', 'sealed')
    .lte('open_date', now.toISOString());

  if (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  if (!capsules || capsules.length === 0) {
    return NextResponse.json({ message: 'No capsules to deliver', count: 0 });
  }

  let delivered = 0;
  let failed = 0;

  for (const capsule of capsules) {
    try {
      await sendOpenEmail({
        to: capsule.recipient_email,
        capsuleTitle: capsule.title,
        token: capsule.unique_token,
        locale: 'en',
        mood: capsule.mood,
      });

      await supabaseAdmin
        .from('capsules')
        .update({ status: 'delivered' })
        .eq('id', capsule.id);

      await supabaseAdmin.from('email_logs').insert({
        capsule_id: capsule.id,
        type: 'delivery',
        status: 'sent',
      });

      delivered++;
    } catch (err) {
      console.error(`Failed to deliver capsule ${capsule.id}:`, err);

      await supabaseAdmin.from('email_logs').insert({
        capsule_id: capsule.id,
        type: 'delivery',
        status: 'failed',
      });

      failed++;
    }
  }

  return NextResponse.json({
    message: `Delivered ${delivered} capsules, ${failed} failed`,
    delivered,
    failed,
  });
}
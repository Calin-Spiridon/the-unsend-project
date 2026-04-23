import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { sendConfirmationEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const capsuleId = session.metadata?.capsule_id;
    const uniqueToken = session.metadata?.unique_token;

    if (!capsuleId) {
      console.error('No capsule_id in metadata');
      return NextResponse.json({ error: 'No capsule_id' }, { status: 400 });
    }

    const { error: capsuleUpdateError } = await supabaseAdmin
      .from('capsules')
      .update({
        is_paid: true,
        stripe_payment_id: session.payment_intent as string,
      })
      .eq('id', capsuleId);

    if (capsuleUpdateError) {
      console.error('Failed to update capsule:', capsuleUpdateError);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    const { error: paymentUpdateError } = await supabaseAdmin
      .from('payments')
      .update({ status: 'paid' })
      .eq('stripe_session_id', session.id);

    if (paymentUpdateError) {
      console.error('Failed to update payment:', paymentUpdateError);
    }

    if (uniqueToken) {
      const { data: capsule, error: fetchError } = await supabaseAdmin
        .from('capsules')
        .select('*')
        .eq('id', capsuleId)
        .single();

      if (fetchError || !capsule) {
        console.error('Failed to fetch capsule:', fetchError);
        return NextResponse.json({ received: true });
      }

      try {
        await sendConfirmationEmail({
          to: capsule.sender_email,
          capsuleTitle: capsule.title,
          openDate: capsule.open_date,
          token: uniqueToken,
          locale: capsule.locale || 'en',
        });

        await supabaseAdmin.from('email_logs').insert({
          capsule_id: capsuleId,
          type: 'confirmation',
          status: 'sent',
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        await supabaseAdmin.from('email_logs').insert({
          capsule_id: capsuleId,
          type: 'confirmation',
          status: 'failed',
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}

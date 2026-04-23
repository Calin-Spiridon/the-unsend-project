import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { CreateCapsuleInput } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: NextRequest) {
  try {
    const body: CreateCapsuleInput & { locale: string } = await req.json();

    const {
      message_text,
      title,
      mood,
      recipient_email,
      sender_email,
      open_date,
      delivery_method,
      locale,
    } = body;

    if (!message_text || !recipient_email || !sender_email || !open_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: capsule, error } = await supabaseAdmin
      .from('capsules')
      .insert({
        message_text,
        title: title || null,
        mood: mood || null,
        recipient_email,
        sender_email,
        open_date,
        delivery_method: delivery_method || 'email',
        is_paid: false,
        status: 'sealed',
      })
      .select()
      .single();

    if (error || !capsule) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create capsule' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'The Unsend Project',
              description: title || 'A sealed message to the future',
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/sealed?token=${capsule.unique_token}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/create`,
      metadata: {
        capsule_id: capsule.id,
        unique_token: capsule.unique_token,
      },
    });

    await supabaseAdmin
      .from('payments')
      .insert({
        capsule_id: capsule.id,
        stripe_session_id: session.id,
        amount: 100,
        currency: 'eur',
        status: 'pending',
      });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
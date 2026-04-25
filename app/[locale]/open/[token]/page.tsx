import { supabaseAdmin } from '@/lib/supabase';
import { LocalDate } from '@/components/ui/LocalDate';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { OpenCapsuleClient } from '@/components/capsule/OpenCapsuleClient';

export default async function OpenPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token } = await params;
  const locale = await getLocale();
  const t = await getTranslations();

  const { data: capsule } = await supabaseAdmin
    .from('capsules')
    .select('*')
    .eq('unique_token', token)
    .single();

  if (!capsule) {
    return (
      <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'rgba(255,255,255,0.4)' }}>This capsule doesn't exist.</p>
        <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          ← Go home
        </Link>
      </main>
    );
  }

  const now = new Date();
  const openDate = new Date(capsule.open_date);
  const isReady = now >= openDate;

  if (!isReady) {
    return (
      <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CountdownClient
          openDate={capsule.open_date}
          title={capsule.title}
          locale={locale}
          countdownTitle={t("open.countdown_title")}
          countdownSubtitle={t("open.countdown_subtitle")}
        />
      </main>
    );
  }

  if (!capsule.is_opened) {
    await supabaseAdmin
      .from('capsules')
      .update({ is_opened: true, status: 'opened' })
      .eq('unique_token', token);
  }

  return (
    <OpenCapsuleClient
      capsule={capsule}
      locale={locale}
      translations={{
        from: t("open.from"),
        written_on: t("open.written_on"),
        reply: t("open.reply"),
        create_own: t("open.create_own"),
        save: t("open.save"),
      }}
    />
  );
}

function CountdownClient({ openDate, title, locale, countdownTitle, countdownSubtitle }: {
  openDate: string;
  title: string | null;
  locale: string;
  countdownTitle: string;
  countdownSubtitle: string;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '500px' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
        <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.3)' }}>◎</span>
      </div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        {countdownTitle}
      </h1>
      {title && (
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(201,149,108,0.7)', marginBottom: '1rem' }}>
          "{title}"
        </p>
      )}
      <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
        {countdownSubtitle}
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', color: 'rgba(201,149,108,0.8)' }}>
        <LocalDate dateString={openDate} locale={locale} />
      </p>
    </div>
  );
}
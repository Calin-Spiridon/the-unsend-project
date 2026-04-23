import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { CopyLinkButton } from '@/components/ui/CopyLinkButton';

export default async function SealedPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations();

  if (!token) {
    return (
      <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Invalid link.</p>
      </main>
    );
  }

  const { data: capsule } = await supabaseAdmin
    .from('capsules')
    .select('*')
    .eq('unique_token', token)
    .single();

  if (!capsule) {
    return (
      <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Capsule not found.</p>
      </main>
    );
  }

  const openDate = new Date(capsule.open_date);
  const formattedDate = openDate.toLocaleDateString(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = openDate.toLocaleTimeString(locale, {
    hour: '2-digit', minute: '2-digit'
  });

  const capsuleLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/open/${token}`;

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <style>{`
        @keyframes sealIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .seal-card { animation: sealIn 1.2s ease forwards; }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', padding: '1.8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          The Unsend Project
        </Link>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        <div className="seal-card" style={{ width: '100%', marginBottom: '3rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(201,149,108,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', background: 'rgba(201,149,108,0.06)' }}>
            <span style={{ fontSize: '28px', color: '#C9956C' }}>◈</span>
          </div>

          <p style={{ fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.7)', marginBottom: '1rem' }}>
            sealed
          </p>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            {t("sealed.title")}
          </h1>

          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, marginBottom: '0.5rem' }}>
            {t("sealed.subtitle")}
          </p>
          <p style={{ fontSize: '1.1rem', color: 'rgba(201,149,108,0.8)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            {formattedDate} at {formattedTime}
          </p>
        </div>

        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '3rem' }} />

        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem' }}>
            {t("sealed.send_now")}
          </p>
          <CopyLinkButton
            link={capsuleLink}
            label={t("sealed.copy_link")}
            copied={t("sealed.link_copied")}
          />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem 2rem', width: '100%', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
            {t("sealed.what_next")}
          </p>
        </div>

        <div style={{ border: '1px solid rgba(201,149,108,0.2)', borderRadius: '12px', padding: '2rem', width: '100%', background: 'rgba(201,149,108,0.03)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.5)', marginBottom: '1.5rem' }}>
            {t("sealed.certificate")}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
            {capsule.title && (
              <div>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Title</p>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>{capsule.title}</p>
              </div>
            )}
            <div>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Opens on</p>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>{formattedDate} at {formattedTime}</p>
            </div>
            <div>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Capsule code</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(201,149,108,0.7)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{token}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Link href={`/${locale}/create`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            {t("open.create_own")} →
          </Link>
        </div>

      </div>
    </main>
  );
}
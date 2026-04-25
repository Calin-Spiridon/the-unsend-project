"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { LocalDate } from '@/components/ui/LocalDate';

export default function TrackPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [capsule, setCapsule] = useState<{
    status: string;
    open_date: string;
    title: string | null;
    mood: string | null;
    unique_token: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    setCapsule(null);

    try {
      const res = await fetch(`/api/track?token=${code.trim()}`);
      const data = await res.json();
      if (data.error) {
        setError('Capsule not found. Check your code and try again.');
      } else {
        setCapsule(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openDate = capsule ? new Date(capsule.open_date) : null;
  const isReady = openDate ? new Date() >= openDate : false;

  const statusLabels: Record<string, string> = {
    sealed: t("track.status_sealed"),
    delivered: t("track.status_pending"),
    opened: t("track.status_opened"),
  };

  const statusColors: Record<string, string> = {
    sealed: 'rgba(201,149,108,0.8)',
    delivered: 'rgba(168,197,181,0.8)',
    opened: 'rgba(168,197,181,0.9)',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <style>{`
        .track-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 18px 20px; color: #fff; font-size: 1.1rem; outline: none; font-family: 'Cormorant Garamond', serif; transition: border-color 0.3s; letter-spacing: 0.1em; }
        .track-input:focus { border-color: rgba(201,149,108,0.5); }
        .track-input::placeholder { color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }
        .search-btn { width: 100%; background: #C9956C; color: #080808; padding: 18px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 500; font-family: 'Cormorant Garamond', serif; transition: opacity 0.3s; margin-top: 1rem; }
        .search-btn:hover { opacity: 0.88; }
        .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
      `}</style>

      <nav className="page-nav">
  <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
    ← The Unwrite Project
  </Link>
  <LanguageSwitcher currentLocale={locale} />
</nav>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '5rem 2rem' }}>

        <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.8)', marginBottom: '0.75rem' }}>
          track
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
          {t("track.title")}
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', marginBottom: '3rem', lineHeight: 1.8 }}>
          {t("track.subtitle")}
        </p>

        <div>
          <label style={{ fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '0.875rem' }}>
            {t("track.code_label")}
          </label>
          <input
            type="text"
            className="track-input"
            placeholder={t("track.code_placeholder")}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading || !code.trim()}
          >
            {loading ? 'Searching...' : t("track.search")} →
          </button>
        </div>

        {error && (
          <div className="fade-up" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
            <p style={{ fontSize: '1rem', color: 'rgba(255,100,100,0.7)', margin: 0 }}>{error}</p>
          </div>
        )}

        {capsule && (
          <div className="fade-up" style={{ marginTop: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '2rem', marginBottom: '1rem' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                {capsule.title && (
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', margin: 0, flex: 1 }}>
                    "{capsule.title}"
                  </p>
                )}
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: statusColors[capsule.status] || '#C9956C', background: 'rgba(255,255,255,0.04)', border: `1px solid ${statusColors[capsule.status] || '#C9956C'}30`, borderRadius: '100px', padding: '4px 12px', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                  {statusLabels[capsule.status] || capsule.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Opens on</span>
                  <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Cormorant Garamond', serif" }}>
                    {openDate && <LocalDate dateString={capsule.open_date} locale={locale} />}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Capsule code</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(201,149,108,0.7)', fontFamily: 'monospace' }}>
                    {capsule.unique_token.slice(0, 16)}...
                  </span>
                </div>
              </div>
            </div>

            {isReady && (
              <Link
                href={`/${locale}/open/${capsule.unique_token}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#C9956C', color: '#080808', padding: '16px 40px', borderRadius: '4px', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500, width: '100%' }}
              >
                Open your message →
              </Link>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
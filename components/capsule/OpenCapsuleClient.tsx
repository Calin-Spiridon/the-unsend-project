"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const MOOD_COLORS: Record<string, string> = {
  love: '#C9956C',
  hope: '#A8C5B5',
  regret: '#8899AA',
  promise: '#B8A9C9',
  for_kids: '#E8C49A',
  forgive: '#A5B896',
  remember_me: '#C4A882',
  gratitude: '#D4A5A5',
  courage: '#C9956C',
  goodbye: '#909BA8',
  proud: '#D4BC82',
};

const MOOD_ICONS: Record<string, string> = {
  love: '♡', hope: '◎', regret: '◌', promise: '◈',
  for_kids: '✦', forgive: '◍', remember_me: '◉',
  gratitude: '❋', courage: '◆', goodbye: '◯', proud: '✧',
};

export function OpenCapsuleClient({ capsule, locale, translations }: {
  capsule: {
    message_text: string;
    title: string | null;
    mood: string | null;
    sender_email: string;
    open_date: string;
    unique_token: string;
  };
  locale: string;
  translations: {
    from: string;
    written_on: string;
    reply: string;
    create_own: string;
    save: string;
  };
}) {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'open'>('sealed');
  const moodColor = capsule.mood ? (MOOD_COLORS[capsule.mood] || '#C9956C') : '#C9956C';
  const moodIcon = capsule.mood ? (MOOD_ICONS[capsule.mood] || '◈') : '◈';

  const openDate = new Date(capsule.open_date);
  const formattedDate = openDate.toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 800);
    const t2 = setTimeout(() => setPhase('open'), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const cssAnimations = `
    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes unseal {
      0% { transform: scale(1) rotate(0deg); opacity: 1; }
      50% { transform: scale(1.3) rotate(15deg); opacity: 0.8; }
      100% { transform: scale(0) rotate(45deg); opacity: 0; }
    }
    @keyframes revealText {
      from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
      to { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .pulse-ring {
      position: absolute; inset: -20px;
      border-radius: 50%;
      border: 1px solid ${moodColor};
      animation: pulse-ring 1.5s ease-out forwards;
    }
    .seal-icon-opening {
      animation: unseal 1.2s ease-in forwards;
    }
    .message-reveal {
      animation: revealText 1.5s ease forwards;
    }
    .fade-up { animation: fadeUp 0.8s ease forwards; }
    .fade-up-2 { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
    .fade-up-3 { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }
    .msg-card { padding: 3rem 2.5rem; }
    @media (max-width: 640px) { .msg-card { padding: 1.5rem 1.25rem; } }
  `;

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', transition: 'background 1.5s ease' }}>
      <style>{cssAnimations}</style>

      {phase === 'sealed' && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${moodColor}40`, background: `${moodColor}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '36px', color: moodColor }}>{moodIcon}</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
            Something was left for you.
          </p>
        </div>
      )}

      {phase === 'opening' && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
            <div className="pulse-ring" />
            <div className="pulse-ring" style={{ animationDelay: '0.3s' }} />
            <div className="seal-icon-opening" style={{ width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${moodColor}`, background: `${moodColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '36px', color: moodColor }}>{moodIcon}</span>
            </div>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
            Opening...
          </p>
        </div>
      )}

      {phase === 'open' && (
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

          <div className="fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `1px solid ${moodColor}40`, background: `${moodColor}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <span style={{ fontSize: '22px', color: moodColor }}>{moodIcon}</span>
            </div>
            {capsule.title && (
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                {capsule.title}
              </h1>
            )}
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              {translations.written_on} {formattedDate}
            </p>
          </div>

          <div className="message-reveal msg-card" style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${moodColor}20`,
            borderRadius: '16px',
            marginBottom: '3rem',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', fontSize: '48px', color: `${moodColor}15`, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
              "
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', lineHeight: 2, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap', paddingTop: '1rem' }}>
              {capsule.message_text}
            </p>
          </div>

          <div className="fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link
              href={`/${locale}/create`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '16px 40px', borderRadius: '4px', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', width: '100%' }}
            >
              {translations.create_own}
            </Link>
          </div>

        </div>
      )}

    </main>
  );
}
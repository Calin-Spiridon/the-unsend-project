"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const MOODS = [
  { key: 'love', icon: '♡', color: '#C9956C' },
  { key: 'hope', icon: '◎', color: '#A8C5B5' },
  { key: 'regret', icon: '◌', color: '#8899AA' },
  { key: 'promise', icon: '◈', color: '#B8A9C9' },
  { key: 'for_kids', icon: '✦', color: '#E8C49A' },
  { key: 'forgive', icon: '◍', color: '#A5B896' },
  { key: 'remember_me', icon: '◉', color: '#C4A882' },
  { key: 'gratitude', icon: '❋', color: '#D4A5A5' },
  { key: 'courage', icon: '◆', color: '#C9956C' },
  { key: 'goodbye', icon: '◯', color: '#909BA8' },
  { key: 'proud', icon: '✧', color: '#D4BC82' },
];

export default function CreatePage() {
  const t = useTranslations();
  const locale = useLocale();

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<'self' | 'other'>('self');
  const [message, setMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [title, setTitle] = useState('');
  const [titleLength, setTitleLength] = useState(0);
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message || !senderEmail || !openDate || !openTime) {
      alert('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const openDateTime = new Date(`${openDate}T${openTime}:00`).toISOString();
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_text: message,
          title: title || undefined,
          mood: selectedMood || undefined,
          recipient_email: recipient === 'self' ? senderEmail : recipientEmail,
          sender_email: senderEmail,
          open_date: openDateTime,
          delivery_method: 'email',
          locale,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <style>{`
        .create-container { max-width: 680px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .field-label { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.4); display: block; margin-bottom: 0.875rem; }
        .text-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px 18px; color: #fff; font-size: 1.05rem; outline: none; font-family: 'Cormorant Garamond', serif; transition: border-color 0.3s; color-scheme: dark; box-sizing: border-box; }
        .text-input:focus { border-color: rgba(201,149,108,0.5); }
        .text-input::placeholder { color: rgba(255,255,255,0.2); }
        .recipient-btn { flex: 1; padding: 16px; text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); font-family: 'Cormorant Garamond', serif; transition: all 0.3s; }
        .recipient-btn.active { border-color: #C9956C; color: #C9956C; background: rgba(201,149,108,0.08); }
        .mood-pill { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 10px 18px; cursor: pointer; transition: all 0.3s; }
        .mood-pill.active { border-color: rgba(201,149,108,0.6); background: rgba(201,149,108,0.08); }
        .date-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 480px) { .date-grid { grid-template-columns: 1fr; } }
        .seal-btn { width: 100%; background: #C9956C; color: #080808; padding: 20px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 500; font-family: 'Cormorant Garamond', serif; transition: opacity 0.3s; }
        .seal-btn:hover { opacity: 0.88; }
        .seal-btn:disabled { cursor: not-allowed; }
        .char-counter { font-size: 11px; letter-spacing: 0.1em; transition: color 0.3s; }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', padding: '1.8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          ← The Unsend Project
        </Link>
      </nav>

      <div className="create-container">

        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem' }}>
          {[1,2,3].map((s) => (
            <div key={s} style={{ height: '2px', flex: 1, background: s === 1 ? '#C9956C' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          ))}
        </div>

        <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.8)', marginBottom: '0.75rem' }}>
          step 1 of 3
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '3rem', lineHeight: 1.1 }}>
          {t("create.title")}
        </h1>

        {/* Mood */}
        <div style={{ marginBottom: '2.5rem' }}>
          <label className="field-label">{t("create.mood_label")}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {MOODS.map((mood) => (
              <div
                key={mood.key}
                className={`mood-pill${selectedMood === mood.key ? ' active' : ''}`}
                onClick={() => setSelectedMood(selectedMood === mood.key ? null : mood.key)}
              >
                <span style={{ color: mood.color, fontSize: '14px' }}>{mood.icon}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: selectedMood === mood.key ? '#C9956C' : 'rgba(255,255,255,0.6)' }}>
                  {t(`moods.${mood.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <label className="field-label" style={{ margin: 0 }}>{t("create.title_label")}</label>
            <span className="char-counter" style={{ color: titleLength > 80 ? 'rgba(201,149,108,0.8)' : 'rgba(255,255,255,0.2)' }}>
              {titleLength} / 100
            </span>
          </div>
          <input
            type="text"
            className="text-input"
            placeholder={t("create.title_placeholder")}
            maxLength={100}
            value={title}
            onChange={(e) => { setTitle(e.target.value); setTitleLength(e.target.value.length); }}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <label className="field-label" style={{ margin: 0 }}>{t("create.message_label")}</label>
            <span className="char-counter" style={{ color: messageLength > 1800 ? 'rgba(201,149,108,0.8)' : 'rgba(255,255,255,0.2)' }}>
              {messageLength} / 2000
            </span>
          </div>
          <textarea
            className="text-input"
            placeholder={t("create.message_placeholder")}
            rows={9}
            maxLength={2000}
            value={message}
            style={{ resize: 'vertical', lineHeight: 1.8 }}
            onChange={(e) => { setMessage(e.target.value); setMessageLength(e.target.value.length); }}
          />
        </div>

        {/* Recipient */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="field-label">{t("create.recipient_label")}</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className={`recipient-btn${recipient === 'self' ? ' active' : ''}`}
              onClick={() => setRecipient('self')}
            >
              {t("create.recipient_self")}
            </button>
            <button
              className={`recipient-btn${recipient === 'other' ? ' active' : ''}`}
              onClick={() => setRecipient('other')}
            >
              {t("create.recipient_other")}
            </button>
          </div>
        </div>

        {/* Sender email */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="field-label">{t("create.your_email_label")}</label>
          <input
            type="email"
            className="text-input"
            placeholder="your@email.com"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
        </div>

        {/* Recipient email — only if other */}
        {recipient === 'other' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="field-label">{t("create.email_label")}</label>
            <input
              type="email"
              className="text-input"
              placeholder="their@email.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
        )}

        {/* Date + Time */}
        <div className="date-grid" style={{ marginBottom: '3rem' }}>
          <div>
            <label className="field-label">{t("create.date_label")}</label>
            <input
              type="date"
              className="text-input"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">{t("create.time_label")}</label>
            <input
              type="time"
              className="text-input"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </div>
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
          <button
            className="seal-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Sealing...' : `${t("create.pay")} →`}
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, marginTop: '1rem' }}>
            {t("create.pay_desc")}
          </p>
        </div>

      </div>
    </main>
  );
}
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

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

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', overflowX: 'hidden' }}>

      <style>{`
        .nav-links a { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.35); text-decoration: none; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; line-height: 1.05; font-size: clamp(3.5rem, 9vw, 8rem); letter-spacing: -0.02em; }
        .hero-sub { font-size: clamp(1rem, 2vw, 1.2rem); color: rgba(255,255,255,0.5); max-width: 480px; line-height: 1.8; font-weight: 300; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .step-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1rem; }
        .step-num { font-size: 11px; color: rgba(201,149,108,0.8); letter-spacing: 0.3em; }
        .step-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: rgba(255,255,255,0.95); }
        .step-desc { font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.8; }
        .mood-pill { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 10px 20px; }
        .mood-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.65); }
        .quote-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; font-size: clamp(2rem, 4vw, 3.8rem); color: rgba(255,255,255,0.2); line-height: 1.4; }
        .cta-btn { display: inline-flex; align-items: center; gap: 12px; background: #C9956C; color: #080808; padding: 18px 48px; border-radius: 4px; font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; font-weight: 500; }
        .cta-sub { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.15em; margin-top: 1rem; }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr; gap: 1rem; }
          .step-card { padding: 2rem 1.5rem; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
  <span style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
    The Unsend Project
  </span>
  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
    <div className="nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
      <Link href={`/${locale}/create`}>{t("nav.create")}</Link>
      <Link href={`/${locale}/track`}>{t("nav.track")}</Link>
      <Link href={`/${locale}/about`}>{t("nav.about")}</Link>
    </div>
    <LanguageSwitcher currentLocale={locale} />
  </div>
</nav>

      {/* Hero */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '92vh', textAlign: 'center', padding: '4rem 2rem', position: 'relative' }}>

        <div className="animate-fade-in-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,149,108,0.08)', border: '1px solid rgba(201,149,108,0.2)', borderRadius: '100px', padding: '8px 20px', marginBottom: '3rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9956C', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9956C' }}>
            theunsendproject.com
          </span>
        </div>

        <h1 className="hero-title animate-fade-in-up delay-2" style={{ marginBottom: '1.5rem', maxWidth: '900px' }}>
          Some words<br />
          <em style={{ color: '#C9956C', fontStyle: 'italic' }}>deserve</em>
          {' '}to wait.
        </h1>

        <p className="hero-sub animate-fade-in-up delay-3" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          {t("home.hero_subtitle")}
        </p>

        <div className="animate-fade-in-up delay-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link href={`/${locale}/create`} className="cta-btn">
            {t("home.cta")} →
          </Link>
          <p className="cta-sub">1€ · encrypted · forever yours</p>
        </div>

        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, transparent, rgba(201,149,108,0.4))' }} />
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '6rem 2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>
            {t("home.how_title")}
          </p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,149,108,0.4)', margin: '0 auto' }} />
        </div>
        <div className="steps-grid">
          {[
            { title: t("home.step1_title"), desc: t("home.step1_desc"), num: "01" },
            { title: t("home.step2_title"), desc: t("home.step2_desc"), num: "02" },
            { title: t("home.step3_title"), desc: t("home.step3_desc"), num: "03" },
          ].map((step) => (
            <div key={step.num} className="step-card">
              <span className="step-num">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Moods */}
      <section style={{ padding: '5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '3rem' }}>
          every feeling has a capsule
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
          {MOODS.map((mood) => (
            <div key={mood.key} className="mood-pill">
              <span style={{ color: mood.color, fontSize: '14px' }}>{mood.icon}</span>
              <span className="mood-label">{t(`moods.${mood.key}`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: '8rem 2.5rem', textAlign: 'center' }}>
        <p className="quote-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
          "Write it now.<br />
          <span style={{ color: 'rgba(201,149,108,0.6)' }}>Let it arrive when it matters.</span>"
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          The Unsend Project
        </span>
        <p style={{ fontStyle: 'italic', fontSize: '1rem', color: 'rgba(255,255,255,0.2)' }}>
          {t("footer.tagline")}
        </p>
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: t("footer.privacy"), href: `/${locale}/privacy` },
            { label: t("footer.faq"), href: `/${locale}/faq` },
            { label: t("footer.about"), href: `/${locale}/about` },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              {label}
            </Link>
          ))}
        </div>
      </footer>

    </main>
  );
}
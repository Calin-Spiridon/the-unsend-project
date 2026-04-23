import { useLocale } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function AboutPage() {
  const locale = useLocale();

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
  <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
    ← The Unsend Project
  </Link>
  <LanguageSwitcher currentLocale={locale} />
</nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '5rem 2rem 8rem' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.8)', marginBottom: '0.75rem' }}>about</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '3rem', lineHeight: 1.1 }}>
          Some words deserve to wait.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, borderLeft: '2px solid rgba(201,149,108,0.3)', paddingLeft: '1.5rem' }}>
            "There are things we want to say but not yet. Promises we want to make but not out loud. Feelings we want to share but only when the moment is right."
          </p>

          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9 }}>
            The Unsend Project was built around a simple idea: some messages are too important to send right now. A letter to your child for when they turn 18. A note to yourself for when things get hard. A promise to someone you love, delivered exactly when it matters most.
          </p>

          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9 }}>
            We built this because we believe words have weight. And sometimes the most meaningful thing you can do is take the time to write something real — and trust that it will find its way at the right moment.
          </p>

          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9 }}>
            The service is simple by design. Write your message. Choose a mood. Set a date. Pay €1 to seal it. That's it. No account needed. No subscriptions. No noise.
          </p>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem' }}>made by</p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9 }}>
              The Unsend Project is built and operated by <strong style={{ color: 'rgba(255,255,255,0.65)' }}>Minglr SRL</strong>, a company based in Romania. We care deeply about privacy, simplicity, and creating products that feel human.
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>contact</p>
            <a href="mailto:hello@theunsendproject.com" style={{ fontSize: '1rem', color: '#C9956C', fontFamily: "'Cormorant Garamond', serif" }}>
              hello@theunsendproject.com
            </a>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/privacy`} style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              Privacy Policy
            </Link>
            <Link href={`/${locale}/faq`} style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
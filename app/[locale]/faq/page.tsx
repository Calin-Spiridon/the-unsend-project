import { useLocale } from "next-intl";
import Link from "next/link";
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const FAQS = [
  {
    q: "What is The Unsend Project?",
    a: "The Unsend Project is a service that lets you write a message today and deliver it to yourself or someone else at a future date and time of your choosing. Think of it as a time capsule for words that matter."
  },
  {
    q: "How much does it cost?",
    a: "Each capsule costs €1. This is a one-time contribution — no subscriptions, no hidden fees. Your message is stored and delivered for €1."
  },
  {
    q: "Can I send a capsule to someone else?",
    a: "Yes. When creating your capsule, you can choose to send it to another person's email address. They'll receive a notification when it's time to open it."
  },
 {
  q: "What if I lose my capsule code?",
  a: "Unfortunately, we cannot recover your capsule code automatically. However, if you contact us at hello@theunsendproject.com with the email address you used when creating the capsule, we can verify your identity and help you locate it. Please note that for privacy reasons, we cannot view or share the content of any message."
},
  {
    q: "Is my message private?",
    a: "Yes. Your message is stored securely and can only be accessed via its unique token. We never read, share, or use your message content for any purpose other than delivery."
  },
  {
    q: "What happens if the recipient opens the link before the date?",
    a: "If someone accesses the link before the chosen date and time, they'll see a countdown page showing exactly when the message will be available. The content remains locked until that moment."
  },
  {
    q: "Can I cancel or edit my capsule after payment?",
    a: "Due to the nature of the service, capsules cannot be edited after payment. If you need to cancel for an exceptional reason, contact us at hello@theunsendproject.com within 24 hours of purchase."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards, Apple Pay, and Google Pay — processed securely via Stripe. We never store your card details."
  },
  {
    q: "How will the recipient know they have a message?",
    a: "If you chose email delivery, they'll receive an email at the chosen date and time with a button to open their message. The email is designed to feel as special as the message itself."
  },
  {
    q: "How long is the link active?",
    a: "Your capsule link is permanent. The recipient can return to it anytime after it opens — months or years later."
  },
  {
    q: "What if I lose my capsule code?",
    a: "Check the confirmation email we sent after your purchase — it contains both the link and your capsule code. If you can't find it, contact us with the email address you used."
  },
  {
    q: "Is The Unsend Project available in multiple languages?",
    a: "Yes. The service is available in English, Romanian, French, Spanish, German, Italian, and Portuguese. The language is detected automatically based on your browser, and you can change it at any time."
  },
];

export default function FAQPage() {
  const locale = useLocale();

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
    <nav className="page-nav">
  <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
    ← The Unsend Project
  </Link>
  <LanguageSwitcher currentLocale={locale} />
</nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '5rem 2rem 8rem' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.8)', marginBottom: '0.75rem' }}>support</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '4rem', lineHeight: 1.1 }}>
          Frequently asked questions
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '0.875rem', lineHeight: 1.3 }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '2rem', paddingTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            Still have questions?
          </p>
          <a href="mailto:hello@theunsendproject.com" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9956C' }}>
            hello@theunsendproject.com
          </a>
        </div>
      </div>
    </main>
  );
}
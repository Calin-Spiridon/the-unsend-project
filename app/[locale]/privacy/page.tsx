import { useLocale } from "next-intl";
import Link from "next/link";

export default function PrivacyPage() {
  const locale = useLocale();

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <nav style={{ display: 'flex', alignItems: 'center', padding: '1.8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href={`/${locale}`} style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          ← The Unsend Project
        </Link>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '5rem 2rem 8rem' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,149,108,0.8)', marginBottom: '0.75rem' }}>legal</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.25)', marginBottom: '4rem' }}>
          Last updated: April 2026
        </p>

        <style>{`
          .legal-section { margin-bottom: 3rem; }
          .legal-h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 300; color: rgba(255,255,255,0.85); margin-bottom: 1rem; }
          .legal-p { font-size: 0.95rem; color: rgba(255,255,255,0.45); line-height: 1.9; margin-bottom: 1rem; }
          .legal-ul { list-style: none; padding: 0; margin: 0 0 1rem; }
          .legal-ul li { font-size: 0.95rem; color: rgba(255,255,255,0.45); line-height: 1.9; padding-left: 1.5rem; position: relative; }
          .legal-ul li::before { content: '◈'; position: absolute; left: 0; color: rgba(201,149,108,0.5); font-size: 0.7rem; top: 0.35rem; }
          .legal-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 2rem 0; }
        `}</style>

        <div className="legal-section">
          <h2 className="legal-h2">1. Who we are</h2>
          <p className="legal-p">
            The Unsend Project is operated by <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Minglr SRL</strong>, a company registered in Romania. We operate the website theunsendproject.com and all related services.
          </p>
          <p className="legal-p">
            Contact: <a href="mailto:hello@theunsendproject.com" style={{ color: 'rgba(201,149,108,0.7)' }}>hello@theunsendproject.com</a>
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">2. What data we collect</h2>
          <p className="legal-p">When you create a capsule, we collect:</p>
          <ul className="legal-ul">
            <li>Your email address and the recipient's email address</li>
            <li>The message content you write</li>
            <li>The title and mood you select (optional)</li>
            <li>The date and time you choose for delivery</li>
            <li>Payment information — processed securely by Stripe. We never store card details.</li>
          </ul>
          <p className="legal-p">We also collect standard technical data: IP address, browser type, and usage logs for security and performance purposes.</p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">3. How we use your data</h2>
          <p className="legal-p">We use your data exclusively to:</p>
          <ul className="legal-ul">
            <li>Store and deliver your capsule at the chosen date and time</li>
            <li>Send you a confirmation email after purchase</li>
            <li>Send the recipient a notification when the capsule opens</li>
            <li>Process your payment via Stripe</li>
            <li>Provide customer support if needed</li>
          </ul>
          <p className="legal-p">
            We do not sell, share, or use your data for advertising. We do not use your message content for any purpose other than delivery.
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">4. Message encryption and security</h2>
          <p className="legal-p">
            Your messages are stored securely in our database hosted on Supabase (EU region, Ireland). Access is restricted and protected. We use Row Level Security to ensure messages can only be accessed via their unique token.
          </p>
          <p className="legal-p">
            We strongly recommend not including sensitive personal information (passwords, financial data, national ID numbers) in your capsule messages.
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">5. Data retention</h2>
          <p className="legal-p">
            Your capsule and its content are stored indefinitely — the link remains active permanently so the recipient can always return to it. If you wish to delete your capsule and all associated data, contact us at <a href="mailto:hello@theunsendproject.com" style={{ color: 'rgba(201,149,108,0.7)' }}>hello@theunsendproject.com</a> with your capsule token.
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">6. Third-party services</h2>
          <p className="legal-p">We use the following trusted third-party services:</p>
          <ul className="legal-ul">
            <li><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Stripe</strong> — payment processing. Stripe's privacy policy applies to payment data.</li>
            <li><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Resend</strong> — transactional email delivery.</li>
            <li><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Supabase</strong> — database and infrastructure, hosted in EU (Ireland).</li>
          </ul>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">7. Your rights (GDPR)</h2>
          <p className="legal-p">As a user in the European Union, you have the right to:</p>
          <ul className="legal-ul">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data ("right to be forgotten")</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p className="legal-p">
            To exercise any of these rights, email us at <a href="mailto:hello@theunsendproject.com" style={{ color: 'rgba(201,149,108,0.7)' }}>hello@theunsendproject.com</a>. We will respond within 30 days.
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">8. Cookies</h2>
          <p className="legal-p">
            We use minimal cookies necessary for the service to function (session management, language preference). We do not use tracking or advertising cookies.
          </p>
        </div>

        <div className="legal-divider" />

        <div className="legal-section">
          <h2 className="legal-h2">9. Changes to this policy</h2>
          <p className="legal-p">
            We may update this policy from time to time. We will notify users of significant changes by email if we have your address on file. Continued use of the service after changes constitutes acceptance.
          </p>
        </div>

      </div>
    </main>
  );
}
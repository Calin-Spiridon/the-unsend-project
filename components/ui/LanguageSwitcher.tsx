"use client";

import { useRouter, usePathname } from "next/navigation";

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'pt', label: 'PT', name: 'Português' },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value)}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '4px',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        padding: '8px 10px',
        minHeight: '36px',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {LANGUAGES.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          style={{ background: '#1a1a1a', color: '#fff' }}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
}
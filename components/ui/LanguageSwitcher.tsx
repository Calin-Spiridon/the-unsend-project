"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'pt', label: 'PT' },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    const query = searchParams.toString();
    router.push(query ? `${newPath}?${query}` : newPath);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value)}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '4px',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        padding: '4px 8px',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code} style={{ background: '#1a1a1a', color: '#fff' }}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
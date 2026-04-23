"use client";

import { useState } from "react";

export function CopyLinkButton({ link, label, copied }: { link: string; label: string; copied: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '14px 20px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: "'Cormorant Garamond', serif",
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s',
      }}
    >
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
        {link}
      </span>
      <span style={{ color: isCopied ? '#A8C5B5' : '#C9956C', minWidth: '60px', textAlign: 'right', transition: 'color 0.3s' }}>
        {isCopied ? copied : label}
      </span>
    </button>
  );
}
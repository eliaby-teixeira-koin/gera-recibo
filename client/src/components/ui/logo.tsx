import React from 'react';

export const Logo: React.FC = () => {
  return (
    <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="shadow" x="-2" y="0" width="100%" height="100%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Document background */}
      <rect x="10" y="8" width="40" height="50" rx="3" fill="white" stroke="#4f46e5" strokeWidth="2" />
      
      {/* Document lines */}
      <line x1="18" y1="20" x2="42" y2="20" stroke="#d1d5db" strokeWidth="1.5" />
      <line x1="18" y1="28" x2="42" y2="28" stroke="#d1d5db" strokeWidth="1.5" />
      <line x1="18" y1="36" x2="42" y2="36" stroke="#d1d5db" strokeWidth="1.5" />
      <line x1="18" y1="44" x2="36" y2="44" stroke="#d1d5db" strokeWidth="1.5" />
      
      {/* Check mark */}
      <circle cx="50" cy="35" r="15" fill="url(#gradient1)" />
      <path d="M42 35 L48 41 L58 29" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Text */}
      <text x="70" y="42" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="bold" fill="#1f2937" filter="url(#shadow)">
        GERA RECIBO
      </text>
      
      {/* Tagline */}
      <text x="72" y="52" fontFamily="Arial, sans-serif" fontSize="10" fill="#6b7280">
        Recibos profissionais em segundos
      </text>
    </svg>
  );
};

export default Logo;
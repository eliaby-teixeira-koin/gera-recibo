import React from 'react';

export const Logo: React.FC = () => {
  return (
    <svg width="260" height="70" viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8cc63f" />
          <stop offset="40%" stopColor="#1a6e3d" />
          <stop offset="60%" stopColor="#1a6e3d" />
          <stop offset="100%" stopColor="#009dd9" />
        </linearGradient>
      </defs>
      
      {/* App Icon - Rounded square with gradient */}
      <rect x="10" y="10" width="50" height="50" rx="10" fill="url(#iconGradient)" />
      
      {/* Document icon inside */}
      <rect x="22" y="20" width="26" height="30" rx="2" fill="white" />
      
      {/* Letter G */}
      <text x="28" y="40" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#009dd9">
        G
      </text>
      
      {/* Lines in document */}
      <line x1="28" y1="26" x2="42" y2="26" stroke="#009dd9" strokeWidth="1.5" />
      <line x1="28" y1="44" x2="42" y2="44" stroke="#009dd9" strokeWidth="1.5" />
      <line x1="28" y1="48" x2="38" y2="48" stroke="#009dd9" strokeWidth="1.5" />
      
      {/* Text logo */}
      <text x="70" y="42" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#009dd9">
        Gera
      </text>
      <text x="138" y="42" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#1f2937">
        Recibo
      </text>
    </svg>
  );
};

export default Logo;
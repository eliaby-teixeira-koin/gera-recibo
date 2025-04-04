import React from 'react';

export const Logo: React.FC = () => {
  return (
    <svg width="300" height="70" viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8cc63f" />
          <stop offset="50%" stopColor="#1a6e3d" />
          <stop offset="100%" stopColor="#009dd9" />
        </linearGradient>
      </defs>
      
      {/* App Icon - Rounded square with gradient */}
      <rect x="10" y="10" width="50" height="50" rx="10" fill="url(#iconGradient)" />
      
      {/* Document icon with folded corner */}
      <path 
        d="M22 20 L41 20 L48 27 L48 50 L22 50 Z" 
        fill="white" 
      />
      <path 
        d="M41 20 L41 27 L48 27" 
        fill="#e6e6e6" 
        stroke="#009dd9" 
        strokeWidth="0.5"
      />
      
      {/* Sem a letra G, apenas o documento com linhas */}
      
      {/* Lines in document */}
      <line x1="26" y1="28" x2="44" y2="28" stroke="#009dd9" strokeWidth="1.5" />
      <line x1="26" y1="34" x2="44" y2="34" stroke="#009dd9" strokeWidth="1.5" />
      <line x1="26" y1="40" x2="44" y2="40" stroke="#009dd9" strokeWidth="1.5" />
      <line x1="26" y1="46" x2="38" y2="46" stroke="#009dd9" strokeWidth="1" />
      
      {/* Text logo with proper spacing and centered vertical alignment */}
      <g>
        {/* Centrando os textos na altura do ícone (que tem 50px de altura e começa em y=10) */}
        <text x="70" y="37" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#009dd9" dominant-baseline="central" text-anchor="start">
          Gera
        </text>
        <text x="148" y="37" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#1f2937" dominant-baseline="central" text-anchor="start">
          Recibo
        </text>
      </g>
    </svg>
  );
};

export default Logo;
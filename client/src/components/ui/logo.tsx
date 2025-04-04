import React from 'react';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  showTagline?: boolean;
};

export const Logo: React.FC<LogoProps> = ({
  width = 300,
  height = 70,
  className,
  style,
  showTagline = false
}) => {
  // Manter a proporção correta
  const aspectRatio = 300 / 70;
  let calculatedHeight = height || width / aspectRatio;
  let calculatedWidth = width || height * aspectRatio;
  
  // Ajustar altura se o tagline for mostrado
  if (showTagline) {
    calculatedHeight += 20;
  }

  return (
    <svg
      width={calculatedWidth}
      height={calculatedHeight}
      viewBox={`0 0 300 ${showTagline ? 90 : 70}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="logoIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8cc63f" />
          <stop offset="35%" stopColor="#006837" />
          <stop offset="100%" stopColor="#00AEEF" />
        </linearGradient>
      </defs>
      
      {/* App Icon - Rounded square com gradient mais próximo da imagem de referência */}
      <rect x="10" y="10" width="50" height="50" rx="12" fill="url(#logoIconGradient)" />
      
      {/* Document icon with folded corner */}
      <path 
        d="M18 16 L35 16 L42 23 L42 44 L18 44 Z" 
        fill="white" 
      />
      <path 
        d="M35 16 L35 23 L42 23" 
        fill="#e6e6e6" 
        stroke="#00AEEF" 
        strokeWidth="0.5"
      />
      
      {/* Lines in document */}
      <line x1="22" y1="28" x2="38" y2="28" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="22" y1="33" x2="38" y2="33" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="22" y1="38" x2="38" y2="38" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="22" y1="42" x2="32" y2="42" stroke="#00AEEF" strokeWidth="1" />
      
      {/* Text logo with proper spacing and centered vertical alignment */}
      <g>
        <text x="70" y="37" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#00AEEF" dominantBaseline="central" textAnchor="start">
          Gera
        </text>
        <text x="150" y="37" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#1f2937" dominantBaseline="central" textAnchor="start">
          Recibo
        </text>
      </g>
      
      {/* Tagline, se solicitado */}
      {showTagline && (
        <text x="150" y="70" fontFamily="Arial, sans-serif" fontSize="12" fill="#4b5563" dominantBaseline="central" textAnchor="middle">
          Customizable Receipts & Exports to PDF
        </text>
      )}
    </svg>
  );
};

export const SocialShareImage: React.FC = () => {
  return (
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
        <linearGradient id="socialIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8cc63f" />
          <stop offset="35%" stopColor="#006837" />
          <stop offset="100%" stopColor="#00AEEF" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="1200" height="630" fill="url(#backgroundGradient)" />
      
      {/* Green highlight area */}
      <rect y="530" width="1200" height="100" fill="#006837" />
      
      {/* Logo and text centered in the image */}
      <g transform="translate(250, 230)">
        {/* App Icon - Rounded square with gradient (larger version) */}
        <rect x="0" y="0" width="150" height="150" rx="30" fill="url(#socialIconGradient)" />
        
        {/* Document icon with folded corner */}
        <path 
          d="M25 30 L85 30 L125 70 L125 120 L25 120 Z" 
          fill="white" 
        />
        <path 
          d="M85 30 L85 70 L125 70" 
          fill="#e6e6e6" 
          stroke="#00AEEF" 
          strokeWidth="1"
        />
        
        {/* Lines in document */}
        <line x1="70" y1="55" x2="100" y2="55" stroke="#00AEEF" strokeWidth="3" />
        <line x1="70" y1="70" x2="100" y2="70" stroke="#00AEEF" strokeWidth="3" />
        <line x1="70" y1="85" x2="100" y2="85" stroke="#00AEEF" strokeWidth="3" />
        <line x1="70" y1="100" x2="90" y2="100" stroke="#00AEEF" strokeWidth="2" />
        
        {/* Text logo - larger size */}
        <text x="180" y="85" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="bold" fill="#00AEEF">
          Gera
        </text>
        <text x="380" y="85" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="bold" fill="#1f2937">
          Recibo
        </text>
      </g>
      
      {/* Tagline */}
      <text x="600" y="400" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="normal" fill="#4b5563" textAnchor="middle">
        Gere recibos online de forma fácil e gratuita
      </text>
      
      {/* Features in bottom bar */}
      <text x="600" y="585" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="normal" fill="white" textAnchor="middle">
        Crie • Personalize • Exporte como PDF • 100% gratuito
      </text>
    </svg>
  );
};

export default Logo;
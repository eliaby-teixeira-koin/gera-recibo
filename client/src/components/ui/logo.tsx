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
      
      {/* Document icon with folded corner - menor e com mais padding */}
      <path 
        d="M20 20 L40 20 L47 27 L47 50 L20 50 Z" 
        fill="white" 
      />
      <path 
        d="M40 20 L40 27 L47 27" 
        fill="#e6e6e6" 
        stroke="#00AEEF" 
        strokeWidth="0.5"
      />
      
      {/* Lines in document */}
      <line x1="23" y1="30" x2="44" y2="30" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="23" y1="35" x2="44" y2="35" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="23" y1="40" x2="44" y2="40" stroke="#00AEEF" strokeWidth="1.5" />
      <line x1="23" y1="45" x2="36" y2="45" stroke="#00AEEF" strokeWidth="1" />
      
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
        
        {/* Document icon with folded corner - menor e com mais padding */}
        <path 
          d="M35 35 L85 35 L115 65 L115 115 L35 115 Z" 
          fill="white" 
        />
        <path 
          d="M85 35 L85 65 L115 65" 
          fill="#e6e6e6" 
          stroke="#00AEEF" 
          strokeWidth="1"
        />
        
        {/* Lines in document */}
        <line x1="45" y1="75" x2="105" y2="75" stroke="#00AEEF" strokeWidth="3" />
        <line x1="45" y1="85" x2="105" y2="85" stroke="#00AEEF" strokeWidth="3" />
        <line x1="45" y1="95" x2="105" y2="95" stroke="#00AEEF" strokeWidth="3" />
        <line x1="45" y1="105" x2="80" y2="105" stroke="#00AEEF" strokeWidth="2" />
        
        {/* Text logo - larger size */}
        <text x="180" y="85" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="bold" fill="#00AEEF">
          Gera
        </text>
        <text x="380" y="85" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="bold" fill="#1f2937">
          Recibo
        </text>
      </g>
      
      {/* Tagline - com mais espaço em relação ao logotipo */}
      <text x="600" y="440" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="normal" fill="#4b5563" textAnchor="middle">
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
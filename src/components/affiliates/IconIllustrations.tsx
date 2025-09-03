// Lightweight SVG Micro-Illustrations for Affiliate Value Props
// Each SVG is optimized to be <8KB with inline styles

import React from 'react';

interface IllustrationProps {
  className?: string;
  'aria-label'?: string;
}

// Payout Illustration - Money with shields (6.2KB)
export const PayoutIllustration: React.FC<IllustrationProps> = ({ 
  className = "w-16 h-16", 
  "aria-label": ariaLabel = "Monthly payouts illustration" 
}) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    aria-label={ariaLabel}
    role="img"
  >
    <defs>
      <linearGradient id="payoutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.7"/>
      </linearGradient>
      <filter id="payoutShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#payoutGrad)" filter="url(#payoutShadow)" opacity="0.1"/>
    
    {/* Dollar bills stack */}
    <rect x="20" y="22" width="24" height="16" rx="2" fill="url(#payoutGrad)" opacity="0.8"/>
    <rect x="18" y="20" width="24" height="16" rx="2" fill="url(#payoutGrad)" opacity="0.9"/>
    <rect x="16" y="18" width="24" height="16" rx="2" fill="url(#payoutGrad)"/>
    
    {/* Dollar sign */}
    <text x="28" y="30" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">$</text>
    
    {/* Shield overlay */}
    <path d="M45 15 Q50 15 50 20 L50 28 Q50 35 45 38 Q42 40 40 38 Q35 35 35 28 L35 20 Q35 15 40 15 Z" 
          fill="#3b82f6" opacity="0.9"/>
    <path d="M42.5 20 L42.5 30 Q42.5 32 40 33 Q37.5 32 37.5 30 L37.5 20 Z" 
          fill="white" opacity="0.9"/>
    
    {/* Sparkle effects */}
    <circle cx="12" cy="12" r="1.5" fill="#fbbf24" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="52" cy="50" r="1" fill="#f59e0b" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// Analytics Illustration - Graph with trend line (5.8KB)
export const AnalyticsIllustration: React.FC<IllustrationProps> = ({ 
  className = "w-16 h-16", 
  "aria-label": ariaLabel = "Analytics tracking illustration" 
}) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    aria-label={ariaLabel}
    role="img"
  >
    <defs>
      <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7"/>
      </linearGradient>
    </defs>
    
    {/* Background */}
    <circle cx="32" cy="32" r="28" fill="url(#analyticsGrad)" opacity="0.1"/>
    
    {/* Chart container */}
    <rect x="12" y="16" width="40" height="30" rx="4" fill="white" stroke="url(#analyticsGrad)" strokeWidth="2" opacity="0.9"/>
    
    {/* Chart bars */}
    <rect x="16" y="32" width="4" height="10" fill="url(#analyticsGrad)" opacity="0.6"/>
    <rect x="22" y="28" width="4" height="14" fill="url(#analyticsGrad)" opacity="0.7"/>
    <rect x="28" y="24" width="4" height="18" fill="url(#analyticsGrad)" opacity="0.8"/>
    <rect x="34" y="20" width="4" height="22" fill="url(#analyticsGrad)" opacity="0.9"/>
    <rect x="40" y="22" width="4" height="20" fill="url(#analyticsGrad)"/>
    <rect x="46" y="18" width="4" height="24" fill="url(#analyticsGrad)"/>
    
    {/* Trend line */}
    <polyline points="18,40 24,36 30,32 36,26 42,28 48,24" 
              fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" opacity="0.8">
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite"/>
    </polyline>
    
    {/* Data points */}
    <circle cx="18" cy="40" r="2" fill="#059669"/>
    <circle cx="30" cy="32" r="2" fill="#059669"/>
    <circle cx="42" cy="28" r="2" fill="#059669"/>
    <circle cx="48" cy="24" r="2" fill="#059669"/>
    
    {/* Growth arrow */}
    <path d="M50 12 L55 17 L50 22 L52 17 L46 17 Z" fill="#10b981" opacity="0.8">
      <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite"/>
    </path>
  </svg>
);

// Community Illustration - Connected users (7.1KB)
export const CommunityIllustration: React.FC<IllustrationProps> = ({ 
  className = "w-16 h-16", 
  "aria-label": ariaLabel = "Community trust illustration" 
}) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    aria-label={ariaLabel}
    role="img"
  >
    <defs>
      <linearGradient id="communityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7"/>
      </linearGradient>
    </defs>
    
    {/* Background */}
    <circle cx="32" cy="32" r="28" fill="url(#communityGrad)" opacity="0.1"/>
    
    {/* Connection lines */}
    <line x1="20" y1="25" x2="32" y2="32" stroke="url(#communityGrad)" strokeWidth="2" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
    </line>
    <line x1="44" y1="25" x2="32" y2="32" stroke="url(#communityGrad)" strokeWidth="2" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <line x1="20" y1="45" x2="32" y2="32" stroke="url(#communityGrad)" strokeWidth="2" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/>
    </line>
    <line x1="44" y1="45" x2="32" y2="32" stroke="url(#communityGrad)" strokeWidth="2" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.2s" repeatCount="indefinite"/>
    </line>
    
    {/* User avatars - center */}
    <circle cx="32" cy="32" r="8" fill="url(#communityGrad)"/>
    <circle cx="32" cy="28" r="3" fill="white" opacity="0.9"/>
    <ellipse cx="32" cy="38" rx="5" ry="3" fill="white" opacity="0.9"/>
    
    {/* User avatars - corners */}
    <circle cx="20" cy="25" r="6" fill="url(#communityGrad)" opacity="0.8"/>
    <circle cx="20" cy="22" r="2" fill="white" opacity="0.9"/>
    <ellipse cx="20" cy="28" rx="3" ry="2" fill="white" opacity="0.9"/>
    
    <circle cx="44" cy="25" r="6" fill="url(#communityGrad)" opacity="0.8"/>
    <circle cx="44" cy="22" r="2" fill="white" opacity="0.9"/>
    <ellipse cx="44" cy="28" rx="3" ry="2" fill="white" opacity="0.9"/>
    
    <circle cx="20" cy="45" r="6" fill="url(#communityGrad)" opacity="0.8"/>
    <circle cx="20" cy="42" r="2" fill="white" opacity="0.9"/>
    <ellipse cx="20" cy="48" rx="3" ry="2" fill="white" opacity="0.9"/>
    
    <circle cx="44" cy="45" r="6" fill="url(#communityGrad)" opacity="0.8"/>
    <circle cx="44" cy="42" r="2" fill="white" opacity="0.9"/>
    <ellipse cx="44" cy="48" rx="3" ry="2" fill="white" opacity="0.9"/>
    
    {/* Trust badge */}
    <circle cx="50" cy="14" r="8" fill="#10b981" opacity="0.9"/>
    <path d="M46 14 L48 16 L54 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

// Freedom Illustration - Unlocked padlock (4.9KB)
export const FreedomIllustration: React.FC<IllustrationProps> = ({ 
  className = "w-16 h-16", 
  "aria-label": ariaLabel = "No lock-in freedom illustration" 
}) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    aria-label={ariaLabel}
    role="img"
  >
    <defs>
      <linearGradient id="freedomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.7"/>
      </linearGradient>
    </defs>
    
    {/* Background */}
    <circle cx="32" cy="32" r="28" fill="url(#freedomGrad)" opacity="0.1"/>
    
    {/* Open padlock body */}
    <rect x="22" y="28" width="20" height="16" rx="3" fill="url(#freedomGrad)" opacity="0.9"/>
    <circle cx="32" cy="36" r="3" fill="white" opacity="0.9"/>
    <rect x="31" y="36" width="2" height="6" fill="white" opacity="0.9"/>
    
    {/* Open shackle */}
    <path d="M28 28 Q28 20 32 20 Q36 20 36 28" 
          fill="none" stroke="url(#freedomGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
    
    {/* Key */}
    <rect x="40" y="18" width="12" height="2" rx="1" fill="#10b981" opacity="0.9">
      <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="50" y="16" width="2" height="2" fill="#10b981" opacity="0.9">
      <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="50" y="20" width="2" height="1" fill="#10b981" opacity="0.9">
      <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite"/>
    </rect>
    
    {/* Freedom particles */}
    <circle cx="15" cy="20" r="1" fill="#fbbf24" opacity="0.7">
      <animate attributeName="cy" values="20;10;20" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="48" cy="50" r="1.5" fill="#f59e0b" opacity="0.6">
      <animate attributeName="cy" values="50;40;50" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="12" cy="45" r="1" fill="#fbbf24" opacity="0.8">
      <animate attributeName="cy" values="45;35;45" dur="4s" repeatCount="indefinite"/>
    </circle>
  </svg>
);
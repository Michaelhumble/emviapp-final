import React from 'react';

interface CredibilityRibbonProps {
  className?: string;
}

const CredibilityRibbon: React.FC<CredibilityRibbonProps> = ({ className = '' }) => {
  return (
    <div className={`container mx-auto ${className}`}>
      <div className="hidden sm:flex items-center justify-center text-muted-foreground text-sm py-2">
        <span className="whitespace-nowrap">Trusted by 12,000+ jobs</span>
        <span className="mx-2">•</span>
        <span className="whitespace-nowrap">10,000+ artists</span>
        <span className="mx-2">•</span>
        <span className="whitespace-nowrap">98 new jobs this week</span>
      </div>
      <div className="sm:hidden flex items-center justify-center text-muted-foreground text-xs py-2">
        <span>Trusted by thousands in beauty</span>
      </div>
    </div>
  );
};

export default CredibilityRibbon;

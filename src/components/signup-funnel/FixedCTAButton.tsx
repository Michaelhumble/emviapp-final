import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useFunnelTranslation } from '@/hooks/useFunnelTranslation';

interface FixedCTAButtonProps {
  className?: string;
}

const FixedCTAButton: React.FC<FixedCTAButtonProps> = ({ className = "" }) => {
  const { t, currentLanguage } = useFunnelTranslation();

  const handleClick = () => {
    // Track button click
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'click', {
        event_category: 'Fixed CTA Button',
        event_label: `Language: ${currentLanguage}`,
        value: 1
      });
    }
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto ${className}`}>
      <Link to="/signup" onClick={handleClick}>
        <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] group">
          <span className="mr-2">{t.smartBanner.ctaButton}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
};

export default FixedCTAButton;
import React, { useState, useEffect } from 'react';
import { X, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shouldShowReturnVisitor, markReturnVisitorShown } from '@/utils/signupFunnelTracking';
import { useReturnVisitor, useMobileModal } from '@/hooks/useSignupFunnel';
import { Link } from 'react-router-dom';
import { useFunnelTranslation } from '@/hooks/useFunnelTranslation';
import { setLanguagePreference } from '@/utils/languagePreference';
import SocialProofSection from './SocialProofSection';

interface ReturnVisitorModalProps {
  enabled?: boolean;
}

const ReturnVisitorModal: React.FC<ReturnVisitorModalProps> = ({ enabled = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLanguageToggle, setShowLanguageToggle] = useState(false);
  const { t, currentLanguage } = useFunnelTranslation();

  const handleReturnVisitor = () => {
    console.log('🔍 ReturnVisitorModal: Checking if should show...');
    if (shouldShowReturnVisitor()) {
      console.log('✅ ReturnVisitorModal: Should show, making visible');
      setIsVisible(true);
      setIsAnimating(true);
      markReturnVisitorShown();
    } else {
      console.log('❌ ReturnVisitorModal: Should NOT show');
    }
  };

  const { hasTriggered } = useReturnVisitor(handleReturnVisitor, 5000);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleSignUp = () => {
    // Track button click
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'click', {
        event_category: 'Return Visitor Modal',
        event_label: `Language: ${currentLanguage}`,
        value: 1
      });
    }
    handleClose();
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'vi' : 'en';
    setLanguagePreference(newLang);
    setShowLanguageToggle(false);
    window.location.reload();
  };

  // Manage mobile modal behavior
  useMobileModal(isVisible);

  // Auto-hide after 10 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 p-4 pointer-events-none">
      {/* Modal */}
      <div 
        className={`
          relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
          transform transition-all duration-300 ease-out pointer-events-auto
          ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'}
        `}
      >
        {/* Language toggle */}
        <button
          onClick={() => setShowLanguageToggle(!showLanguageToggle)}
          className="absolute top-2 left-2 w-6 h-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Change language"
        >
          <Globe className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        </button>

        {showLanguageToggle && (
          <div className="absolute top-10 left-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-10">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium w-full text-left"
            >
              {currentLanguage === 'en' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}
            </button>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-6 h-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Content */}
        <div className="p-4 pt-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {t.returnVisitor.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.returnVisitor.subtitle}
              </p>
            </div>
          </div>

          {/* Quick benefits */}
          <div className="space-y-1.5 mb-4">
            {t.returnVisitor.benefits.map((benefit, index) => (
              <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                {benefit}
              </div>
            ))}
          </div>

          {/* Action button */}
          <Link to="/signup" onClick={handleSignUp} className="block">
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              {t.returnVisitor.ctaButton}
            </Button>
          </Link>

          {/* Urgency indicator */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{t.returnVisitor.onlineIndicator}</span>
            </div>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-pink-500 transition-all duration-[10000ms] ease-linear"
            style={{ 
              width: isAnimating ? '100%' : '0%',
              transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)'
            }}
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pink-500/10 rounded-xl -z-10 blur-xl" />
      </div>
    </div>
  );
};

export default ReturnVisitorModal;
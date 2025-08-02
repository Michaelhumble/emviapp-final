import React, { useState, useEffect } from 'react';
import { X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shouldShowBanner, markBannerDismissed, isMobileDevice } from '@/utils/signupFunnelTracking';
import { Link } from 'react-router-dom';
import { useFunnelTranslation, detectUserLanguage } from '@/hooks/useFunnelTranslation';
import { setLanguagePreference, getLanguagePreference } from '@/utils/languagePreference';
import CountdownTimer from './CountdownTimer';
import SocialProofSection from './SocialProofSection';

interface SmartBannerProps {
  onSignUpClick?: () => void;
}

const SmartBanner: React.FC<SmartBannerProps> = ({ onSignUpClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLanguageToggle, setShowLanguageToggle] = useState(false);
  const isMobile = isMobileDevice();
  const { t, isVietnamese, currentLanguage } = useFunnelTranslation();

  // Auto-detect and set language on first visit
  useEffect(() => {
    const hasSetLanguage = localStorage.getItem('emvi_language_detected');
    if (!hasSetLanguage) {
      const detectedLang = detectUserLanguage();
      if (detectedLang !== getLanguagePreference()) {
        setLanguagePreference(detectedLang);
        localStorage.setItem('emvi_language_detected', 'true');
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    console.log('🔍 SmartBanner: Checking if banner should show...');
    // Check if banner should be shown
    if (shouldShowBanner()) {
      console.log('✅ SmartBanner: Banner should show, making visible');
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      console.log('❌ SmartBanner: Banner should NOT show');
    }
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      markBannerDismissed();
    }, 300); // Match animation duration
  };

  const handleSignUpClick = () => {
    // Track button click
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'click', {
        event_category: 'Smart Banner',
        event_label: `Language: ${currentLanguage}`,
        value: 1
      });
    }
    
    if (onSignUpClick) {
      onSignUpClick();
    }
    handleDismiss();
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'vi' : 'en';
    setLanguagePreference(newLang);
    setShowLanguageToggle(false);
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleDismiss}
        />
      )}
      
      {/* Banner */}
      <div 
        className={`
          fixed ${isMobile ? 'bottom-4 left-4 right-4' : 'bottom-6 left-6 right-6 max-w-md mx-auto'} 
          z-50 transform transition-all duration-300 ease-out
          ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'}
        `}
      >
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm relative">
          {/* Language toggle */}
          <button
            onClick={() => setShowLanguageToggle(!showLanguageToggle)}
            className="absolute -top-2 -left-2 w-6 h-6 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
            aria-label="Change language"
          >
            <Globe className="w-3 h-3" />
          </button>

          {showLanguageToggle && (
            <div className="absolute -top-12 left-0 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10">
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 hover:bg-gray-100 transition-colors text-sm font-medium w-full text-left"
              >
                {currentLanguage === 'en' ? '🇻🇳 Tiếng Việt' : '🇺🇸 English'}
              </button>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 mb-1">
                  {t.smartBanner.title}
                </p>
                <p className="text-xs text-white/75">
                  {t.smartBanner.subtitle}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Link to="/signup" onClick={handleSignUpClick}>
                  <Button 
                    size="sm"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {t.smartBanner.ctaButton}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mt-4">
              <CountdownTimer className="text-xs" />
            </div>

            {/* Social Proof */}
            <div className="mt-3">
              <SocialProofSection variant="compact" />
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur-xl -z-10" />
        </div>
      </div>
    </>
  );
};

export default SmartBanner;
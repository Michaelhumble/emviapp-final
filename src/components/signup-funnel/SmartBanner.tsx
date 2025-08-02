import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shouldShowBanner, markBannerDismissed, isMobileDevice } from '@/utils/signupFunnelTracking';
import { Link } from 'react-router-dom';

interface SmartBannerProps {
  onSignUpClick?: () => void;
}

const SmartBanner: React.FC<SmartBannerProps> = ({ onSignUpClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    // Check if banner should be shown
    if (shouldShowBanner()) {
      setIsVisible(true);
      setIsAnimating(true);
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
    if (onSignUpClick) {
      onSignUpClick();
    }
    handleDismiss();
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
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
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
                  Ready to grow your beauty business?
                </p>
                <p className="text-xs text-white/75">
                  Join 1,200+ pros — 100% FREE to start!
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Link to="/signup" onClick={handleSignUpClick}>
                  <Button 
                    size="sm"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Sign Up FREE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot}
                    className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  />
                ))}
              </div>
              <p className="text-xs text-white/60">
                Limited time offer
              </p>
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
import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shouldShowExitIntent, markExitIntentShown } from '@/utils/signupFunnelTracking';
import { useExitIntent, useMobileModal, useModalAccessibility } from '@/hooks/useSignupFunnel';
import { Link } from 'react-router-dom';

interface ExitIntentModalProps {
  enabled?: boolean;
  onSignUpClick?: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ enabled = true, onSignUpClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExitIntent = () => {
    if (shouldShowExitIntent()) {
      setIsVisible(true);
      setIsAnimating(true);
      markExitIntentShown();
    }
  };

  const { hasTriggered, reset } = useExitIntent({
    onExitIntent: handleExitIntent,
    enabled: enabled && !isVisible,
    sensitivity: 50,
    delay: 3000
  });

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      reset();
    }, 300);
  };

  const handleSignUp = () => {
    if (onSignUpClick) {
      onSignUpClick();
    }
    handleClose();
  };

  const handleContinueBrowsing = () => {
    handleClose();
  };

  // Manage mobile modal behavior
  useMobileModal(isVisible);
  useModalAccessibility(isVisible, handleClose);

  // Auto-focus management
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const modal = document.querySelector('[role="dialog"]') as HTMLElement;
        const firstButton = modal?.querySelector('button') as HTMLElement;
        firstButton?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        className={`
          relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl 
          transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto
          ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Content */}
        <div className="p-6 pt-12">
          {/* Header with icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            
            <h2 id="exit-intent-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Wait! Don't miss out on getting booked 3x faster
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Join 1,200+ pros — Your first job post is <span className="font-semibold text-primary">FREE</span>
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {[
              "Get 3x more bookings with our smart matching",
              "Professional profile showcase",
              "Secure payment processing",
              "Client management tools"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link to="/signup" onClick={handleSignUp} className="block">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Get My Spot FREE →
              </Button>
            </Link>
            
            <button
              onClick={handleContinueBrowsing}
              className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors duration-200"
            >
              No thanks, I want to browse anyway
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border border-white dark:border-gray-900" />
                ))}
              </div>
              <span>1,200+ beauty professionals already joined</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-t-2xl" />
      </div>
    </div>
  );
};

export default ExitIntentModal;
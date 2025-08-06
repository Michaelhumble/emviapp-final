import React from 'react';
import { Badge } from '@/components/ui/badge';
import SmartCTAButton from './SmartCTAButton';

interface FOMOCTAWrapperProps {
  children?: React.ReactNode;
  fomoText?: string;
  trustIndicator?: string;
  primaryText: string;
  primaryRoute: string;
  intent: 'signup' | 'post-job' | 'browse' | 'general';
  showUrgency?: boolean;
  showTrustBadge?: boolean;
}

/**
 * FOMO-optimized CTA wrapper with urgency indicators and trust signals
 * Wraps SmartCTAButton with conversion-focused messaging
 */
const FOMOCTAWrapper: React.FC<FOMOCTAWrapperProps> = ({
  children,
  fomoText = "🔥 12,000+ jobs posted | 98 new jobs this week",
  trustIndicator = "Trusted by America's top nail salons",
  primaryText,
  primaryRoute,
  intent,
  showUrgency = true,
  showTrustBadge = true
}) => {
  return (
    <div className="text-center space-y-6">
      {/* FOMO/Urgency Banner */}
      {showUrgency && (
        <div className="animate-fade-in">
          <Badge 
            variant="outline" 
            className="bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium"
          >
            {fomoText}
          </Badge>
        </div>
      )}

      {/* Main CTA */}
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <SmartCTAButton
          primaryText={primaryText}
          primaryRoute={primaryRoute}
          intent={intent}
          size="lg"
          className="w-full justify-center"
        />
      </div>

      {/* Trust Indicator */}
      {showTrustBadge && (
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground font-medium">
            {trustIndicator}
          </p>
        </div>
      )}

      {/* Additional content */}
      {children && (
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default FOMOCTAWrapper;
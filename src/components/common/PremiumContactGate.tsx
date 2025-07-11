import React from 'react';
import { Lock, Sparkles, Zap, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import { Button } from '@/components/ui/button';

interface PremiumContactGateProps {
  children?: React.ReactNode;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  className?: string;
}

const PremiumContactGate: React.FC<PremiumContactGateProps> = ({
  children,
  contactName,
  contactPhone,
  contactEmail,
  className = ""
}) => {
  const { isSignedIn } = useAuth();

  // 🔍 DEBUG: Log contact info props to verify they're being passed
  console.log('🔍 [PREMIUM-CONTACT-GATE] Props received:', {
    isSignedIn,
    contactName,
    contactPhone, 
    contactEmail,
    hasChildren: !!children
  });

  // If user is signed in, show contact info directly
  if (isSignedIn) {
    return (
      <div className={className}>
        {children || (
          <div className="space-y-2">
            {contactName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Contact:</span>
                <span>{contactName}</span>
              </div>
            )}
            {contactPhone && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Phone:</span>
                <span>{contactPhone}</span>
              </div>
            )}
            {contactEmail && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Email:</span>
                <span>{contactEmail}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Premium gating UI for non-signed-in users
  return (
    <div className={`relative ${className}`}>
      {/* Blurred Background Content */}
      <div className="relative">
        <div className="blur-sm select-none pointer-events-none">
          {children || (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Contact:</span>
                <span>████ ██████</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Phone:</span>
                <span>(███) ███-████</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Email:</span>
                <span>████@██████.com</span>
              </div>
            </div>
          )}
        </div>

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 via-purple-600/85 to-blue-600/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-6 text-white">
          {/* Premium Icon */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full blur-md opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Premium Message */}
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              Unlock Contact Details
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </h3>
            
            <p className="text-sm opacity-95 max-w-xs">
              Sign up or log in to see phone and email and connect with top salons instantly!
            </p>

            {/* Premium Benefits */}
            <div className="flex flex-col sm:flex-row gap-2 text-xs opacity-90 justify-center">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-1">
                <UserPlus className="w-3 h-3 text-yellow-300" />
                <span>Direct Contact</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Premium Jobs</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <AuthAction
            customTitle="Get Instant Access"
            onAction={() => true}
            fallbackContent={
              <Button 
                size="lg" 
                className="mt-4 bg-white hover:bg-gray-100 text-purple-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign Up & View Contact Info
                </span>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumContactGate;
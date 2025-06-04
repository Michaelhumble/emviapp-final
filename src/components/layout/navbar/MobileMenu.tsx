
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserRole } from '@/hooks/useUserRole';
import { cn } from '@/lib/utils';
import CustomerProfileSummary from '@/components/customer/mobile/CustomerProfileSummary';
import ReferralTeaser from '@/components/customer/mobile/ReferralTeaser';
import MysteryRewardClaim from '@/components/customer/mobile/MysteryRewardClaim';
import BeautyJourneyShare from '@/components/customer/mobile/BeautyJourneyShare';
import FeatureSuggestionButton from '@/components/customer/mobile/FeatureSuggestionButton';
import SocialProofStats from '@/components/customer/mobile/SocialProofStats';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const { userRole } = useUserRole(user?.id);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const isCustomer = userRole === 'customer';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col">
          {/* Customer Profile Summary - Only for customers */}
          {isCustomer && <CustomerProfileSummary />}

          {/* Business Posting Actions - Only for non-customers */}
          {!isCustomer && (
            <div className="px-4 py-2 border-b border-gray-100">
              <Button
                variant="outline"
                className="w-full mb-2 justify-start"
                onClick={() => handleNavigation('/post-job')}
              >
                Post a Job
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/sell-salon')}
              >
                Post Your Salon
              </Button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="py-2">
            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/profile')}
            >
              Profile
            </button>
            
            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/dashboard')}
            >
              Dashboard
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/artists')}
            >
              Find Artists
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/jobs')}
            >
              Browse Jobs
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/salons')}
            >
              Salons for Sale
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/community')}
            >
              Community
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/about')}
            >
              About
            </button>

            <button
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </button>
          </div>

          {/* Customer Engagement Sections - Only for customers */}
          {isCustomer && (
            <>
              <ReferralTeaser />
              <MysteryRewardClaim />
              <BeautyJourneyShare />
              <FeatureSuggestionButton />
              <SocialProofStats />
            </>
          )}

          {/* Footer Actions */}
          <div className="mt-auto">
            <div className="px-4 py-3 border-t border-gray-100">
              <button
                className="w-full text-left py-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => {/* Language toggle logic */}}
              >
                Language
              </button>
              
              <button
                className="w-full text-left py-2 text-red-600 hover:text-red-800 transition-colors"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>

            {/* Inspired by Sunshine footer - Always visible */}
            <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-gray-100">
              <p className="text-center text-xs text-gray-600 font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

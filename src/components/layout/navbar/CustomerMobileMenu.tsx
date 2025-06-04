
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Home, Briefcase, Store, Scissors, Users, Info, Mail, Globe } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Separator } from '@/components/ui/separator';
import CustomerProfileSummary from '@/components/customer/mobile/CustomerProfileSummary';
import ReferralTeaser from '@/components/customer/mobile/ReferralTeaser';
import MysteryRewardClaim from '@/components/customer/mobile/MysteryRewardClaim';
import BeautyJourneyShare from '@/components/customer/mobile/BeautyJourneyShare';
import FeatureSuggestionButton from '@/components/customer/mobile/FeatureSuggestionButton';
import SocialProofStats from '@/components/customer/mobile/SocialProofStats';

interface CustomerMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerMobileMenu = ({ isOpen, onClose }: CustomerMobileMenuProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { t, currentLanguage, setLanguage } = useTranslation();

  console.log('CustomerMobileMenu rendered for customer user');

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('Beauty Hub')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Customer Viral Engagement Sections */}
          <div className="flex-1 overflow-y-auto">
            {/* 1. Profile Summary */}
            <CustomerProfileSummary />

            {/* 2. Referral Teaser */}
            <ReferralTeaser />

            {/* 3. Mystery Reward Claim */}
            <MysteryRewardClaim />

            {/* 4. Beauty Journey Share */}
            <BeautyJourneyShare />

            {/* 5. Feature Suggestion Button */}
            <FeatureSuggestionButton />

            {/* 6. Social Proof Stats */}
            <SocialProofStats />

            <Separator className="my-4" />

            {/* 7. Standard Navigation Links */}
            <div className="px-4 space-y-2">
              <button
                onClick={() => handleNavigate('/dashboard')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg transition-all duration-200"
              >
                <User className="h-5 w-5 mr-3 text-purple-600" />
                <span className="font-medium">{t('Dashboard')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-lg transition-all duration-200"
              >
                <Home className="h-5 w-5 mr-3 text-blue-600" />
                <span className="font-medium">{t('Home')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/artists')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-lg transition-all duration-200"
              >
                <Scissors className="h-5 w-5 mr-3 text-pink-600" />
                <span className="font-medium">{t('Artists')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/salons')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 rounded-lg transition-all duration-200"
              >
                <Store className="h-5 w-5 mr-3 text-emerald-600" />
                <span className="font-medium">{t('Salons')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/jobs')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-lg transition-all duration-200"
              >
                <Briefcase className="h-5 w-5 mr-3 text-amber-600" />
                <span className="font-medium">{t('Jobs')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/community')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all duration-200"
              >
                <Users className="h-5 w-5 mr-3 text-indigo-600" />
                <span className="font-medium">{t('Community')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/about')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 rounded-lg transition-all duration-200"
              >
                <Info className="h-5 w-5 mr-3 text-slate-600" />
                <span className="font-medium">{t('About')}</span>
              </button>

              <button
                onClick={() => handleNavigate('/contact')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 rounded-lg transition-all duration-200"
              >
                <Mail className="h-5 w-5 mr-3 text-teal-600" />
                <span className="font-medium">{t('Contact')}</span>
              </button>
            </div>

            <Separator className="my-4" />

            {/* Settings & Actions */}
            <div className="px-4 space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 rounded-lg transition-all duration-200"
              >
                <Globe className="h-5 w-5 mr-3 text-violet-600" />
                <span className="font-medium">
                  {currentLanguage === 'en' ? 'Tiếng Việt' : 'English'}
                </span>
              </button>

              <button
                onClick={() => handleNavigate('/settings')}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 rounded-lg transition-all duration-200"
              >
                <Settings className="h-5 w-5 mr-3 text-gray-600" />
                <span className="font-medium">{t('Settings')}</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center p-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 text-red-600 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="font-medium">{t('Sign Out')}</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 mt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                {t('Inspired by Sunshine')} ☀️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMobileMenu;

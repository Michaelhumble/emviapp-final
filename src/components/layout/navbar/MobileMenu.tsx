
import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut, Globe, Briefcase, Building, Copy, Heart, Star, Gift, Trophy } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { useReferralStatsDb } from '@/hooks/useReferralStatsDb';
import { toast } from 'sonner';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut, userRole, userProfile } = useAuth();
  const { isVietnamese, toggleLanguage } = useTranslation();
  const { creditsEarned, invitedCount } = useReferralStatsDb();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Check if user should see job posting options
  const canPostJobs = userRole && ['admin', 'salon', 'owner', 'manager'].includes(userRole);
  const isCustomer = userRole === 'customer';

  // Generate referral link for customers
  const referralLink = user && userProfile?.referral_code 
    ? `https://emviapp.com/join?ref=${userProfile.referral_code}`
    : 'https://emviapp.com/signup';

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied! Share it to earn credits! 🎉');
    setTimeout(() => setCopied(false), 3000);
  };

  // Calculate progress to next milestone
  const nextMilestone = invitedCount < 3 ? 3 : invitedCount < 5 ? 5 : invitedCount < 10 ? 10 : 25;
  const progressPercentage = Math.min((invitedCount / nextMilestone) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <div className="flex h-full flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Customer-Specific Referral Banner */}
          {isCustomer && user && (
            <div className="p-4 border-b flex-shrink-0" style={{ backgroundColor: '#F6F6F7' }}>
              {/* FOMO Urgency Banner */}
              <div className="mb-4 p-3 rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
                <div className="flex items-center mb-2">
                  <Trophy className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm font-bold text-red-700">LIMITED-TIME REWARD BOOST!</span>
                </div>
                <p className="text-xs text-red-600">
                  Invite friends now to earn DOUBLE credits this week! ⚡
                </p>
              </div>

              {/* Invite Friends & Earn Credits Banner */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Gift className="h-5 w-5 mr-2" style={{ color: '#9A7B69' }} />
                  <h3 className="font-semibold text-gray-900">Invite Friends & Earn Credits</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  Share EmviApp and earn credits when friends join! <Heart className="h-3 w-3 inline text-red-500" />
                </p>
                
                {/* Referral Link */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-xs flex-1 truncate">
                    {referralLink}
                  </div>
                  <button 
                    onClick={handleCopyReferralLink}
                    className="px-3 py-2 text-xs font-medium rounded-md transition-colors"
                    style={{ 
                      backgroundColor: copied ? '#F6F6F7' : '#9A7B69',
                      color: copied ? '#9A7B69' : 'white',
                      border: copied ? '1px solid #9A7B69' : 'none'
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1 inline" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Credits Display */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Credits Earned:</span>
                  <span className="font-bold" style={{ color: '#9A7B69' }}>
                    {creditsEarned} credits
                  </span>
                </div>
              </div>

              {/* Your Rewards Progress Bar */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 mr-2" style={{ color: '#9A7B69' }} />
                  <h4 className="font-medium text-gray-900">Your Rewards</h4>
                </div>
                
                <p className="text-xs text-gray-600 mb-3">
                  You're just a few invites away from VIP perks! 🌟
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: '#9A7B69',
                      width: `${progressPercentage}%` 
                    }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{invitedCount} referrals</span>
                  <span>Next reward: {nextMilestone}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Only show for authorized users */}
          {canPostJobs && (
            <div className="p-4 space-y-3 border-b flex-shrink-0">
              <Link
                to="/posting/job"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium text-sm"
              >
                <Briefcase className="h-4 w-4" />
                Post a Job
              </Link>
              
              <Link
                to="/posting/salon"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full border border-purple-600 text-purple-600 py-2.5 px-4 rounded-lg hover:bg-purple-50 transition-colors shadow-md font-medium text-sm"
              >
                <Building className="h-4 w-4" />
                Post Your Salon
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {isCustomer ? (
              <>
                <Link
                  to="/artists"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  Browse Artists
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full ml-auto">Discover</span>
                </Link>
                <Link
                  to="/salons"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Building className="h-5 w-5" />
                  Browse Salons
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-auto">Trusted</span>
                </Link>
                <Link
                  to="/favorites"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  Your Profile
                </Link>
                <Link
                  to="/support"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Support & Feedback
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/artists"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  Find Artists
                </Link>
                <Link
                  to="/jobs"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Briefcase className="h-5 w-5" />
                  Browse Jobs
                </Link>
                <Link
                  to="/salons"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Building className="h-5 w-5" />
                  Salons for Sale
                </Link>
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="border-t p-4 space-y-3 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="h-5 w-5 mr-3" />
              {isVietnamese ? 'English' : 'Tiếng Việt'}
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}

            <div className="text-center pt-2 pb-1">
              <p className="text-xs text-gray-500">Inspired by Sunshine ☀️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut, Globe, Briefcase, Building, Star, MessageSquare, Heart, Home, Settings, Wallet, Copy, Sparkles, Crown, Users, HelpCircle, Gift } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut, userRole, userProfile } = useAuth();
  const { isVietnamese, toggleLanguage } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Check if user should see job posting options (only for admin, salon, owner, manager)
  const canPostJobs = userRole && ['admin', 'salon', 'owner', 'manager'].includes(userRole);
  const isCustomer = userRole === 'customer';

  // Customer specific data
  const customerCredits = userProfile?.credits || 0;
  const customerTier = customerCredits >= 500 ? 'VIP' : customerCredits >= 100 ? 'Premium' : 'Starter';
  const progressToNext = customerTier === 'Starter' ? (customerCredits / 100) * 100 : customerTier === 'Premium' ? ((customerCredits - 100) / 400) * 100 : 100;
  
  const handleCopyReferralLink = () => {
    const referralLink = `https://emvi.app/join?ref=${user?.id?.substring(0, 8)}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied! Share with friends to earn double credits! 🎉');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-white via-purple-50/30 to-white shadow-2xl overflow-y-auto">
        <div className="flex h-full flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-100 flex-shrink-0">
            <h2 className="text-lg font-semibold font-playfair text-purple-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Customer Profile Section */}
          {isCustomer && user && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 flex-shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-purple-200">
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                    {userProfile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Welcome back, Beauty Lover! ✨
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                      {customerTier}
                    </span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span className="text-xs font-medium text-gray-600">{customerCredits} credits</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Progress to {customerTier === 'Starter' ? 'Premium' : 'VIP'}</span>
                  <span className="text-purple-600 font-medium">{Math.round(progressToNext)}%</span>
                </div>
                <Progress value={progressToNext} className="h-2 bg-purple-100" />
              </div>

              {/* Copy Referral Link */}
              <Button
                onClick={handleCopyReferralLink}
                variant="outline"
                size="sm"
                className="w-full mt-3 border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <Copy className="h-3 w-3 mr-2" />
                {copied ? 'Copied!' : 'Copy Invite Link'}
              </Button>
            </div>
          )}

          {/* FOMO Referral Banner for Customers */}
          {isCustomer && (
            <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white relative overflow-hidden flex-shrink-0">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-bold">DOUBLE CREDITS EVENT!</span>
                </div>
                <p className="text-xs leading-relaxed mb-2">
                  Invite friends, earn DOUBLE credits! Limited time: 72 hours left! 🔥
                </p>
                <div className="text-xs opacity-90">
                  ⏰ Don't miss out on this exclusive opportunity!
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions for Customers */}
          {isCustomer && (
            <div className="p-4 space-y-2 border-b border-purple-100 flex-shrink-0">
              <Link
                to="/profile/edit"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors w-full"
              >
                <Settings className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Edit Profile</span>
              </Link>
              
              <Link
                to="/artists"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors w-full"
              >
                <Briefcase className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Book Appointment</span>
              </Link>
              
              <button
                onClick={() => {
                  // Navigate to rewards/wallet view
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
              >
                <Wallet className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">View Rewards</span>
              </button>
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

          {/* Main Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 text-purple-500" />
              {isCustomer ? 'Dashboard' : 'Home'}
            </Link>
            
            <Link
              to="/artists"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <User className="h-5 w-5 text-purple-500" />
              Browse Artists
            </Link>
            
            <Link
              to="/salons"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Building className="h-5 w-5 text-purple-500" />
              Browse Salons
            </Link>
            
            {!canPostJobs && (
              <Link
                to="/jobs"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Briefcase className="h-5 w-5 text-purple-500" />
                Browse Jobs
              </Link>
            )}

            {isCustomer && (
              <>
                <Link
                  to="/favorites"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5 text-purple-500" />
                  Favorites
                </Link>
                
                <Link
                  to="/messages"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Messages
                </Link>
              </>
            )}

            <Link
              to="/freelancers"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5 text-purple-500" />
              Community
            </Link>
            
            <Link
              to="/help"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <HelpCircle className="h-5 w-5 text-purple-500" />
              Help & Support
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-purple-100 p-4 space-y-3 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Globe className="h-5 w-5 mr-3 text-purple-500" />
              {isVietnamese ? 'English' : 'Tiếng Việt'}
            </button>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5 mr-3 text-purple-500" />
                  Your Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3 text-purple-500" />
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

            {/* Motivational Footer */}
            <div className="text-center pt-3 pb-1 space-y-1">
              <p className="text-xs text-gray-500 font-medium">Inspired by Sunshine ☀️</p>
              {isCustomer && (
                <p className="text-xs text-purple-600 leading-relaxed">
                  All core features are always free for you.<br />
                  Invite friends to unlock secret rewards! 🎁
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

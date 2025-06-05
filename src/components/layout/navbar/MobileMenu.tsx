
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { X, Home, Users, Building2, Heart, User, MessageSquare, Info, Mail, HelpCircle, LogOut, Globe, Copy, Check, Star, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getInitials } from '@/utils/userUtils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('English');

  if (!isOpen) return null;

  const userRole = userProfile?.role || 'customer';
  
  // Only show for customers
  if (userRole !== 'customer') return null;

  const credits = userProfile?.credits || 0;
  const referralCode = userProfile?.referral_code || 'EMVI2024';
  const referralLink = `https://emvi.app/join?ref=${referralCode}`;
  
  // Mock progress data
  const currentTier = 'Bronze';
  const nextTier = 'Silver';
  const progressToNext = 65;
  const referralsCount = 3;
  const nextMilestone = 5;

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleEditProfile = () => {
    onClose();
    navigate('/profile/edit');
  };

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'English' ? 'Tiếng Việt' : 'English';
    setLanguage(newLang);
    toast.success(`Language changed to ${newLang}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl animate-slide-in-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#FF7743] to-[#E85A4F] p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Profile Section */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12 border-2 border-white/30">
              <AvatarImage src={userProfile?.avatar_url} />
              <AvatarFallback className="bg-white/20 text-white font-semibold">
                {getInitials(userProfile?.full_name || user?.email || 'U')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{userProfile?.full_name || 'Welcome!'}</p>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Star className="h-3 w-3" />
                <span>{credits} Credits</span>
              </div>
            </div>
          </div>

          {/* FOMO Referral Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Referral Progress</span>
            </div>
            <Progress value={progressToNext} className="h-2 mb-2" indicatorClassName="bg-white" />
            <p className="text-xs opacity-90">
              {progressToNext}% to {nextTier} • {nextMilestone - referralsCount} more referrals needed
            </p>
          </div>
        </div>

        {/* Invite Friends CTA */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Invite Friends</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Earn Credits
            </Badge>
          </div>
          <Button 
            onClick={handleCopyReferralLink}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md"
            size="sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Invite Link
              </>
            )}
          </Button>
        </div>

        {/* Tier Tracker */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Current Tier: {currentTier}</span>
            <Badge variant="outline" className="border-[#FF7743] text-[#FF7743]">
              {referralsCount}/{nextMilestone}
            </Badge>
          </div>
          <Progress value={(referralsCount / nextMilestone) * 100} className="h-2 mb-1" />
          <p className="text-xs text-gray-600">
            {nextMilestone - referralsCount} more to unlock {nextTier} rewards
          </p>
        </div>

        {/* Navigation Menu */}
        <div className="py-2">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/dashboard/customer')}
            >
              <Home className="h-5 w-5 mr-3 text-gray-500" />
              Home
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/artists')}
            >
              <Users className="h-5 w-5 mr-3 text-gray-500" />
              Browse Artists
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/salons')}
            >
              <Building2 className="h-5 w-5 mr-3 text-gray-500" />
              Browse Salons
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/favorites')}
            >
              <Heart className="h-5 w-5 mr-3 text-gray-500" />
              Favorites
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={handleEditProfile}
            >
              <User className="h-5 w-5 mr-3 text-gray-500" />
              Your Profile (Edit)
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/community')}
            >
              <MessageSquare className="h-5 w-5 mr-3 text-gray-500" />
              Community
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/about')}
            >
              <Info className="h-5 w-5 mr-3 text-gray-500" />
              About
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/contact')}
            >
              <Mail className="h-5 w-5 mr-3 text-gray-500" />
              Contact
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => handleNavigation('/support')}
            >
              <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
              Support/Feedback
            </Button>
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t bg-gray-50">
          <Button
            variant="ghost"
            className="w-full justify-start px-0 py-2 text-left hover:bg-gray-100 mb-2"
            onClick={toggleLanguage}
          >
            <Globe className="h-4 w-4 mr-3 text-gray-500" />
            <span className="text-sm">{language}</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start px-0 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 mb-3"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm">Sign Out</span>
          </Button>

          <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
            Inspired by Sunshine <span className="text-yellow-500">☀️</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

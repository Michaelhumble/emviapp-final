import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, Star, Gift, LogOut, Heart, Home, Users, Scissors, Store, Briefcase, MessageCircle, HelpCircle, Copy, Globe, Settings, Crown, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { toast } from 'sonner';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Customer-specific mobile menu
  if (userRole === 'customer' || userProfile?.role === 'customer') {
    const credits = userProfile?.credits || 0;
    const tier = userProfile?.tier || 'Bronze';
    const progressToNext = Math.min(100, (credits % 100));
    const creditsToNext = 100 - progressToNext;

    const handleCopyReferralLink = () => {
      const referralLink = `${window.location.origin}/invite/${userProfile?.referral_code || user?.id?.substring(0, 8) || 'ref'}`;
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied! Share with friends to earn rewards! 🎉');
      setTimeout(() => setCopied(false), 3000);
    };

    const handleEditProfile = () => {
      onClose();
      navigate('/profile/edit');
    };

    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-30' : 'opacity-0'}`} onClick={onClose} />
        
        <div className={`absolute right-0 top-0 h-full w-[85vw] max-w-[400px] bg-gradient-to-br from-white to-purple-50/30 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
          
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <div className="text-2xl">💎</div>
              <span className="font-bold text-purple-800">EmviApp</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-purple-100">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sticky Profile Header */}
          <div className="sticky top-0 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-100 p-6 z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">{userProfile?.full_name || 'Beauty Lover'}</h3>
              <p className="text-sm text-gray-600 mb-3">{user?.email}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-yellow-700">{credits}</span>
                  <span className="text-yellow-600">credits</span>
                </div>
                <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4 text-purple-500" />
                  <span className="font-bold text-purple-700">{tier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* FOMO Referral Banner */}
          <div className="m-4 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-700">🔥 2X REWARDS!</span>
              </div>
              <Badge className="bg-red-500 text-white animate-bounce">LIMITED</Badge>
            </div>
            <p className="text-sm text-orange-700 mb-3">Double credits for every friend you invite! Ends soon!</p>
            
            <Button 
              onClick={handleCopyReferralLink}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? '✅ Copied!' : 'Invite Friends & Earn!'}
            </Button>

            {/* Tier Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress to next tier</span>
                <span>{progressToNext}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">
                <Target className="w-3 h-3 inline mr-1" />
                {creditsToNext} more credits to upgrade!
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 pb-4">
            <div className="space-y-1">
              <Link 
                to="/dashboard/customer" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-100 text-purple-700 font-semibold shadow-sm"
              >
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              
              <Link 
                to="/" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              
              <Link 
                to="/artists" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Users className="w-5 h-5" />
                Browse Artists
              </Link>
              
              <Link 
                to="/salons" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Scissors className="w-5 h-5" />
                Browse Salons
              </Link>
              
              <Link 
                to="/favorites" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Favorites
              </Link>
              
              <button 
                onClick={handleEditProfile}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
                Your Profile (edit)
              </button>
              
              <Link 
                to="/community" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Community
              </Link>
              
              <Link 
                to="/about" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Star className="w-5 h-5" />
                About
              </Link>
              
              <Link 
                to="/contact" 
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Contact
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-purple-100 p-4 space-y-3">
            <Button 
              onClick={signOut} 
              variant="destructive" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            
            <div className="flex items-center justify-center">
              <LanguageToggle minimal />
            </div>
            
            <div className="flex items-center justify-center text-xs text-orange-500 font-medium">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default menu for other roles (existing logic)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <p>Default menu for other roles</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

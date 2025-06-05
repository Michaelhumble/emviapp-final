import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Star, 
  Gift, 
  LogOut, 
  Heart, 
  Home, 
  Users, 
  Scissors, 
  Store, 
  Briefcase, 
  MessageCircle, 
  HelpCircle,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, userProfile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('en');

  if (!isOpen) return null;

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/invite/${userProfile?.referralCode || user?.id || 'welcome'}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success('Invite link copied! Share with friends to earn rewards 🎉');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditProfile = () => {
    onClose();
    navigate('/profile/edit');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
    toast.success(`Language switched to ${language === 'en' ? 'Vietnamese' : 'English'}`);
  };

  // Customer Menu Design
  if (userRole === 'customer') {
    const currentCredits = userProfile?.credits || 0;
    const nextTierCredits = 100;
    const progressPercent = Math.min(100, (currentCredits % nextTierCredits));
    const creditsToNext = nextTierCredits - (currentCredits % nextTierCredits);

    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
        
        <aside className="relative w-[85vw] max-w-[400px] h-full bg-white/95 backdrop-blur-md rounded-l-3xl flex flex-col overflow-hidden shadow-2xl border-l-4 border-purple-200">
          {/* Sticky Profile Header */}
          <div className="sticky top-0 bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-md p-6 border-b border-purple-100/50 z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg ring-4 ring-white/50">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              
              <div className="mt-3 text-center">
                <h3 className="font-bold text-lg text-gray-900">
                  Hey, {userProfile?.first_name || userProfile?.full_name?.split(' ')[0] || 'Beauty Lover'}! 👋
                </h3>
                <p className="text-xs text-gray-600 mt-1">{user?.email}</p>
                
                <div className="flex items-center justify-center gap-3 mt-2 px-3 py-1 bg-white/60 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-purple-600">{currentCredits}</span>
                    <span className="text-xs text-gray-500">credits</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium text-gray-700">{userProfile?.tier || 'Bronze'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOMO Referral Banner */}
          <div className="mx-4 my-4 relative overflow-hidden">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl animate-pulse">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
                LIMITED TIME!
              </div>
              
              <div className="text-center">
                <h4 className="font-bold text-lg mb-1">🎉 2X Rewards Active!</h4>
                <p className="text-sm text-purple-100 mb-3">
                  Invite friends now and earn DOUBLE credits! This boost ends soon...
                </p>
                
                <Button
                  onClick={handleCopyInviteLink}
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-2.5 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied! Share Now
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Invite Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Tier/Rewards Tracker */}
          <div className="mx-4 mb-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Next Reward</span>
              <span className="text-sm font-bold text-amber-600">{creditsToNext} credits to go</span>
            </div>
            
            <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <p className="text-xs text-amber-700 mt-2 text-center">
              {progressPercent}% complete • Keep earning for exclusive rewards!
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              to="/artists" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Browse Artists</span>
            </Link>
            
            <Link 
              to="/salons" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <Scissors className="w-5 h-5" />
              <span className="font-medium">Browse Salons</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Favorites</span>
            </Link>
            
            <button
              onClick={handleEditProfile}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Your Profile (Edit)</span>
            </button>
            
            <Link 
              to="/community" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Community</span>
            </Link>
            
            <Link 
              to="/about" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <Star className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Contact</span>
            </Link>
            
            <Link 
              to="/support" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              onClick={onClose}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Support/Feedback</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100/50 space-y-3">
            <Button
              onClick={signOut}
              variant="destructive"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Language: {language === 'en' ? 'English' : 'Tiếng Việt'}
            </button>
            
            <div className="text-center text-xs text-purple-400 font-medium opacity-70">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </aside>
      </div>
    );
  }

  // Default menu for other roles (keeping existing logic)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <aside className="relative w-[85vw] max-w-[400px] h-full bg-white rounded-l-3xl flex flex-col overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {userProfile?.first_name || userProfile?.full_name || 'Welcome'}
              </h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            <User className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          {(userRole === 'artist' || userRole === 'salon' || userRole === 'owner') && (
            <Link 
              to="/post-job" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              <Briefcase className="w-5 h-5" />
              <span>Post a Job</span>
            </Link>
          )}

          {userRole === 'salon' && (
            <Link 
              to="/post-salon" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              <Store className="w-5 h-5" />
              <span>Post a Salon</span>
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;

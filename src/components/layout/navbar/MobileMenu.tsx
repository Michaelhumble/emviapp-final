import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Search, 
  User, 
  LogOut, 
  HelpCircle,
  Users,
  Gift,
  Star,
  Bell,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  // Customer-specific premium mobile menu
  if (userRole === 'customer') {
    return (
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Menu Content */}
        <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 backdrop-blur-lg border-l border-purple-200/50 shadow-2xl overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-full"
            >
              ✕
            </Button>
          </div>

          {/* Premium Customer Profile Header */}
          <CustomerProfileHeader />
          
          {/* FOMO Invite Banner */}
          <CustomerFomoInviteBanner />
          
          {/* Rewards Tracker */}
          <CustomerRewardsTracker />

          {/* Navigation Links with Badges */}
          <div className="px-4 space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Navigate</div>
            
            {/* Home */}
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200 group"
            >
              <div className="relative">
                <Home className="h-5 w-5 text-purple-600" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="font-medium text-gray-800">Home</span>
              <div className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                New
              </div>
            </Link>

            {/* Book Appointment */}
            <Link
              to="/artists"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200 group"
            >
              <div className="relative">
                <Calendar className="h-5 w-5 text-pink-600" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <span className="font-medium text-gray-800">Book Now</span>
              <div className="ml-auto bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full font-medium">
                Hot
              </div>
            </Link>

            {/* Favorites */}
            <Link
              to="/favorites"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium text-gray-800">Favorites</span>
              <div className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                12
              </div>
            </Link>

            {/* Messages */}
            <Link
              to="/messages"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              <div className="relative">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <span className="font-medium text-gray-800">Messages</span>
            </Link>

            {/* Explore */}
            <Link
              to="/explore"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              <Search className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-800">Explore</span>
            </Link>

            {/* Your Profile */}
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 hover:from-purple-200 hover:to-pink-200 hover:scale-105 transition-all duration-200"
            >
              <User className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-800">Your Profile</span>
              <Star className="h-4 w-4 text-yellow-500 ml-auto" />
            </Link>
          </div>

          {/* Community Section */}
          <div className="px-4 mt-6">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Community</div>
            
            <Link
              to="/community"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-800">Community</span>
              <div className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                Live
              </div>
            </Link>

            <Link
              to="/invite"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 hover:from-amber-200 hover:to-orange-200 hover:scale-105 transition-all duration-200 mt-2"
            >
              <Gift className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800">Invite & Earn</span>
              <div className="ml-auto bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                2x
              </div>
            </Link>
          </div>

          {/* Support Section */}
          <div className="px-4 mt-6">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Support</div>
            
            <Link
              to="/support"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              <HelpCircle className="h-5 w-5 text-cyan-600" />
              <span className="font-medium text-gray-800">Support & Feedback</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="px-4 mt-6 mb-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 hover:scale-105 transition-all duration-200 w-full"
            >
              <LogOut className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-700">Sign Out</span>
            </button>
          </div>

          {/* Language Section */}
          <div className="px-4 mb-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Language</div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/50">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                EN
              </div>
              <span className="text-sm text-gray-700">English</span>
            </div>
          </div>

          {/* Motivational Footer */}
          <div className="px-4 pb-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-800">Inspired by Sunshine</span>
                <span className="text-yellow-500">☀️</span>
              </div>
              <p className="text-xs text-yellow-700 italic">
                "Every beautiful moment starts with a single step. You're creating yours today! ✨"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default menu for other user roles (unchanged)
  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        
        <div className="px-4 space-y-2">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

import React from 'react';
import { X, Home, Calendar, Heart, MessageSquare, Search, Gift, Coins, Users, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/auth/signin');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Customer Menu */}
        {userRole === 'customer' && (
          <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            {/* Customer Profile Header */}
            <CustomerProfileHeader />
            
            <div className="flex-1 overflow-y-auto">
              {/* FOMO Invite Banner */}
              <CustomerFomoInviteBanner />
              
              {/* Rewards Tracker */}
              <CustomerRewardsTracker />
              
              {/* Navigation Links */}
              <div className="px-4 space-y-1">
                {[
                  { name: 'Home', icon: Home, to: '/dashboard', badge: '2' },
                  { name: 'Book Now', icon: Calendar, to: '/explore/artists', badge: 'Hot!' },
                  { name: 'Favorites', icon: Heart, to: '/dashboard/favorites', badge: '5' },
                  { name: 'Messages', icon: MessageSquare, to: '/messages', badge: '3' },
                  { name: 'Explore', icon: Search, to: '/explore', badge: 'New' },
                  { name: 'Invite Friends', icon: Gift, to: '/referrals', badge: '2x' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.to);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                        <item.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    {item.badge && (
                      <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        {item.badge}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Credit Wallet */}
              <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-amber-600" />
                  <span className="font-bold text-amber-800">Credit Wallet</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">125</span>
                  <button className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                    View History →
                  </button>
                </div>
              </div>
              
              {/* Secondary Links */}
              <div className="px-4 mt-6 space-y-1">
                {[
                  { name: 'Community', icon: Users, to: '/community' },
                  { name: 'Support & Help', icon: HelpCircle, to: '/support' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.to);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="p-4 border-t border-purple-200/30">
              <div className="text-center mb-4">
                <p className="text-sm text-purple-600 font-medium mb-1">
                  "Your beauty journey starts with self-love! 💖"
                </p>
                <p className="text-xs text-gray-500 italic">
                  Inspired by Sunshine ☀️
                </p>
              </div>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Other role menus would go here - keeping existing logic for artist, salon, etc. */}
        {userRole !== 'customer' && (
          <div className="p-4">
            <p className="text-center text-gray-600">Menu for {userRole} role</p>
            <button
              onClick={handleSignOut}
              className="w-full mt-4 flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;

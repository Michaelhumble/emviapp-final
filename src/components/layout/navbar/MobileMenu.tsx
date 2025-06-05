
import React from 'react';
import { 
  Home, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Search, 
  Gift, 
  Coins, 
  Users, 
  HelpCircle, 
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';
import { Link, useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { userRole, handleSignOut } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
                  { name: 'Messages', icon: MessageCircle, to: '/messages', badge: '3' },
                  { name: 'Explore', icon: Search, to: '/explore', badge: 'New' },
                  { name: 'Invite Friends', icon: Gift, to: '/referrals', badge: '2x' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
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
                  </Link>
                ))}

                {/* Edit Profile Button */}
                <Link
                  to="/profile/edit"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-800">Edit Profile</span>
                  </div>
                </Link>
              </div>
              
              {/* Credit Wallet */}
              <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-amber-600" />
                  <span className="font-bold text-amber-800">Credit Wallet</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">125</span>
                  <button 
                    onClick={() => {
                      navigate('/dashboard/credits');
                      setIsOpen(false);
                    }}
                    className="text-xs text-amber-600 hover:text-amber-800 font-medium"
                  >
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
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
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
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {userRole === 'artist' && (
          <div className="flex flex-col h-full bg-gray-100">
            <div className="p-4">
              <button
                onClick={() => {
                  navigate('/artist/profile');
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Artist Profile</span>
              </button>
            </div>
          </div>
        )}

        {userRole === 'admin' && (
          <div className="flex flex-col h-full bg-gray-100">
            <div className="p-4">
              <button
                onClick={() => {
                  navigate('/admin/dashboard');
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Admin Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { 
  Home, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Compass, 
  Users, 
  HelpCircle, 
  LogOut,
  Settings,
  Star,
  Gift,
  Sun
} from 'lucide-react';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  const handleEditProfile = () => {
    if (typeof onClose === 'function') onClose();
    setTimeout(() => navigate('/profile/edit'), 250);
  };

  if (!isOpen) return null;

  // Navigation items for customers with notification badges
  const customerNavItems = [
    { 
      to: "/dashboard", 
      icon: Home, 
      label: "Home", 
      badge: null, 
      gradient: "from-blue-500 to-indigo-500" 
    },
    { 
      to: "/book", 
      icon: Calendar, 
      label: "Book Now", 
      badge: "New", 
      gradient: "from-green-500 to-emerald-500" 
    },
    { 
      to: "/favorites", 
      icon: Heart, 
      label: "My Favorites", 
      badge: "3", 
      gradient: "from-pink-500 to-rose-500" 
    },
    { 
      to: "/messages", 
      icon: MessageCircle, 
      label: "Messages", 
      badge: "2", 
      gradient: "from-purple-500 to-violet-500" 
    },
    { 
      to: "/explore", 
      icon: Compass, 
      label: "Explore", 
      badge: "Hot", 
      gradient: "from-orange-500 to-amber-500" 
    },
    { 
      to: "/invite", 
      icon: Gift, 
      label: "Invite Friends", 
      badge: "2x", 
      gradient: "from-cyan-500 to-blue-500" 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl overflow-y-auto">
        <div className="flex h-full flex-col">
          
          {/* Close Button */}
          <div className="flex items-center justify-end p-4">
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all"
            >
              ✕
            </button>
          </div>

          {user ? (
            <div className="flex-1 overflow-y-auto">
              {/* Customer Profile Header */}
              {userProfile?.role === 'customer' && <CustomerProfileHeader />}
              
              {/* FOMO Invite Banner */}
              {userProfile?.role === 'customer' && <CustomerFomoInviteBanner />}
              
              {/* Rewards Tracker */}
              {userProfile?.role === 'customer' && <CustomerRewardsTracker />}

              {/* Navigation Menu */}
              <nav className="px-4 space-y-2">
                {userProfile?.role === 'customer' ? (
                  <>
                    {customerNavItems.map((item, index) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-200 group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`bg-gradient-to-r ${item.gradient} p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                            {item.badge}
                          </div>
                        )}
                      </Link>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {/* Secondary Actions */}
                    <Link
                      to="/community"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all"
                    >
                      <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-2 rounded-lg shadow-sm">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">Community</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:text-gray-800 transition-all"
                    >
                      <div className="bg-gradient-to-r from-gray-400 to-slate-500 p-2 rounded-lg shadow-sm">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">Settings</span>
                    </Link>
                    
                    <Link
                      to="/help"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all"
                    >
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-lg shadow-sm">
                        <HelpCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">Help & Support</span>
                    </Link>
                  </>
                ) : (
                  // Keep existing logic for other user roles
                  <>
                    <Link
                      to="/dashboard"
                      onClick={handleLinkClick}
                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {userProfile?.role === 'artist' && (
                      <>
                        <Link
                          to="/artists"
                          onClick={handleLinkClick}
                          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          Browse Artists
                        </Link>
                        <Link
                          to="/salons"
                          onClick={handleLinkClick}
                          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          Find Salons
                        </Link>
                      </>
                    )}
                    <Link
                      to="/messages"
                      onClick={handleLinkClick}
                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Messages
                    </Link>
                    <Link
                      to="/profile"
                      onClick={handleLinkClick}
                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </>
                )}
              </nav>

              {/* Edit Profile Button for Customers */}
              {userProfile?.role === 'customer' && (
                <div className="px-4 pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={handleEditProfile}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9A7B69] to-[#F6F6F7] text-[#1A1A1A] font-bold shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Star className="h-4 w-4" />
                    Edit Profile
                  </button>
                </div>
              )}

              {/* Motivational Footer */}
              {userProfile?.role === 'customer' && (
                <div className="p-4 mt-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-t border-yellow-200/50">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Sun className="h-5 w-5 text-amber-500 animate-spin" />
                      <span className="text-sm font-medium text-amber-700">Inspired by Sunshine</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      "Your beauty journey starts with self-love. Every booking, every discovery makes you shine brighter! ✨"
                    </p>
                  </div>
                </div>
              )}

              {/* Sign Out */}
              <div className="p-4 border-t border-gray-200">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            // Non-authenticated state
            <div className="space-y-4 p-4">
              <Link
                to="/auth/signin"
                onClick={handleLinkClick}
                className="block w-full text-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                onClick={handleLinkClick}
                className="block w-full text-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

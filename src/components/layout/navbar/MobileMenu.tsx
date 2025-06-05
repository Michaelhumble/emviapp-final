
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Menu, X, User, Search, Heart, HelpCircle, Users, Gift, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/auth';
import LanguageToggle from '@/components/ui/LanguageToggle';

const CustomerFomoInviteBanner = ({
  referralLink = "https://emvi.app/invite/your-code",
  credits = 1200,
  progress = 65,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#9A7B69] to-[#F6F6F7] p-4 mb-4 shadow-xl flex flex-col gap-2">
      <div className="font-bold text-lg text-[#1A1A1A] mb-1">
        Invite Friends & Earn Credits
      </div>
      <div className="flex items-center bg-white/70 rounded-lg px-2 py-1 text-xs">
        <span className="truncate">{referralLink}</span>
        <button
          onClick={handleCopy}
          className="ml-2 px-2 py-1 rounded bg-[#9A7B69] text-white font-semibold text-xs hover:bg-[#7c5e48] transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-indigo-700 font-bold text-sm">
          Credits: <span className="font-extrabold text-lg">{credits}</span>
        </div>
        <div className="text-xs text-gray-500">
          {progress}% to next reward
        </div>
      </div>
      <div className="w-full h-2 bg-indigo-100 rounded mt-1 mb-1 overflow-hidden">
        <div
          className="h-2 rounded bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs font-medium text-rose-600 mt-1">
        Limited-Time DOUBLE Rewards! Invite now before it's gone.
      </div>
    </div>
  );
};

const MobileMenu = () => {
  const { isSignedIn, userRole, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = () => {
    setIsOpen(false);
    navigate('/profile/edit');
  };

  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-6">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          <div className="space-y-4">
            {/* Customer FOMO Banner - only show for customers */}
            {isSignedIn && userRole === 'customer' && (
              <CustomerFomoInviteBanner />
            )}

            {/* Customer-specific navigation */}
            {isSignedIn && userRole === 'customer' && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 mb-3">Discover Beauty</h3>
                
                <Link 
                  to="/explore/artists" 
                  onClick={closeDrawer}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Search className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-800">Browse Artists</span>
                  <span className="text-xs text-purple-600 ml-auto">Find your perfect match</span>
                </Link>

                <Link 
                  to="/explore/salons" 
                  onClick={closeDrawer}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-gray-800">Browse Salons</span>
                  <span className="text-xs text-indigo-600 ml-auto">Trusted directory</span>
                </Link>

                <Link 
                  to="/favorites" 
                  onClick={closeDrawer}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-5 w-5 text-rose-600" />
                  <span className="font-medium text-gray-800">Favorites</span>
                  <span className="text-xs text-rose-600 ml-auto">Your saved picks</span>
                </Link>

                <button
                  onClick={handleEditProfile}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Your Profile</span>
                  <span className="text-xs text-gray-600 ml-auto">Manage settings</span>
                </button>

                <Link 
                  to="/support" 
                  onClick={closeDrawer}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-800">Support & Feedback</span>
                  <span className="text-xs text-green-600 ml-auto">We're here to help</span>
                </Link>
              </div>
            )}

            {/* General navigation for other roles */}
            {(!isSignedIn || userRole !== 'customer') && (
              <div className="space-y-3">
                <Link to="/explore" onClick={closeDrawer} className="block py-2 text-gray-700 hover:text-primary">
                  Explore
                </Link>
                <Link to="/jobs" onClick={closeDrawer} className="block py-2 text-gray-700 hover:text-primary">
                  Jobs
                </Link>
                {isSignedIn && (
                  <>
                    <Link to="/dashboard" onClick={closeDrawer} className="block py-2 text-gray-700 hover:text-primary">
                      Dashboard
                    </Link>
                    <Link to="/profile/edit" onClick={closeDrawer} className="block py-2 text-gray-700 hover:text-primary">
                      Edit Profile
                    </Link>
                  </>
                )}
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <LanguageToggle minimal />
            </div>

            {isSignedIn ? (
              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                className="w-full mt-4"
              >
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2">
                <Link to="/auth/signin" onClick={closeDrawer}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup" onClick={closeDrawer}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;

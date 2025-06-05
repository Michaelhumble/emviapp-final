import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Star, 
  Heart, 
  Gift, 
  Users, 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Home,
  Calendar,
  Settings,
  Copy,
  Crown,
  TrendingUp,
  Globe
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, signOut, userProfile, userRole } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  // Dynamic referral link based on user ID
  const referralLink = user?.id 
    ? `https://emviapp.com/invite/${user.id.substring(0, 8)}`
    : "https://emviapp.com/invite/demo";

  const handleNavigation = (path) => {
    onClose();
    setTimeout(() => navigate(path), 250);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied! Share with friends to earn credits!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSignOut = () => {
    onClose();
    signOut();
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === "EN" ? "VI" : "EN");
    toast.info(`Language switched to ${currentLanguage === "EN" ? "Vietnamese" : "English"}`);
  };

  if (!isOpen) return null;

  // Customer-specific mobile menu
  if (userRole === "customer") {
    const currentCredits = userProfile?.credits || 0;
    const nextTierCredits = 100;
    const progressPercentage = Math.min((currentCredits / nextTierCredits) * 100, 100);
    const membershipTier = currentCredits >= 500 ? "VIP" : currentCredits >= 100 ? "Premium" : "Starter";

    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end md:hidden">
        <div className="w-[85vw] max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
          
          {/* Sticky Profile Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-br from-purple-50 via-white to-pink-50 px-5 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img
                  src={userProfile?.avatar_url || "/img/default-avatar.png"}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-md"
                />
                {membershipTier === "VIP" && (
                  <Crown className="absolute -top-1 -right-1 w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  {userProfile?.full_name || "Beauty Lover"}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    membershipTier === "VIP" ? "bg-yellow-100 text-yellow-800" :
                    membershipTier === "Premium" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {membershipTier}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-purple-600 font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {currentCredits}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar / Rewards Tracker */}
            <div className="bg-white rounded-xl p-3 border border-purple-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">Progress to Premium</span>
                <span className="text-xs text-purple-600 font-medium">{currentCredits}/{nextTierCredits}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progressPercentage >= 100 ? "You've reached the next tier! 🎉" : `${nextTierCredits - currentCredits} credits to unlock Premium rewards`}
              </p>
            </div>
          </div>

          {/* FOMO Referral Banner */}
          <div className="m-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-orange-800 text-sm">🔥 LIMITED TIME</h4>
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Invite Friends, Earn DOUBLE Credits!
            </p>
            <p className="text-xs text-gray-600 mb-3">
              Get 20 credits per friend (usually 10). Offer ends in 72 hours!
            </p>
            <button
              onClick={handleCopyReferral}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-3 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Invite Link"}
            </button>
          </div>

          {/* Premium Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavigation("/dashboard/customer")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Home className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Dashboard</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => handleNavigation("/bookings")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">My Bookings</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigation("/favorites")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Favorites</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigation("/messages")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Messages</span>
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigation("/artists")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Search className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Browse Artists</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigation("/salons")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Gift className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Browse Salons</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigation("/profile/edit")}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
                >
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Settings & Profile</span>
                </button>
              </li>
            </ul>

            {/* Support Links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h5 className="text-sm font-semibold text-gray-500 mb-3 px-3">Support & Community</h5>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handleNavigation("/community")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Community</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/support")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Help & Feedback</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 space-y-3">
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-red-200 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>

            {/* Language Switcher & Footer Text */}
            <div className="flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-purple-600 transition-colors"
              >
                <Globe className="w-3 h-3" />
                {currentLanguage}
              </button>
              <div className="text-xs text-gray-500 text-center">
                Inspired by Sunshine ☀️
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 leading-relaxed">
              All core features are always free for you.<br/>
              Invite friends to unlock secret rewards!
            </p>
          </div>
        </div>

        {/* Backdrop */}
        <div className="flex-1" onClick={onClose} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end md:hidden">
      <div className="w-[85vw] max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4">
          <ul className="space-y-2 py-4">
            <li>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => navigate("/dashboard"), 250);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
            </li>
            {userRole === "artist" && (
              <>
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => navigate("/listings/new"), 250);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
                  >
                    <Star className="w-4 h-4" />
                    Post a Job
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => navigate("/profile/edit"), 250);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                </li>
              </>
            )}
            {userRole === "owner" && (
              <>
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => navigate("/listings/new"), 250);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
                  >
                    <Star className="w-4 h-4" />
                    Post a Job
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => navigate("/salons/new"), 250);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
                  >
                    <Gift className="w-4 h-4" />
                    Post a Salon
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => navigate("/profile/edit"), 250);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {currentLanguage}
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Inspired by Sunshine ☀️
          </p>
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Copy, Star, Users, MapPin, Heart, User, HelpCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { toast } from "sonner";

export const MobileMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { referralLink, referralStats, copied, copyReferralLink } = useReferralSystem();

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
    navigate("/");
  };

  const canPostJobs = user && (userProfile?.role === "salon" || userProfile?.role === "customer");
  const isCustomer = userProfile?.role === "customer";

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied! Share with friends to earn credits!");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* CUSTOMER FOMO FEATURES - Invite Friends & Earn Credits Banner */}
          {isCustomer && (
            <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-b">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-purple-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Invite Friends & Earn Credits</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Share EmviApp and earn rewards for every friend who joins!</p>
                
                {/* Referral Link with Copy Button */}
                <div className="flex items-center gap-2 mb-3">
                  <input 
                    value={referralLink || "Loading..."}
                    readOnly
                    className="flex-1 text-xs bg-gray-50 border rounded px-2 py-1 text-gray-700"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleCopyReferralLink}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                {/* FOMO Urgency Messaging */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-2 border border-orange-200">
                  <p className="text-xs font-medium text-orange-800 text-center">
                    🔥 Limited-Time Reward Boost! Invite now for DOUBLE credits! 🔥
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMER REWARDS PROGRESS BAR */}
          {isCustomer && (
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-indigo-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900">Your Rewards</h3>
                </div>
                
                {/* Emotional Motivational Copy */}
                <p className="text-sm text-gray-600 mb-3">
                  You're just a few invites away from VIP perks! 🌟
                </p>
                
                {/* Credits Display */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Credits Earned</span>
                  <span className="text-lg font-bold text-indigo-600">{referralStats?.credits || 0}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(((referralStats?.completedReferrals || 0) / 5) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  {5 - (referralStats?.completedReferrals || 0)} more referrals to unlock VIP status!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Customer-Specific Navigation */}
            {isCustomer ? (
              <>
                {/* Browse Artists - Emotional CTA */}
                <Link
                  to="/artists"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Users className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                  <div>
                    <span className="font-medium text-gray-900">Browse Artists</span>
                    <p className="text-xs text-gray-500">Discover amazing talent near you</p>
                  </div>
                </Link>

                {/* Browse Salons - Trusted Directory */}
                <Link
                  to="/salons"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-indigo-600 group-hover:text-indigo-700" />
                  <div>
                    <span className="font-medium text-gray-900">Browse Salons</span>
                    <p className="text-xs text-gray-500">Trusted beauty destinations</p>
                  </div>
                </Link>

                {/* Favorites */}
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Heart className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
                  <div>
                    <span className="font-medium text-gray-900">Favorites</span>
                    <p className="text-xs text-gray-500">Your saved artists & salons</p>
                  </div>
                </Link>

                {/* Your Profile */}
                <Link
                  to="/dashboard/customer"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <User className="h-5 w-5 text-gray-600 group-hover:text-gray-700" />
                  <div>
                    <span className="font-medium text-gray-900">Your Profile</span>
                    <p className="text-xs text-gray-500">Manage your account & preferences</p>
                  </div>
                </Link>

                {/* Support & Feedback */}
                <Link
                  to="/support"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <HelpCircle className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                  <div>
                    <span className="font-medium text-gray-900">Support & Feedback</span>
                    <p className="text-xs text-gray-500">We're here to help you</p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/* Non-Customer Navigation (Original Links) */}
                <Link
                  to="/artists"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    {t({ english: "Artists", vietnamese: "Nghệ sĩ" })}
                  </span>
                </Link>

                <Link
                  to="/jobs"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    {t({ english: "Jobs", vietnamese: "Việc làm" })}
                  </span>
                </Link>

                <Link
                  to="/salons"
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    {t({ english: "Salons", vietnamese: "Salon" })}
                  </span>
                </Link>

                {/* Posting Links for Non-Customers */}
                {canPostJobs && !isCustomer && (
                  <>
                    <Link
                      to="/post-job"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {t({ english: "Post a Job", vietnamese: "Đăng việc làm" })}
                      </span>
                    </Link>

                    <Link
                      to="/post-salon"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {t({ english: "Post a Salon", vietnamese: "Đăng salon" })}
                      </span>
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-4">
            <LanguageToggle />
            
            {user ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {t({ english: "Signed in as", vietnamese: "Đã đăng nhập với" })} {user.email}
                </p>
                <Button onClick={handleSignOut} variant="outline" className="w-full">
                  {t({ english: "Sign Out", vietnamese: "Đăng xuất" })}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/signin" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    {t({ english: "Sign In", vietnamese: "Đăng nhập" })}
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <Button className="w-full">
                    {t({ english: "Sign Up", vietnamese: "Đăng ký" })}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

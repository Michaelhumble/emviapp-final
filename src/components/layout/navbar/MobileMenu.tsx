
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Home, Users, Building2, Heart, User, MessageCircle, Info, Phone, HelpCircle, LogOut, Globe, Copy, Gift, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const MobileMenu = () => {
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [referralProgress, setReferralProgress] = useState(65);
  const [credits, setCredits] = useState(250);
  const [nextReward, setNextReward] = useState(500);

  // Don't render on desktop
  if (!isMobile) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
    toast.success('Signed out successfully');
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const copyInviteLink = () => {
    const inviteLink = `https://emviapp.com/invite/${user?.id}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!');
  };

  // Check if user is a customer
  const isCustomer = userProfile?.role === 'customer' || userProfile?.user_role === 'customer';

  console.log('MobileMenu - User Role:', userProfile?.role, userProfile?.user_role, 'Is Customer:', isCustomer);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full max-w-sm p-0 bg-gradient-to-b from-purple-50 to-white">
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-4 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Emvi.App
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Customer-specific menu */}
            {isCustomer ? (
              <>
                {/* Sticky Profile Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-purple-100 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-200">
                      <AvatarImage src={userProfile?.avatar_url} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        Hey, {userProfile?.full_name?.split(' ')[0] || 'Beautiful'}! 👋
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-purple-600 font-medium">{credits} Credits</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Invite Link */}
                  <Button 
                    onClick={copyInviteLink}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg h-8 text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Invite Link
                  </Button>
                </div>

                {/* FOMO Referral Banner */}
                <div className="p-4 border-b border-purple-100">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-800">
                        🔥 Limited Time: Double Rewards!
                      </span>
                    </div>
                    <p className="text-xs text-orange-700 mb-3">
                      Invite friends now and get 2x credits for every signup!
                    </p>
                    <Progress value={referralProgress} className="h-2 mb-2" />
                    <p className="text-xs text-orange-600">
                      {referralProgress}% to your next reward tier
                    </p>
                  </div>
                </div>

                {/* Tier/Rewards Tracker */}
                <div className="p-4 border-b border-purple-100">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-purple-800">Beauty VIP Status</span>
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        Gold Member
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-purple-600 mb-1">
                        <span>{credits} credits</span>
                        <span>{nextReward} credits</span>
                      </div>
                      <Progress value={(credits / nextReward) * 100} className="h-2" />
                    </div>
                    <p className="text-xs text-purple-600">
                      {nextReward - credits} credits to Platinum status
                    </p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="px-4 py-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <User className="h-5 w-5 mr-3 text-purple-600" />
                    Dashboard
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/')}
                  >
                    <Home className="h-5 w-5 mr-3 text-purple-600" />
                    Home
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/artists')}
                  >
                    <Users className="h-5 w-5 mr-3 text-purple-600" />
                    Browse Artists
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/salons')}
                  >
                    <Building2 className="h-5 w-5 mr-3 text-purple-600" />
                    Browse Salons
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/favorites')}
                  >
                    <Heart className="h-5 w-5 mr-3 text-purple-600" />
                    Favorites
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/profile/edit')}
                  >
                    <User className="h-5 w-5 mr-3 text-purple-600" />
                    Your Profile (edit)
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/community')}
                  >
                    <MessageCircle className="h-5 w-5 mr-3 text-purple-600" />
                    Community
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/about')}
                  >
                    <Info className="h-5 w-5 mr-3 text-purple-600" />
                    About
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/contact')}
                  >
                    <Phone className="h-5 w-5 mr-3 text-purple-600" />
                    Contact
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-12 hover:bg-purple-50" 
                    onClick={() => handleNavigation('/support')}
                  >
                    <HelpCircle className="h-5 w-5 mr-3 text-purple-600" />
                    Support/Feedback
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Non-customer menu (existing logic) */}
                <div className="px-4 py-6 space-y-2">
                  {user ? (
                    <>
                      <Button 
                        onClick={() => handleNavigation('/post-job')} 
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 mb-4"
                      >
                        Post a Job
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => handleNavigation('/dashboard')}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Dashboard
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => handleNavigation('/sign-in')}
                      className="w-full bg-purple-600 text-white hover:bg-purple-700 mb-4"
                    >
                      Post a Job for Free
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/')}
                  >
                    <Home className="h-5 w-5 mr-3" />
                    Home
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/artists')}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    Artists
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/salons')}
                  >
                    <Building2 className="h-5 w-5 mr-3" />
                    Salons
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/jobs')}
                  >
                    <Building2 className="h-5 w-5 mr-3" />
                    Jobs
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/community')}
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    Community
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/about')}
                  >
                    <Info className="h-5 w-5 mr-3" />
                    About
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleNavigation('/contact')}
                  >
                    <Phone className="h-5 w-5 mr-3" />
                    Contact
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-purple-100 p-4 space-y-3">
            {user && (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Language</span>
              <Button variant="ghost" size="sm" className="text-sm">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
            </div>
            
            <div className="text-center text-xs text-orange-500 font-medium">
              Inspired by Sunshine ☀️
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

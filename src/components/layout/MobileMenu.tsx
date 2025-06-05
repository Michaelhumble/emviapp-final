import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, PlusSquare, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { cn } from '@/lib/utils';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import Logo from '@/components/ui/Logo';

const CustomerFomoInviteBanner = ({
  referralLink = "https://emvi.app/invite/your-code", // Replace with your actual referral variable
  credits = 1200, // Replace with your actual credits variable
  progress = 65, // Replace with your actual percent to next reward
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

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut, userProfile } = useAuth();
  const [open, setOpen] = React.useState(false);

  // Check if user is a customer
  const isCustomer = userProfile?.role === 'customer';

  // Close menu when navigating to a new route
  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Customer-specific navigation items
  const customerNavItems = [
    {
      title: 'Browse Artists',
      path: '/artists',
      icon: User,
      vietnameseTitle: 'Duyệt Nghệ Sĩ'
    },
    {
      title: 'Browse Salons', 
      path: '/salons',
      icon: User,
      vietnameseTitle: 'Duyệt Salon'
    },
    {
      title: 'Favorites',
      path: '/favorites',
      icon: User,
      vietnameseTitle: 'Yêu Thích'
    },
    {
      title: 'Your Profile',
      path: '/profile',
      icon: User,
      vietnameseTitle: 'Hồ Sơ Của Bạn'
    },
    {
      title: 'Support & Feedback',
      path: '/support',
      icon: User,
      vietnameseTitle: 'Hỗ Trợ & Phản Hồi'
    }
  ];

  // Additional navigation items not in the main nav
  const additionalNavItems = [{
    title: 'Dashboard',
    path: '/dashboard',
    icon: User,
    vietnameseTitle: 'Bảng điều khiển'
  }];

  // Use customer nav items if user is customer, otherwise use default
  const navItems = isCustomer ? customerNavItems : [...additionalNavItems, ...mainNavigationItems].filter((item, index, self) => 
    index === self.findIndex(t => t.path === item.path)
  );

  // Check current route for active state
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="relative z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="flex md:hidden rounded-full p-2 h-10 w-10" aria-label="Open menu">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0 border-l shadow-lg">
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="flex items-center justify-between border-b p-4">
              <div onClick={() => handleNavigation('/')} className="cursor-pointer">
                <Logo size="small" showText={true} />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-2">
                {/* Customer FOMO Invite Banner - positioned at top for customers */}
                {isSignedIn && isCustomer && (
                  <div className="px-2 mb-6">
                    <CustomerFomoInviteBanner />
                  </div>
                )}

                {/* Authentication buttons - only show if not signed in */}
                {!isSignedIn && (
                  <div className="px-2 mb-6 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex gap-2" onClick={() => handleNavigation('/sign-up')}>
                      <UserPlus size={18} />
                      {t({
                        english: 'Sign Up',
                        vietnamese: 'Đăng ký'
                      })}
                    </Button>
                    <Button variant="outline" className="w-full flex gap-2" onClick={() => handleNavigation('/login')}>
                      <LogIn size={18} />
                      {t({
                        english: 'Sign In',
                        vietnamese: 'Đăng nhập'
                      })}
                    </Button>
                  </div>
                )}

                {/* Post Job button (highlighted) - only for non-customers who are signed in */}
                {isSignedIn && !isCustomer && (
                  <div className="px-2 mb-6">
                    
                  </div>
                )}
                
                {/* Navigation Items */}
                {navItems.map(item => (
                  <button 
                    key={item.path} 
                    onClick={() => handleNavigation(item.path)} 
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                      isActive(item.path) 
                        ? "bg-purple-100 text-purple-700 font-medium" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
                    {t({
                      english: item.title,
                      vietnamese: item.vietnameseTitle || item.title
                    })}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Footer section */}
            <div className="border-t p-4 space-y-4">
              {/* Sign Out button - only show if signed in */}
              {isSignedIn && (
                <button 
                  onClick={handleSignOut} 
                  className="flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                  {t({
                    english: 'Sign Out',
                    vietnamese: 'Đăng xuất'
                  })}
                </button>
              )}

              {/* Language Toggle */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">
                  {t({
                    english: 'Language',
                    vietnamese: 'Ngôn ngữ'
                  })}
                </h4>
                <LanguageToggle minimal={true} />
              </div>
              
              {/* Sunshine credit */}
              <div className="text-center pt-2">
                <p className="text-sm bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent font-medium">
                  Inspired by Sunshine ☀️
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
